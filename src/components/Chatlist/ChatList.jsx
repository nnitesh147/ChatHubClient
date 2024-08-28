import ChatListHeader from "./ChatListHeader.jsx";
import SearchBar from "./SearchBar.jsx";
import { StateContext } from "../Main.jsx";
import React, { useContext, useEffect, useState } from "react";
import List from "./List.jsx";
import ContactsList from "../Chatlist/ContactsList.jsx";

function ChatList() {
  const { Set_Contact_page } = useContext(StateContext);
  const [pageType, setpageType] = useState("default");

  useEffect(() => {
    if (Set_Contact_page) {
      setpageType("all-contacts");
    } else {
      setpageType("default");
    }
  }, [Set_Contact_page]);

  return (
    <div className="bg-gray-800 flex flex-col max-h-screen z-20 h-full">
      {pageType === "default" && (
        <>
          <ChatListHeader />
          <List />
        </>
      )}
      {pageType === "all-contacts" && (
        <>
          <ContactsList />
        </>
      )}
    </div>
  );
}

export default ChatList;
