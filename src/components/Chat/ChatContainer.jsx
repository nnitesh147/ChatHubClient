import { StateContext } from "@/app/page";
import React, { useContext, useEffect } from "react";
import { calculateTime } from "../../utils/CalculateTime.js";
import { useAuth } from "@clerk/nextjs";
import MessageStatus from "../common/MessageStatus.jsx";
import { useRouter } from "next/navigation.js";

function ChatContainer() {
  const { currentChatUserMessages, currentChatUser } = useContext(StateContext);

  const { userId } = useAuth();

  return (
    <div className="h-[80vh] relative w-full flex-grow">
      <div className="absolute inset-0 bg-chat-background bg-fixed opacity-25 z-10"></div>
      <div className="relative h-full z-20 overflow-auto  p-2 no-scrollbar overflow-x-clip">
        <div className="flex flex-col my-4 w-full gap-1">
          {currentChatUserMessages?.map((message, index) => (
            <div
              key={message?._id}
              className={`flex ${
                currentChatUser?.user_id === message.senderId
                  ? "justify-start"
                  : "justify-end"
              }`}
            >
              {message?.messageType === "text" && (
                <div
                  className="text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[50%]"
                  style={{
                    backgroundColor:
                      message?.senderId === currentChatUser?.user_id
                        ? "#202c33"
                        : "#005c4b",
                  }}
                >
                  <span className="break-all text-white">
                    {message?.messageContent}
                  </span>
                  <div className="flex gap-1 items-end">
                    <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                      {calculateTime(message?.createdAt)}
                    </span>
                    <span className="text-[11px] pt-1 min-w-fit">
                      {message?.senderId === userId && (
                        <MessageStatus messageStatus={message?.messageStatus} />
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
