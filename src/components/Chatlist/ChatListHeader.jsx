import React from "react";
import Avatar from "../common/Avatar";
import { BsFillChatLeftFill, BsThreeDotsVertical } from "react-icons/bs";

function ChatListHeader() {
  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center border-b-2 border-b-black">
      <div className="cursor-pointer">
        <Avatar type={"sm"} image={"/avatars/1.png"} />
      </div>
      <div className="flex gap-6">
        <BsFillChatLeftFill
          className="text-panel-header-icon cursor-pointer text-xl"
          title="New Chat"
        />
        <>
          <BsThreeDotsVertical
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Menu"
          />
        </>
      </div>
    </div>
  );
}

export default ChatListHeader;
