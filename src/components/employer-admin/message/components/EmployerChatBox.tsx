import React, { useEffect, useState, useRef } from "react";
import {
  UilMessage,
  UilSearch,
  UilCheckCircle,
  UilPaperclip,
  UilTimes,
  UilFileAlt,
  UilDownloadAlt,
  UilImageV,
} from "@iconscout/react-unicons";
import ls from "localstorage-slim";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { httpGetWithToken, APP_API_URL } from './../../../../utils/http_utils';
import { useChat } from './../../../../hooks/useChat';
import axios from "axios";

function normalizeUserId(raw: any): number | null {
  if (raw == null) return null;
  if (typeof raw === "number") return raw;
  if (typeof raw === "string") {
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  }
  if (typeof raw === "object" && "id" in raw) {
    const n = Number(raw.id);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

const isImageUrl = (url: string) =>
  /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(url);

const getFileName = (url: string) => {
  try { return decodeURIComponent(url.split("/").pop() ?? "File"); }
  catch { return "File"; }
};

const EmployerChatPage: React.FC = () => {
  const user: any = ls.get("wwph_usr", { decrypt: true }) || JSON.parse(localStorage.getItem("wwph_usr") || "{}");
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const [text, setText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // ── File state ──
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { messages, sendMessage, loading } = useChat(selectedChat?.id ?? null);

  useEffect(() => {
    if (location?.state?.chatId) {
      loadChats(location.state.chatId);
    } else {
      loadChats();
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 128)}px`;
    }
  }, [text]);

  const loadChats = async (openChatId?: number) => {
    const resp = await httpGetWithToken("chat");
    if (!resp?.error && resp?.data) {
      setChats(resp.data);
      if (openChatId) {
        const chat = resp.data.find((c: any) => c.id === openChatId);
        if (chat) setSelectedChat(chat);
      }
    }
  };

  // ── Upload file to Cloudinary via /upload/file ──
  const uploadFile = async (file: File): Promise<string> => {
    const token = ls.get("wwph_token", { decrypt: true });
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    const resp = await axios.post(`${APP_API_URL}/upload/file`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (e) => {
        if (e.total) setUploadProgress(Math.round((e.loaded / e.total) * 100));
      },
    });

    setUploading(false);

    const url =
      resp.data?.data?.url ??
      resp.data?.data?.path ??
      resp.data?.data?.file_url ??
      resp.data?.data?.link ??
      resp.data?.url ??
      resp.data?.path ??
      null;

    if (!url) throw new Error("Upload succeeded but no URL returned.");
    return url;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      setUploadError("File too large. Max 20MB.");
      return;
    }
    setAttachedFile(file);
    setUploadError(null);
    e.target.value = "";
  };

  const handleRemoveAttachment = () => {
    setAttachedFile(null);
    setUploadError(null);
    setUploadProgress(0);
  };

  const handleSend = async () => {
    if ((!text.trim() && !attachedFile) || loading || uploading) return;

    const receiver_id = selectedChat
      ? (selectedChat.user1?.id
          ? (selectedChat.user1.id === user.id ? selectedChat.user2.id : selectedChat.user1.id)
          : (selectedChat.user1 === user.id ? selectedChat.user2 : selectedChat.user1))
      : undefined;

    try {
      let fileUrl: string | null = null;
      if (attachedFile) {
        fileUrl = await uploadFile(attachedFile);
        setAttachedFile(null);
      }

      await sendMessage({
        message: text.trim() || "",
        file_url: fileUrl ?? undefined,
        receiver_id,
        chat_id: selectedChat?.id,
      });

      setText("");
      setUploadProgress(0);
      await loadChats();
    } catch (err: any) {
      setUploadError(err?.message ?? "Failed to send.");
      setUploading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const otherUserFromChat = (chat: any) => {
    if (!chat) return {};
    return chat.user1 === user.id ? chat.ChatUser ?? chat.user2 : chat.Host ?? chat.user1;
  };

  const filteredChats = chats.filter(chat => {
    const other = otherUserFromChat(chat);
    return (other?.name ?? "").toLowerCase().includes(searchQuery.toLowerCase());
  });

  // ── Render message bubble ──
  const renderMessage = (m: any) => {
    const isOwn = normalizeUserId(m.user_id) === normalizeUserId(user.id);
    const fileUrl: string | null = m.file_url ?? null;
    const hasText = !!m.message?.trim();

    return (
      <div key={m.id || Math.random()} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
        <div className="max-w-[70%]">
          {/* File bubble */}
          {fileUrl && (
            <div className={`mb-1 rounded-2xl overflow-hidden border shadow-sm ${
              isOwn ? "bg-gradient-to-r from-pink-500 to-purple-500 border-pink-400" : "bg-white border-gray-200"
            }`}>
              {isImageUrl(fileUrl) ? (
                <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                  <img src={fileUrl} alt="attachment" className="max-w-full max-h-60 object-cover block" />
                </a>
              ) : (
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-4 py-3 hover:opacity-80 transition-opacity ${isOwn ? "text-white" : "text-gray-700"}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isOwn ? "bg-white/20" : "bg-pink-50"}`}>
                    <UilFileAlt size="22" className={isOwn ? "text-white" : "text-pink-500"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isOwn ? "text-white" : "text-gray-800"}`}>{getFileName(fileUrl)}</p>
                    <p className={`text-xs mt-0.5 ${isOwn ? "text-white/70" : "text-gray-400"}`}>Tap to download</p>
                  </div>
                  <UilDownloadAlt size="18" className={isOwn ? "text-white/80" : "text-gray-400"} />
                </a>
              )}
            </div>
          )}

          {/* Text bubble */}
          {hasText && (
            <div className={`px-4 py-3 rounded-2xl shadow-sm ${
              isOwn
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-br-sm"
                : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
            }`}>
              <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{m.message}</p>
            </div>
          )}

          <div className={`flex items-center gap-1 mt-1.5 px-1 ${isOwn ? "justify-end" : "justify-start"}`}>
            <span className="text-xs text-gray-400">{moment(m.created_at).format("h:mm A")}</span>
            {isOwn && <UilCheckCircle size="14" className="text-gray-400" />}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="lg:ml-64 flex h-[85vh] mt-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
      {/* Sidebar */}
      <div className="w-[380px] bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Messages</h2>
          <div className="relative">
            <UilSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size="20" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 px-6">
              <UilMessage size="48" className="mb-3 opacity-50" />
              <p className="text-sm text-center">{searchQuery ? "No conversations found" : "No conversations yet"}</p>
            </div>
          ) : (
            filteredChats.map((chat) => {
              const other = otherUserFromChat(chat);
              const last = chat.last_message ?? (chat.messages && chat.messages[chat.messages.length - 1]);
              const isSelected = selectedChat?.id === chat.id;

              return (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-4 cursor-pointer border-b border-gray-100 transition-all duration-200 ${
                    isSelected ? "bg-gradient-to-r from-pink-50 to-purple-50 border-l-4 border-l-pink-500" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0 shadow-md">
                      {(other?.name ?? "U").charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-semibold text-gray-800 truncate">{other?.name ?? "User"}</h4>
                        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                          {last ? moment(last.created_at).fromNow(true) : ""}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {last?.file_url ? "📎 Attachment" : (last?.message ?? "No messages yet")}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white min-w-0 overflow-hidden">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-semibold shadow-md">
                  {(otherUserFromChat(selectedChat).name ?? "U").charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{otherUserFromChat(selectedChat).name ?? "Conversation"}</h3>
                  <p className="text-xs text-gray-500">Active now</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 pt-8 bg-gradient-to-b from-gray-50 to-white">
              <div className="max-w-4xl mx-auto space-y-4 mt-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 py-12">
                    <UilMessage size="48" className="mb-3 opacity-50" />
                    <p className="text-sm">No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((m: any) => renderMessage(m))
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input area */}
            <div className="border-t border-gray-200 bg-white flex-shrink-0">

              {/* File preview */}
              {attachedFile && (
                <div className="px-4 pt-3 pb-1">
                  <div className="flex items-center gap-3 bg-pink-50 border border-pink-200 rounded-xl px-3 py-2">
                    <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center flex-shrink-0">
                      {attachedFile.type.startsWith("image/")
                        ? <UilImageV size="18" className="text-pink-500" />
                        : <UilFileAlt size="18" className="text-pink-500" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">{attachedFile.name}</p>
                      <p className="text-xs text-gray-400">{(attachedFile.size / 1024).toFixed(0)} KB</p>
                    </div>
                    {uploading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-pink-200 rounded-full overflow-hidden">
                          <div className="h-full bg-pink-500 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                        </div>
                        <span className="text-xs text-pink-500 font-medium">{uploadProgress}%</span>
                      </div>
                    ) : (
                      <button onClick={handleRemoveAttachment} className="p-1 hover:bg-pink-100 rounded-full transition-colors">
                        <UilTimes size="16" className="text-gray-500" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {uploadError && <p className="px-4 pt-1 text-xs text-red-500">{uploadError}</p>}

              <div className="p-4">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-end gap-2">
                    {/* Paperclip */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      title="Attach file"
                      className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-pink-500 transition-colors flex-shrink-0 disabled:opacity-40"
                    >
                      <UilPaperclip size="22" />
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif,.webp,.zip,.rar"
                      onChange={handleFileSelect}
                    />

                    <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-pink-500 focus-within:ring-2 focus-within:ring-pink-100 transition-all">
                      <textarea
                        ref={textareaRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder={attachedFile ? "Add a message (optional)..." : "Type your message..."}
                        rows={1}
                        className="w-full px-4 py-3 bg-transparent border-none focus:outline-none resize-none max-h-32 text-gray-800 placeholder-gray-400"
                        style={{ minHeight: '44px' }}
                        disabled={loading || uploading}
                      />
                    </div>

                    <button
                      onClick={handleSend}
                      disabled={(!text.trim() && !attachedFile) || loading || uploading}
                      className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 shadow-md flex items-center gap-2 flex-shrink-0 ${
                        (text.trim() || attachedFile) && !loading && !uploading
                          ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white hover:shadow-lg hover:scale-105"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {loading || uploading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{uploading ? "Uploading..." : "Sending..."}</span>
                        </>
                      ) : (
                        <>
                          <span>Send</span>
                          <UilMessage size="20" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-gray-50 to-white">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center mb-6 shadow-lg">
              <UilMessage size="48" className="text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Welcome to Messages</h3>
            <p className="text-sm text-gray-500">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerChatPage;