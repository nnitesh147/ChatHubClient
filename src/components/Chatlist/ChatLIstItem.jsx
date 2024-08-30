import React, { useContext } from "react";
import Avatar from "../common/Avatar";
import { StateContext } from "../Main.jsx";
import { useAuth } from "@clerk/nextjs";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";
import { space } from "postcss/lib/list";
import { FaCamera, FaMicrophone } from "react-icons/fa";

function ChatLIstItem({ data, isContactPage }) {
  const { setSet_Contact_page, setcurrentChatUser, setgeminiaidetails } =
    useContext(StateContext);
  const { userId } = useAuth();

  const handleContactClick = () => {
    setSet_Contact_page(false);
    setgeminiaidetails(false);
    if (isContactPage) {
      setcurrentChatUser(data);
    } else {
      if (data.senderId === userId) {
        setcurrentChatUser(data.reciever);
      } else {
        setcurrentChatUser(data.sender);
      }
    }
  };

  return (
    <div
      className={`flex cursor-pointer items-center hover:bg-background-default-hover `}
      onClick={handleContactClick}
    >
      <div className="min-w-fit px-5 pt-3 pb-1">
        <Avatar type={"lg"} image={"/avatars/1.png"} />
      </div>
      <div className="min-h-full flex flex-col justify-center mt-3 pr-2 w-full">
        <div className="flex justify-between">
          {isContactPage && <span className="text-white">{data?.name}</span>}
          {!isContactPage && (
            <span className="text-white">
              {data.senderId === userId ? data.reciever.name : data.sender.name}
            </span>
          )}
        </div>
        {!isContactPage && (
          <div>
            <span
              className={`${
                data.totalUnreadMessages > 0
                  ? "text-icon-green"
                  : "text-secondary"
              } text-sm`}
            >
              {calculateTime(data.createdAt)}
            </span>
          </div>
        )}
        <div className="flex border-b border-conversation-border pb-2 pt-1 pr-2">
          <div className="flex justify-between w-full">
            <span className="text-secondary line-clamp-1 text-sm">
              {isContactPage ? (
                data?.about
              ) : (
                <div className="flex items-center gap-1 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[200px] xl:max-w-[300px]">
                  {data.senderId === userId && (
                    <MessageStatus
                      messageStatus={data.messageStatus}
                      key={data?.messageId}
                    />
                  )}
                  {data.messageType === "text" && (
                    <span className="truncate">{data.messageContent}</span>
                  )}
                  {data.messageType === "audio" && (
                    <span className="flex gap-1 items-center">
                      <FaMicrophone className="text-panel-header-icon" />
                      Audio
                    </span>
                  )}
                  {data.messageType === "image" && (
                    <span className="flex gap-1 items-center">
                      <FaCamera className="text-panel-header-icon" />
                      Image
                    </span>
                  )}
                </div>
              )}
            </span>
            {!isContactPage && data.totalUnreadMessages > 0 && (
              <span className="bg-icon-green px-[5px] rounded-full text-sm">
                {data.totalUnreadMessages}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLIstItem;
