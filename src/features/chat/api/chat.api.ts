import { api } from "@/lib/axios";
import type {
  ApiResponse,
  ConversationsResponse,
  MessagesResponse,
  CreateConversationResponse,
  SendMessageResponse,
  ConversationStatusResponse,
} from "../types/chat.types";

export async function getConversations(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const cleanParams = { ...params };
  if (!cleanParams.search || cleanParams.search.trim() === "") {
    delete cleanParams.search;
  }
  const res = await api.get<ApiResponse<ConversationsResponse>>("/chat/conversations", {
    params: cleanParams,
  });
  console.log(res.data);
  return res.data;
}

export async function getMessages(
  conversationId: number,
  params?: {
    cursor?: number;
    limit?: number;
  }
) {
  const res = await api.get<ApiResponse<MessagesResponse>>(
    `/chat/conversation/${conversationId}/messages`,
    { params }
  );
  return res.data;
}

export async function createConversation(studentId: number, companyId: number) {
  const res = await api.post<ApiResponse<CreateConversationResponse>>("/chat/conversation", {
    studentId,
    companyId,
  });
  return res.data;
}

export async function sendMessage({
  conversationId,
  content,
  images,
}: {
  conversationId: number;
  content: string;
  images?: File[];
}) {
  const formData = new FormData();
  formData.append("conversationId", conversationId.toString());
  formData.append("content", content ?? "");

  if (images && images.length > 0) {
    images.forEach((img) => {
      formData.append("images", img);
    });
  }

  const res = await api.post<ApiResponse<SendMessageResponse>>("/chat/message", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function markMessageAsRead(payload: {
  conversationId: number;
  messageId: number;
}) {
  const res = await api.patch<ApiResponse<Record<string, never>>>("/chat/read", payload);
  return res.data;
}

export async function hideConversation(payload: {
  conversationId: number;
  hidden: boolean;
}) {
  const res = await api.patch<ApiResponse<ConversationStatusResponse>>("/chat/hidden", payload);
  return res.data;
}

export async function blockConversation(payload: {
  conversationId: number;
  blocked: boolean;
}) {
  const res = await api.patch<ApiResponse<ConversationStatusResponse>>("/chat/blocked", payload);
  return res.data;
}
