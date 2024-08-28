import { StateContext } from "../Main.jsx";
import { useContext, useState } from "react";
import { BsFillChatLeftFill, BsThreeDotsVertical } from "react-icons/bs";
import Avatar from "../common/Avatar";
import { useRouter } from "next/navigation";
import ContextMenu from "../common/ContextMenu";
import { useAuth, useClerk } from "@clerk/nextjs";

function ChatListHeader() {
  const router = useRouter();
  const { userId } = useAuth();
  const { signOut } = useClerk();

  const { setSet_Contact_page, socket } = useContext(StateContext);

  const handleAllContactPage = () => {
    setSet_Contact_page(true);
  };

  const [isContextMenuVisible, setisContextMenuVisible] = useState(false);
  const [contextMenuCordinate, setcontextMenuCordinate] = useState({
    x: 0,
    y: 0,
  });

  const showContextmenu = (e) => {
    e.preventDefault();

    setcontextMenuCordinate({
      x: e.pageX,
      y: e.pageY,
    });
    setisContextMenuVisible(true);
  };

  const contextMenuOptions = [
    {
      name: "LogOut",
      callback: async () => {
        await socket.current.emit("logout", userId);
        signOut({ redirectUrl: "/sign-in" });
      },
    },
  ];

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center border-b-2 border-b-black">
      <div className="cursor-pointer">
        <Avatar type={"sm"} image={"/avatars/1.png"} />
      </div>
      <div className="flex gap-6">
        <BsFillChatLeftFill
          className="text-panel-header-icon cursor-pointer text-xl"
          title="New Chat"
          onClick={handleAllContactPage}
        />
        <>
          <BsThreeDotsVertical
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Menu"
            id="context-opener"
            onClick={(e) => showContextmenu(e)}
          />
          {isContextMenuVisible && (
            <ContextMenu
              options={contextMenuOptions}
              cordinates={contextMenuCordinate}
              contextMenu={isContextMenuVisible}
              setContextMenu={setisContextMenuVisible}
            />
          )}
        </>
      </div>
    </div>
  );
}

export default ChatListHeader;
