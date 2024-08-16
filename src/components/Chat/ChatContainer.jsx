import { StateContext } from "@/app/page";
import React, { useContext } from "react";
import { calculateTime } from "../../utils/CalculateTime.js";
import { useAuth } from "@clerk/nextjs";
import MessageStatus from "../common/MessageStatus.jsx";

function ChatContainer() {
  const { currentChatUserMessages, currentChatUser } = useContext(StateContext);

  const { userId } = useAuth();

  return (
    <div className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar">
      <div className="bg-black h-full bg-fixed w-full opacity-80">
        {/* fixed left - 0 top - 0 bg-chat opacity-10 */}
        <div className="mx-5 y-6 relative bottom-0 z-40 left-0">
          <div className="flex w-full">
            <div className="flex flex-col w-full gap-1 overflow-auto">
              {currentChatUserMessages?.map((message, index) => (
                <div
                  key={message?._id}
                  className={`flex ${
                    currentChatUser.user_id === message.senderId
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  {message.messageType === "text" && (
                    <div
                      className="text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%]"
                      style={{
                        backgroundColor:
                          message.senderId === currentChatUser?.user_id
                            ? "#202c33"
                            : "#005c4b",
                      }}
                    >
                      <span className="break-all text-white">
                        {message.messageContent}
                      </span>
                      <div className="flex gap-1 items-end">
                        <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                          {calculateTime(message.createdAt)}
                        </span>
                        <span>
                          {message.senderId === userId && (
                            <MessageStatus
                              messageStatus={message.messageStatus}
                            />
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
      </div>
    </div>
  );
}

export default ChatContainer;
