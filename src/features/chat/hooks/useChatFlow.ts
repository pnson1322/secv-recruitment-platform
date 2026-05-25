"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getAccessToken } from "@/features/auth/lib/auth-storage";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useConversations,
  useMessages,
  useSendMessage,
  useMarkMessageAsRead,
  useHideConversation,
  useBlockConversation,
} from "./useChat";
import { useChatSocket } from "./useChatSocket";
import type { Message, Conversation } from "../types/chat.types";
import { useRouter, useSearchParams } from "next/navigation";

const getErrMsg = (error: any, fallback: string): string => {
  const msg = error?.response?.data?.message;
  if (typeof msg === "string") return msg;
  if (Array.isArray(msg)) return msg.join(", ");
  return fallback;
};

export function useChatFlow() {
  const { user } = useAuth();
  const token = useMemo(() => getAccessToken(), []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryConversationId = searchParams?.get("id") || null;

  const [activeConversationId, setActiveConversationId] = useState<number | null>(
    queryConversationId ? Number(queryConversationId) : null
  );
  const [conversationCache, setConversationCache] = useState<Record<number, Conversation>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 400);
  const [messageText, setMessageText] = useState("");

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mobileView, setMobileView] = useState<"list" | "chat">(
    queryConversationId ? "chat" : "list"
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMessagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (queryConversationId) {
      const numId = Number(queryConversationId);
      if (!isNaN(numId)) {
        setActiveConversationId(numId);
        setMobileView("chat");
      } else {
        setActiveConversationId(null);
        setMobileView("list");
      }
    } else {
      setActiveConversationId(null);
      setMobileView("list");
    }
  }, [queryConversationId]);

  const handleSelectConversation = (id: number | null) => {
    setActiveConversationId(id);
    if (id) {
      router.replace(`${window.location.pathname}?id=${id}`);
      setMobileView("chat");
    } else {
      router.replace(window.location.pathname);
      setMobileView("list");
    }
  };

  const {
    data: conversations,
    isLoading: isLoadingConversations,
  } = useConversations({
    search: debouncedSearch,
  });

  useEffect(() => {
    if (conversations?.data) {
      setConversationCache((prev) => {
        const next = { ...prev };
        conversations.data.forEach((c) => {
          next[c.conversationId] = c;
        });
        return next;
      });
    }
  }, [conversations]);

  const {
    data: messagesData,
    isLoading: isLoadingMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMessages(activeConversationId);

  const sendMessageMutation = useSendMessage();

  const markReadMutation = useMarkMessageAsRead();
  const hideConversationMutation = useHideConversation();
  const blockConversationMutation = useBlockConversation();

  useChatSocket({
    token,
    activeConversationId,
    userId: user?.user_id,
  });

  const filteredConversationsResponse = useMemo(() => {
    if (!conversations) return undefined;
    const isSearching = debouncedSearch.trim() !== "";
    const visibleList = conversations.data.filter((conv) => {
      if (isSearching) return true;
      return !conv.isHidden;
    });
    return {
      ...conversations,
      data: visibleList,
    };
  }, [conversations, debouncedSearch]);

  const queryName = searchParams?.get("name") || null;
  const queryAvatar = searchParams?.get("avatar") || null;

  const activeConversation = useMemo(() => {
    if (!activeConversationId) return null;

    const found = filteredConversationsResponse?.data?.find((c) => c.conversationId === activeConversationId);
    if (found) return found;

    const cached = conversationCache[activeConversationId];
    if (cached) return cached;

    return {
      conversationId: activeConversationId,
      lastMessageAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      unreadCount: 0,
      lastMessage: null,
      partner: {
        id: 0,
        name: queryName || "Đang kết nối...",
        avatarUrl: queryAvatar,
      },
      isBlocked: false,
      isHidden: false,
      isBlockedByPartner: false,
    };
  }, [filteredConversationsResponse, activeConversationId, conversationCache, queryName, queryAvatar]);

  const sortedMessages = useMemo(() => {
    if (!messagesData?.pages) return [];
    const allMsgs = messagesData.pages.flatMap((page) => page.messages);
    return [...allMsgs].sort((a, b) => a.messageId - b.messageId);
  }, [messagesData?.pages]);

  const groupedMessages = useMemo(() => {
    const parseDateSafely = (isoString: string) => {
      if (!isoString) return new Date();
      let dateStr = isoString;
      if (!dateStr.includes("Z") && !dateStr.includes("+") && !/-\d{2}:\d{2}$/.test(dateStr)) {
        if (dateStr.includes(":") || dateStr.includes(" ")) {
          dateStr = dateStr.replace(" ", "T");
          if (!dateStr.endsWith("Z")) {
            dateStr += "Z";
          }
        }
      }
      return new Date(dateStr);
    };

    const groups: { [key: string]: Message[] } = {};
    sortedMessages.forEach((msg) => {
      const date = parseDateSafely(msg.createdAt);
      const dateString = date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      if (!groups[dateString]) {
        groups[dateString] = [];
      }
      groups[dateString].push(msg);
    });
    return groups;
  }, [sortedMessages]);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior, block: "end" });
    }, 80);
  };

  useEffect(() => {
    if (activeConversationId) {
      scrollToBottom("auto");
    }
  }, [activeConversationId]);

  useEffect(() => {
    const container = chatMessagesContainerRef.current;
    if (container) {
      const threshold = 150;
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <=
        threshold;
      if (isNearBottom) {
        scrollToBottom("smooth");
      }
    }
  }, [sortedMessages.length]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const invalid = files.some((file) => !file.type.startsWith("image/"));
      if (invalid) {
        toast.error("Chỉ chấp nhận tập tin hình ảnh");
        return;
      }

      setSelectedImages((prev) => [...prev, ...files]);
      const newUrls = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newUrls]);
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeConversationId) return;
    if (!messageText.trim() && selectedImages.length === 0) return;

    if (selectedImages.length > 0 && !messageText.trim()) {
      toast.error("Vui lòng nhập thêm tin nhắn văn bản đi kèm với hình ảnh");
      return;
    }

    const content = messageText.trim();
    const images = selectedImages;

    setMessageText("");
    setSelectedImages([]);
    setImagePreviews([]);

    try {
      if (activeConversation?.isHidden) {
        await hideConversationMutation.mutateAsync({
          conversationId: activeConversationId,
          hidden: false,
        });
      }

      await sendMessageMutation.mutateAsync({
        conversationId: activeConversationId,
        content,
        images,
      });
      scrollToBottom("smooth");
    } catch (error: any) {
      toast.error(getErrMsg(error, "Không thể gửi tin nhắn"));
      setMessageText(content);
      setSelectedImages(images);
      const reUrls = images.map((f) => URL.createObjectURL(f));
      setImagePreviews(reUrls);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
      const prevHeight = target.scrollHeight;
      fetchNextPage().then(() => {
        setTimeout(() => {
          target.scrollTop = target.scrollHeight - prevHeight;
        }, 30);
      });
    }
  };

  useEffect(() => {
    if (!activeConversationId || sortedMessages.length === 0) return;
    const latestMessage = sortedMessages[sortedMessages.length - 1];

    if (
      latestMessage &&
      !latestMessage.isMine &&
      activeConversation &&
      activeConversation.unreadCount > 0
    ) {
      markReadMutation.mutate({
        conversationId: activeConversationId,
        messageId: latestMessage.messageId,
      });
    }
  }, [activeConversationId, sortedMessages.length, activeConversation]);

  const handleHideConversation = async () => {
    if (!activeConversationId) return;
    try {
      await hideConversationMutation.mutateAsync({
        conversationId: activeConversationId,
        hidden: true,
      });

      toast.success("Đã ẩn cuộc trò chuyện");
      setActiveConversationId(null);
      setMobileView("list");
    } catch (error: any) {
      toast.error(getErrMsg(error, "Không thể ẩn cuộc trò chuyện"));
    }
  };

  const handleBlockConversation = async () => {
    if (!activeConversationId || !activeConversation) return;
    const currentBlockState = activeConversation.isBlocked ?? false;
    const newBlockState = !currentBlockState;
    try {
      await blockConversationMutation.mutateAsync({
        conversationId: activeConversationId,
        blocked: newBlockState,
      });

      toast.success(newBlockState ? "Đã chặn cuộc trò chuyện" : "Đã bỏ chặn cuộc trò chuyện");
    } catch (error: any) {
      toast.error(getErrMsg(error, "Không thể thực hiện tác vụ"));
    }
  };

  return {
    user,
    conversations: filteredConversationsResponse?.data,
    isLoadingConversations,
    activeConversationId,
    setActiveConversationId: handleSelectConversation,
    activeConversation,
    searchQuery,
    setSearchQuery,
    messageText,
    setMessageText,
    imagePreviews,
    mobileView,
    setMobileView,
    sortedMessages,
    groupedMessages,
    isLoadingMessages,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isSending: sendMessageMutation.isPending,
    handleImageChange,
    removeImage,
    handleSendMessage,
    handleScroll,
    handleHideConversation,
    handleBlockConversation,
    fileInputRef,
    messagesEndRef,
    chatMessagesContainerRef,
  };
}
export default useChatFlow;
