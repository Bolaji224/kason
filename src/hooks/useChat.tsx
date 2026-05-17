import { useEffect, useState, useCallback, useRef } from "react";
import { httpGetWithToken, httpPostWithToken } from './../utils/http_utils';
import { echo } from './../utils/echo';


interface Message {
  id: number;
  message: string;
  file_url?: string | null; // ✅ added
  user_id: number;
  chat_id: number;
  created_at: string;
  user?: {
    id: number;
    name: string;
  };
}

interface SendMessagePayload {
  message: string;
  file_url?: string | null; // ✅ added
  receiver_id: number;
  chat_id?: number;
}

export function useChat(chatId: number | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const channelRef = useRef<any>(null);

  const fetchMessages = useCallback(async () => {
    if (!chatId) {
      setMessages([]);
      return;
    }
    try {
      const resp = await httpGetWithToken(`chat/${chatId}`);
      if (!resp?.error && resp?.data?.messages) {
        setMessages(resp.data.messages);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  }, [chatId]);

  const sendMessage = async (payload: SendMessagePayload) => {
    // ✅ Allow send if there's a message OR a file_url
    if (!payload.message.trim() && !payload.file_url) return null;

    setLoading(true);
    try {
      const resp = await httpPostWithToken("chat/send-chat", payload);

      if (!resp?.error && resp?.data) {
        let newMessage: Message | null = null;

        if (resp.data.messages && Array.isArray(resp.data.messages)) {
          newMessage = resp.data.messages[resp.data.messages.length - 1];
        } else if (resp.data.id) {
          newMessage = resp.data;
        }

        if (newMessage !== null) {
          setMessages((prev): Message[] => {
            if (!newMessage) return prev;
            const safeMessage: Message = newMessage;
            if (prev.some(m => m.id === safeMessage.id)) return prev;
            return [...prev, safeMessage];
          });
        }

        setLoading(false);
        return resp.data;
      }

      setLoading(false);
      return null;
    } catch (err) {
      console.error('Error sending message:', err);
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      return;
    }

    fetchMessages();

    console.log(`🔌 Subscribing to private-chat.${chatId}`);

    try {
      channelRef.current = echo.private(`chat.${chatId}`);

      channelRef.current.listen('.message.sent', (data: any) => {
        console.log('New message received:', data);
        setMessages((prev) => {
          if (prev.some(m => m.id === data.id)) return prev;
          return [...prev, data];
        });
      });

      channelRef.current.subscribed(() => {
        console.log('Successfully subscribed to chat.' + chatId);
      });

      channelRef.current.error((error: any) => {
        console.error('Channel subscription error:', error);
      });
    } catch (err) {
      console.error('Error subscribing to channel:', err);
    }

    return () => {
      if (channelRef.current) {
        console.log(`🔌 Unsubscribing from chat.${chatId}`);
        echo.leave(`chat.${chatId}`);
        channelRef.current = null;
      }
    };
  }, [chatId, fetchMessages]);

  return { messages, sendMessage, loading, refetch: fetchMessages };
}