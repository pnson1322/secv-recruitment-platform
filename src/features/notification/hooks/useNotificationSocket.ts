"use client";

import { useEffect } from "react";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { connectSocket } from "@/lib/socket";
import { notificationKeys } from "./useNotification";
import type {
  NotificationItem,
  PaginationResponse,
  ResponseSuccess,
} from "../types/notification.types";

type NotificationListResponse = ResponseSuccess<
  PaginationResponse<NotificationItem>
>;

type NotificationInfiniteData = InfiniteData<NotificationListResponse, number>;

type UseNotificationSocketOptions = {
  enabled?: boolean;
  showToast?: boolean;
  onlyToastWhenTabHidden?: boolean;
};

export function useNotificationSocket(
  token?: string,
  options?: UseNotificationSocketOptions,
) {
  const queryClient = useQueryClient();
  const enabled = options?.enabled ?? true;
  const showToast = options?.showToast ?? true;
  const onlyToastWhenTabHidden = options?.onlyToastWhenTabHidden ?? false;

  useEffect(() => {
    if (!token || !enabled) return;

    const socket = connectSocket(token);

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
    };

    const handleNotification = (newNotification: NotificationItem) => {
      let inserted = false;

      queryClient.setQueryData<NotificationInfiniteData>(
        notificationKeys.infinite(),
        (oldData) => {
          if (!oldData || oldData.pages.length === 0) {
            return oldData;
          }

          const existed = oldData.pages.some((page) =>
            page.data.data.some(
              (item) =>
                item.notification_id === newNotification.notification_id,
            ),
          );

          if (existed) {
            return oldData;
          }

          inserted = true;

          const firstPage = oldData.pages[0];

          return {
            ...oldData,
            pages: [
              {
                ...firstPage,
                data: {
                  ...firstPage.data,
                  data: [newNotification, ...firstPage.data.data],
                },
              },
              ...oldData.pages.slice(1),
            ],
          };
        },
      );

      if (!inserted) {
        queryClient.invalidateQueries({
          queryKey: notificationKeys.infinite(),
        });
      }

      if (!newNotification.is_read) {
        queryClient.setQueryData<number>(
          notificationKeys.unread(),
          (oldCount = 0) => oldCount + 1,
        );
        queryClient.invalidateQueries({
          queryKey: notificationKeys.unread(),
        });
      }

      const tabHidden =
        typeof document !== "undefined" ? document.hidden : false;
      const shouldToast = showToast && (!onlyToastWhenTabHidden || tabHidden);

      if (shouldToast) {
        toast(newNotification.title || "Bạn có thông báo mới", {
          description: newNotification.message,
        });
      }
    };

    socket.on("connect", handleConnect);
    socket.on("notification", handleNotification);

    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("notification", handleNotification);
    };
  }, [token, enabled, showToast, onlyToastWhenTabHidden, queryClient]);
}
