"use client";

import React from "react";
import useChatFlow from "../hooks/useChatFlow";
import ConversationList from "./ConversationList";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import EmptyChatState from "./EmptyChatState";

export default function ChatContainer() {
  const {
    user,
    conversations,
    isLoadingConversations,
    activeConversationId,
    setActiveConversationId,
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
    isSending,
    handleImageChange,
    removeImage,
    handleSendMessage,
    handleScroll,
    handleHideConversation,
    handleBlockConversation,
    fileInputRef,
    messagesEndRef,
    chatMessagesContainerRef,
  } = useChatFlow();

  return (
    <div className="flex h-[calc(100vh-140px)] min-h-[480px] w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <ConversationList
        conversations={conversations}
        isLoading={isLoadingConversations}
        activeId={activeConversationId}
        userId={user?.user_id}
        onSelect={(id) => {
          setActiveConversationId(id);
          setMobileView("chat");
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        mobileView={mobileView}
      />

      <div
        className={`h-full flex-1 flex-col bg-slate-50/50 lg:flex ${
          mobileView === "list" ? "hidden" : "flex"
        }`}
      >
        {activeConversationId && activeConversation ? (
          <>
            <ChatHeader
              activeConversation={activeConversation}
              role={user?.role}
              onBack={() => setMobileView("list")}
              onHide={handleHideConversation}
              onBlock={handleBlockConversation}
            />

            <MessageList
              chatMessagesContainerRef={chatMessagesContainerRef}
              onScroll={handleScroll}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
              isLoadingMessages={isLoadingMessages}
              sortedMessages={sortedMessages}
              groupedMessages={groupedMessages}
              activeConversation={activeConversation}
              messagesEndRef={messagesEndRef}
              currentUserId={user?.user_id}
            />

            <MessageInput
              messageText={messageText}
              setMessageText={setMessageText}
              imagePreviews={imagePreviews}
              removeImage={removeImage}
              fileInputRef={fileInputRef}
              handleImageChange={handleImageChange}
              handleSendMessage={handleSendMessage}
              isSending={isSending}
              isBlocked={activeConversation?.isBlocked}
              isBlockedByPartner={activeConversation?.isBlockedByPartner}
              onUnblock={handleBlockConversation}
            />
          </>
        ) : (
          <EmptyChatState />
        )}
      </div>
    </div>
  );
}
