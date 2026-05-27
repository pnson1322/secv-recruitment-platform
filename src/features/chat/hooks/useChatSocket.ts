"use client";

import { useEffect, useCallback } from "react";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { connectSocket } from "@/lib/socket";
import { chatKeys } from "./useChat";
import type { Message, MessagesResponse, ConversationsResponse, ApiResponse } from "../types/chat.types";

type UseChatSocketProps = {
  token: string | null;
  activeConversationId: number | null;
  userId?: string | number | null;
  onPartnerTypingChange?: (isTyping: boolean) => void;
};

export function useChatSocket({
  token,
  activeConversationId,
  userId,
  onPartnerTypingChange,
}: UseChatSocketProps) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!token) return;

    const socket = connectSocket(token, "/chat");

    const handleConnect = () => {
      console.log("Chat socket connected:", socket.id);
      if (activeConversationId) {
        socket.emit("join_conversation", { conversationId: activeConversationId });
      }
    };

    const updateConversationList = (message: Message) => {
      const { conversationId } = message;
      queryClient.setQueriesData<ApiResponse<ConversationsResponse>>(
        { queryKey: ["chat", "conversations"] },
        (oldData) => {
          if (!oldData) return oldData;

          const exists = oldData.data.data.some((conv) => conv.conversationId === conversationId);
          if (!exists) {
            setTimeout(() => {
              queryClient.invalidateQueries({ queryKey: ["chat", "conversations"] });
            }, 0);
            return oldData;
          }

          const updatedConversations = oldData.data.data.map((conv) => {
            if (conv.conversationId === conversationId) {
              const isMsgMine =
                userId !== undefined && userId !== null && String(message.senderId) === String(userId);

              const isNotActiveAndNotMine =
                activeConversationId !== conversationId && !isMsgMine;

              return {
                ...conv,
                isHidden: false,
                lastMessageAt: message.createdAt,
                unreadCount: isNotActiveAndNotMine
                  ? conv.unreadCount + 1
                  : conv.unreadCount,
                lastMessage: {
                  content: message.content,
                  hasImages: message.imageUrls.length > 0,
                  senderId: message.senderId,
                  createdAt: message.createdAt,
                },
              };
            }
            return conv;
          });

          const sorted = [...updatedConversations].sort(
            (a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
          );

          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: sorted,
            },
          };
        }
      );
    };

    const addMessageToCache = (message: Message) => {
      const { conversationId } = message;
      if (activeConversationId !== conversationId) return;

      const isMsgMine =
        userId !== undefined && userId !== null && String(message.senderId) === String(userId);

      if (isMsgMine) return;
      
      const receivedMessage = {
        ...message,
        isMine: false,
      };

      queryClient.setQueryData<InfiniteData<MessagesResponse, number | undefined>>(
        chatKeys.messages(conversationId),
        (oldData) => {
          if (!oldData || oldData.pages.length === 0) return oldData;

          const exists = oldData.pages.some((page) =>
            page.messages.some((msg) => msg.messageId === message.messageId)
          );
          if (exists) return oldData;

          const pages = [...oldData.pages];
          pages[0] = {
            ...pages[0],
            messages: [...pages[0].messages, receivedMessage],
          };

          return { ...oldData, pages };
        }
      );
    };

    const handleMessageSent = (message: Message) => {
      updateConversationList(message);
    };
    const handleNewMessage = (message: Message) => {
      addMessageToCache(message);
      updateConversationList(message);
    };

    const handleUserTyping = ({ userId: typingUserId, isTyping }: { userId: number; isTyping: boolean }) => {
      if (userId !== undefined && userId !== null && String(typingUserId) === String(userId)) return;
      onPartnerTypingChange?.(isTyping);
    };

    const handleReadReceipt = ({ conversationId }: { conversationId: number }) => {
      queryClient.setQueriesData<ApiResponse<ConversationsResponse>>(
        { queryKey: ["chat", "conversations"] },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: oldData.data.data.map((conv) =>
                conv.conversationId === conversationId
                  ? { ...conv, unreadCount: 0 }
                  : conv
              ),
            },
          };
        }
      );
    };

    const handleInvalidateConversations = () => {
      queryClient.invalidateQueries({ queryKey: ["chat", "conversations"] });
    };

    socket.on("connect", handleConnect);

    socket.on("message_sent", handleMessageSent);
    socket.on("new_message", handleNewMessage);
    socket.on("user_typing", handleUserTyping);
    socket.on("read_receipt", handleReadReceipt);
    socket.on("blocked_updated", handleInvalidateConversations);
    socket.on("you_were_blocked", handleInvalidateConversations);
    socket.on("you_were_unblocked", handleInvalidateConversations);
    socket.on("hidden_updated", handleInvalidateConversations);

    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("message_sent", handleMessageSent);
      socket.off("new_message", handleNewMessage);
      socket.off("user_typing", handleUserTyping);
      socket.off("read_receipt", handleReadReceipt);
      socket.off("blocked_updated", handleInvalidateConversations);
      socket.off("you_were_blocked", handleInvalidateConversations);
      socket.off("you_were_unblocked", handleInvalidateConversations);
      socket.off("hidden_updated", handleInvalidateConversations);
    };
  }, [token, activeConversationId, queryClient, userId, onPartnerTypingChange]);

  useEffect(() => {
    if (!token || !activeConversationId) return;

    const socket = connectSocket(token, "/chat");

    socket.emit("join_conversation", { conversationId: activeConversationId });

    return () => {
      socket.emit("leave_conversation", { conversationId: activeConversationId });
    };
  }, [token, activeConversationId]);

  const sendTypingStatus = useCallback((isTyping: boolean) => {
    if (!token || !activeConversationId) return;
    const socket = connectSocket(token, "/chat");
    if (socket) {
      socket.emit(isTyping ? "typing_start" : "typing_stop", {
        conversationId: activeConversationId,
      });
    }
  }, [token, activeConversationId]);

  return { sendTypingStatus };
}
export default useChatSocket;
