import React, { useContext } from "react";
import Avatar from "../common/Avatar";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { StateContext } from "@/app/page";

function ChatHeader() {
  const {
    currentChatUser,
    setSET_MESSAGE_SEARCH,
    SET_MESSAGE_SEARCH,
    SET_VIDEO_CALL,
    setSET_VIDEO_CALL,
    SET_VOICE_CALL,
    setSET_VOICE_CALL,
    SET_INCOMING_VIDEO_CALL,
    setSET_INCOMING_VIDEO_CALL,
    SET_INCOMING_VOICE_CALL,
    setSET_INCOMING_VOICE_CALL,
  } = useContext(StateContext);

  const handleVoiceCall = () => {
    setSET_VOICE_CALL({
      ...currentChatUser,
      type: "out-going",
      callType: "voice",
      roomId: Date.now(),
    });
  };
  const handleVideoCall = () => {
    setSET_VIDEO_CALL({
      ...currentChatUser,
      type: "out-going",
      callType: "video",
      roomId: Date.now(),
    });
  };

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center bg-panel-header-background border-b-2 border-b-black z-10">
      <div className="flex items-center justify-center gap-6">
        <Avatar type={"sm"} image={"/avatars/1.png"} />
        <div className="flex flex-col">
          <span className="text-primary-strong">{currentChatUser?.name}</span>
          <span className="text-secondary text-sm">online|offline</span>
        </div>
      </div>
      <div className="flex gap-6">
        <MdCall
          className="text-panel-header-icon cursor-pointer text-xl "
          onClick={handleVoiceCall}
        />
        <IoVideocam
          className="text-panel-header-icon cursor-pointer text-xl "
          onClick={handleVideoCall}
        />
        <BiSearchAlt2
          className="text-panel-header-icon cursor-pointer text-xl "
          onClick={() => setSET_MESSAGE_SEARCH(!SET_MESSAGE_SEARCH)}
        />
        <BsThreeDotsVertical className="text-panel-header-icon cursor-pointer text-xl " />
      </div>
    </div>
  );
}

export default ChatHeader;
