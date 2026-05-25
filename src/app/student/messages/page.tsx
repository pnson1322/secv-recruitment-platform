import React, { Suspense } from "react";
import { Metadata } from "next";
import ChatContainer from "@/features/chat/components/ChatContainer";

export const metadata: Metadata = {
  title: "Tin nhắn",
  description: "Trò chuyện và trao đổi thông tin giữa sinh viên và nhà tuyển dụng",
};

export default function StudentMessagesPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <Suspense>
        <ChatContainer />
      </Suspense>
    </div>
  );
}
