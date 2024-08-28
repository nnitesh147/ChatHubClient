import { StateContext } from "../Main.jsx";
import { calculateTime } from "@/utils/CalculateTime";
import { useContext, useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import SearchBar from "../../common/SearchBar.jsx";

function SearchMessages() {
  const {
    currentChatUser,
    setSET_MESSAGE_SEARCH,
    SET_MESSAGE_SEARCH,
    currentChatUserMessages,
  } = useContext(StateContext);

  const [searchTerm, setsearchTerm] = useState("");
  const [searchMessages, setsearchMessages] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      setsearchMessages(
        currentChatUserMessages.filter(
          (message) =>
            message.messageType === "text" &&
            message.messageContent.includes(searchTerm)
        )
      );
    } else {
      setsearchMessages([]);
    }
  }, [searchTerm]);

  return (
    <div className="border-conversation-border border-1 w-full bg-conversation-panel-background flex flex-col z-10 max-h-screen">
      <div className="h-16 px-4 py-3 flex gap-10 items-center bg-panel-header-background text-primary-strong">
        <IoClose
          className="cursor-pointer text-icon-lighter text-2xl"
          onClick={() => setSET_MESSAGE_SEARCH(!SET_MESSAGE_SEARCH)}
        />
        <span>Search Messages</span>
      </div>
      <div className="overflow-auto no-scrollbar h-full">
        <div className="flex items-center flex-col w-full">
          <div className="flex px-5 items-center gap-3 h-14 w-full">
            <SearchBar
              value={searchTerm}
              onchange={setsearchTerm}
              placeholder={`Search Messages With ${currentChatUser?.name}`}
            />
          </div>
          <span className="mt-10 text-secondary">
            {!searchTerm.length &&
              `Seach Messages with ${currentChatUser?.name}`}
          </span>
        </div>
        <div className="flex justify-center h-full flex-col">
          {searchTerm.length > 0 && !searchMessages.length && (
            <span className="text-secondary w-full flex justify-center">
              No Messages found
            </span>
          )}
          <div className="flex flex-col w-full h-full">
            {searchMessages?.map((message, index) => (
              <div
                className="flex cursor-pointer flex-col justify-center hover:bg-background-default-hover w-full px-5 border-b-[0.1px] border-secondary py-5"
                key={message?.createdAt + index}
              >
                <div className="text-sm text-secondary">
                  {calculateTime(message?.createdAt)}
                </div>
                <div className="text-icon-green">{message?.messageContent}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchMessages;
