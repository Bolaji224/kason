// echo.ts
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import ls from "localstorage-slim";
import { APP_API_URL } from "./http_utils";

(window as any).Pusher = Pusher;

/**
 * Safely get the token from encrypted localstorage or plain localStorage.
 */
const getToken = (): string => {
  try {
    const encrypted = ls.get("wwph_token", { decrypt: true }) as string | null;

    if (encrypted && typeof encrypted === "string") {
      console.log("Token loaded from encrypted storage");
      return encrypted;
    }
  } catch (e) {
    console.warn("Error accessing encrypted token:", e);
  }

  const plain = localStorage.getItem("wwph_token");
  if (plain) {
    console.log("Token loaded from plain localStorage");
    return plain;
  }

  console.error("No token found!");
  return "";
};

// ENV — strip /v1 so we get the base /api path used by the auth endpoint
const API_URL = APP_API_URL.replace("/v1", "");
const WS_HOST = process.env.REACT_APP_PUSHER_HOST || "127.0.0.1";
const WS_PORT = Number(process.env.REACT_APP_PUSHER_PORT) || 6001;

// Debug logging
console.log("Echo Config:", {
  API_URL,
  WS_HOST,
  WS_PORT,
  authEndpoint: `${API_URL}/v1/broadcasting/auth`,
});

// -------------------------------------------------
// FULL ECHO CONFIG WITH DYNAMIC JWT AUTHORIZER
// -------------------------------------------------
export const echo = new Echo({
  broadcaster: "pusher",
  key: process.env.REACT_APP_PUSHER_APP_KEY || "local",

  wsHost: WS_HOST,
  wsPort: WS_PORT,
  wssPort: WS_PORT,

  forceTLS: false,
  encrypted: false,
  disableStats: true,
  cluster: "mt1",
  enabledTransports: ["ws", "wss"],

  /**
   * TS FIX: add types to channel & options
   */
  authorizer: (channel: any, options: any) => {
    return {
      authorize: async (socketId: string, callback: any) => {
        const token = getToken();
        console.log("Authorizing channel:", channel.name);
        console.log("Using JWT token:", token ? "FOUND" : "MISSING");

        try {
          const response = await fetch(`${API_URL}/v1/broadcasting/auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              socket_id: socketId,
              channel_name: channel.name,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            console.error("Auth failed:", data);
            return callback(data, false);
          }

          return callback(null, data);
        } catch (error) {
          console.error("Auth exception:", error);
          return callback({ error: "Authorization exception" }, false);
        }
      },
    };
  },
});

// -------------------------------------------------
// PUSHER DEBUGGING BINDINGS
// -------------------------------------------------
const pusher = (echo.connector as any).pusher;

pusher.connection.bind("connected", () => {
  console.log("%c[Pusher] Connected", "color: green;");
});

pusher.connection.bind("error", (err: any) => {
  console.error("[Pusher] Error:", err);
});

pusher.connection.bind("disconnected", () => {
  console.warn("%c[Pusher] Disconnected", "color: orange;");
});

export default echo;
