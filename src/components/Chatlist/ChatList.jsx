import React from "react";
import ChatListHeader from "./ChatListHeader.jsx";
import SearchBar from "./SearchBar.jsx";

import List from "./List.jsx";

function ChatList() {
  return (
    <div className="bg-gray-800 flex flex-col max-h-screen z-20 h-full">
      <>
        <ChatListHeader />
        <SearchBar />
        <List />
      </>
    </div>
  );
}

export default ChatList;
