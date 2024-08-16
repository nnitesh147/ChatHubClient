import { useContext } from "react";
import Avatar from "../common/Avatar";
import { BsFillChatLeftFill, BsThreeDotsVertical } from "react-icons/bs";
import { StateContext } from "@/app/page";

function ChatListHeader() {
  const { setSet_Contact_page } = useContext(StateContext);

  const handleAllContactPage = () => {
    setSet_Contact_page(true);
  };

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
          />
        </>
      </div>
    </div>
  );
}

export default ChatListHeader;
