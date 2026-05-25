import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import {
  getConversations,
  getMessages,
  createConversation,
  sendMessage,
  markMessageAsRead,
  hideConversation,
  blockConversation,
} from "../api/chat.api";
import type {
  Conversation,
  ConversationsResponse,
  Message,
  MessagesResponse,
  ApiResponse,
} from "../types/chat.types";

export const chatKeys = {
  all: ["chat"] as const,
  conversations: (params?: { page?: number; limit?: number; search?: string }) =>
    [...chatKeys.all, "conversations", params] as const,
  messages: (conversationId: number) =>
    [...chatKeys.all, "messages", conversationId] as const,
};

export function useConversations(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: chatKeys.conversations(params),
    queryFn: () => getConversations(params),
    placeholderData: (previousData) => previousData,
    select: (res) => res.data,
  });
}

export function useMessages(conversationId: number | null) {
  return useInfiniteQuery({
    queryKey: chatKeys.messages(conversationId ?? 0),
    queryFn: async ({ pageParam }) => {
      const res = await getMessages(conversationId!, {
        cursor: pageParam,
        limit: 20,
      });
      return res.data;
    },
    enabled: !!conversationId,
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}

export function useCreateConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      studentId,
      companyId,
    }: {
      studentId: number;
      companyId: number;
    }) => createConversation(studentId, companyId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["chat", "conversations"] });
      return res.data;
    },
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (res) => {
      const message = res.data.message;
      const conversationId = message.conversationId;

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
            messages: [...pages[0].messages, message],
          };
          return {
            ...oldData,
            pages,
          };
        }
      );

      queryClient.invalidateQueries({ queryKey: ["chat", "conversations"] });

      return res.data;
    },
  });
}

export function useMarkMessageAsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markMessageAsRead,
    onSuccess: (res, variables) => {
      queryClient.setQueriesData<ApiResponse<ConversationsResponse>>(
        { queryKey: ["chat", "conversations"] },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: oldData.data.data.map((conv) =>
                conv.conversationId === variables.conversationId
                  ? { ...conv, unreadCount: 0 }
                  : conv
              ),
            },
          };
        }
      );
      return res.data;
    },
  });
}

export function useHideConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: hideConversation,
    onSuccess: (res, variables) => {
      queryClient.setQueriesData<ApiResponse<ConversationsResponse>>(
        { queryKey: ["chat", "conversations"] },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: oldData.data.data.map((conv) =>
                conv.conversationId === variables.conversationId
                  ? { ...conv, isHidden: variables.hidden }
                  : conv
              ),
            },
          };
        }
      );
      queryClient.invalidateQueries({ queryKey: ["chat", "conversations"] });
      return res.data;
    },
  });
}

export function useBlockConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blockConversation,
    onSuccess: (res, variables) => {
      queryClient.setQueriesData<ApiResponse<ConversationsResponse>>(
        { queryKey: ["chat", "conversations"] },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: oldData.data.data.map((conv) =>
                conv.conversationId === variables.conversationId
                  ? { ...conv, isBlocked: variables.blocked }
                  : conv
              ),
            },
          };
        }
      );
      queryClient.invalidateQueries({ queryKey: ["chat", "conversations"] });
      return res.data;
    },
  });
}
