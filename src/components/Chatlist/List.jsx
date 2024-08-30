import { StateContext } from "../Main.jsx";
import { GET_INITIAL_CONTACTS } from "@/utils/ApiRoutes";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Loader from "../Loader";
import ChatLIstItem from "./ChatLIstItem";
import GeminiAi from "../common/GeminiAi.jsx";

import SearchBar from "../../common/SearchBar";

function List() {
  const {
    currentChatUserMessages,
    currentChatUser,
    setonlineUsers,
    setSET_USER_CONRACTS,
    SET_USER_CONRACTS,
  } = useContext(StateContext);
  const router = useRouter;
  const { userId, getToken } = useAuth();
  const [loading, setloading] = useState(true);

  const [searchTerm, setsearchTerm] = useState("");

  const [filteredContacts, setfilteredContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get(`${GET_INITIAL_CONTACTS}/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!data.status || !data.authentic) {
          router.push("/sign-in");
        }
        if (data.status) {
          setSET_USER_CONRACTS(data.data?.users);
          setonlineUsers(data.data?.onlineUsers);
        }
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) {
      getContacts();
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      if (searchTerm.length) {
        setfilteredContacts(
          SET_USER_CONRACTS?.filter((user) => {
            if (user.sender.user_id === userId) {
              return user.reciever.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            } else {
              return user.sender.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            }
          })
        );
      } else {
        setfilteredContacts(SET_USER_CONRACTS);
      }
    }
  }, [searchTerm]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-search-input-container-background flex-auto overflow-auto max-h-full no-scrollbar">
      <div className="my-2">
        <SearchBar
          value={searchTerm}
          onchange={setsearchTerm}
          placeholder={"Search Contacts"}
        />
      </div>
      <GeminiAi />
      {!searchTerm.length &&
        SET_USER_CONRACTS.map((user) => (
          <ChatLIstItem
            key={user.messageId}
            data={user}
            isContactPage={false}
          />
        ))}
      {searchTerm.length > 0 &&
        filteredContacts.map((user) => (
          <ChatLIstItem
            key={user.messageId}
            data={user}
            isContactPage={false}
          />
        ))}
    </div>
  );
}

export default List;
