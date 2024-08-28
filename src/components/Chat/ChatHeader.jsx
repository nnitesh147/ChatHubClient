import { StateContext } from "../Main.jsx";
import { useContext, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoVideocam } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import Avatar from "../common/Avatar";
import ContextMenu from "../common/ContextMenu";
import { useAuth } from "@clerk/nextjs";

function ChatHeader() {
  const {
    currentChatUser,
    setSET_MESSAGE_SEARCH,
    SET_MESSAGE_SEARCH,
    SET_VIDEO_CALL,
    setSET_VIDEO_CALL,
    SET_VOICE_CALL,
    onlineUsers,
    setSET_VOICE_CALL,
    SET_INCOMING_VIDEO_CALL,
    setSET_INCOMING_VIDEO_CALL,
    SET_INCOMING_VOICE_CALL,
    setSET_INCOMING_VOICE_CALL,
    setcurrentChatUser,
    SET_USER_CONRACTS,
    setSET_USER_CONRACTS,
    setcurrentChatUserMessages,
  } = useContext(StateContext);
  const { userId } = useAuth();

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
  const [isContextMenuVisible, setisContextMenuVisible] = useState(false);
  const [contextMenuCordinate, setcontextMenuCordinate] = useState({
    x: 0,
    y: 0,
  });

  const showContextmenu = (e) => {
    e.preventDefault();

    setcontextMenuCordinate({
      x: e.pageX - 50,
      y: e.pageY + 20,
    });
    setisContextMenuVisible(true);
  };

  const contextMenuOptions = [
    {
      name: "Exit",
      callback: async () => {
        setcurrentChatUser(null);
        setcurrentChatUserMessages([]);
      },
    },
  ];

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center bg-panel-header-background border-b-2 border-b-black z-10">
      <div className="flex items-center justify-center gap-6">
        <Avatar type={"sm"} image={"/avatars/1.png"} />
        <div className="flex flex-col">
          <span className="text-primary-strong">{currentChatUser?.name}</span>
          <span className="text-secondary text-sm">
            {onlineUsers.includes(currentChatUser?.user_id)
              ? "Online"
              : "Offline"}
          </span>
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
        <BsThreeDotsVertical
          className="text-panel-header-icon cursor-pointer text-xl "
          onClick={(e) => showContextmenu(e)}
          id="context-opener"
        />
        {isContextMenuVisible && (
          <ContextMenu
            options={contextMenuOptions}
            cordinates={contextMenuCordinate}
            contextMenu={isContextMenuVisible}
            setContextMenu={setisContextMenuVisible}
          />
        )}
      </div>
    </div>
  );
}

export default ChatHeader;
