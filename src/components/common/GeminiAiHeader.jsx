import { useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Avatar from "../common/Avatar";
import ContextMenu from "../common/ContextMenu";
import { StateContext } from "../Main.jsx";

function GeminiAiHeader() {
  const { setcurrentChatUser, setcurrentChatUserMessages, setgeminiaidetails } =
    useContext(StateContext);

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
        setgeminiaidetails(false);
        setcurrentChatUserMessages([]);
      },
    },
  ];

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center bg-panel-header-background border-b-2 border-b-black z-10">
      <div className="flex items-center justify-center gap-6">
        <Avatar type={"sm"} image={"/avatars/MyAi.jpg"} />
        <div className="flex flex-col">
          <span className="text-primary-strong">MyAi</span>
          <span className="text-secondary text-sm">
            Always there for you...
          </span>
        </div>
      </div>
      <div className="flex gap-6">
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

export default GeminiAiHeader;
