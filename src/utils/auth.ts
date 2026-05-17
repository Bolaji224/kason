// src/utils/auth.ts
import ls from "localstorage-slim";

export const getToken = (): string | null => {
  return ls.get("wwph_token", { decrypt: true }) || sessionStorage.getItem("wwph_token");
};
