import React, { useContext } from "react";
import Avatar from "../common/Avatar";
import { StateContext } from "@/app/page";

function ChatLIstItem({ data }) {
  // isContactPage upar dalna h
  const { setSet_Contact_page, setcurrentChatUser } = useContext(StateContext);

  const handleContactClick = () => {
    setSet_Contact_page(false);
    setcurrentChatUser(data);
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
          <span className="text-white">{data?.name}</span>
        </div>

        <div className="flex border-b border-conversation-border pb-2 pt-1 pr-2">
          <div className="flex justify-between w-full">
            <span className="text-secondary line-clamp-1 text-sm">
              {data?.about ?? "Hi , I am Using ChatHub"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatLIstItem;
