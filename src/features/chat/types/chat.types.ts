export type Partner = {
  id: number;
  name: string;
  avatarUrl: string | null;
};

export type LastMessage = {
  content: string;
  hasImages: boolean | null;
  senderId: number;
  createdAt: string;
};

export type Conversation = {
  conversationId: number;
  lastMessageAt: string;
  createdAt: string;
  unreadCount: number;
  lastMessage: LastMessage | null;
  partner: Partner;
  isBlocked?: boolean;
  isHidden?: boolean;
  isBlockedByPartner?: boolean;
};

export type Message = {
  messageId: number;
  conversationId: number;
  senderId: number;
  content: string;
  imageUrls: string[];
  createdAt: string;
  isMine: boolean;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type ConversationsResponse = {
  data: Conversation[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};

export type MessagesResponse = {
  messages: Message[];
  nextCursor: number | null;
};

export type CreateConversationResponse = {
  conversationId: number;
  isNew: boolean;
};

export type SendMessageResponse = {
  message: Message;
};

export type SendMessagePayload = {
  conversationId: number;
  content: string;
  images?: File[];
};

export type MarkReadPayload = {
  conversationId: number;
  messageId: number;
};

export type UpdateHiddenPayload = {
  conversationId: number;
  hidden: boolean;
};

export type UpdateBlockedPayload = {
  conversationId: number;
  blocked: boolean;
};

export type ConversationStatusResponse = {
  userId: number;
  conversationId: number;
  isHidden: boolean;
  isBlocked: boolean;
  lastReadMessageId: number;
};
