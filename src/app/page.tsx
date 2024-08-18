"use client";
import { SignedIn } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import Empty from "../components/Empty.jsx";
import Chat from "../components/Chat/Chat.jsx";
import { createContext, useEffect, useRef, useState } from "react";

import ChatList from "../components/Chatlist/ChatList.jsx";
import { useRouter } from "next/navigation.js";
import axios from "axios";
import { GET_MESSAGE, HOST } from "@/utils/ApiRoutes.js";
import { io, Socket } from "socket.io-client";

export const StateContext = createContext({});

export default function Home() {
  const router = useRouter();
  const { userId, isLoaded, getToken } = useAuth();
  const [Set_Contact_page, setSet_Contact_page] = useState(false);
  const [socketEvent, setsocketEvent] = useState(false);

  const [currentChatUser, setcurrentChatUser] = useState(null);
  const [currentChatUserMessages, setcurrentChatUserMessages] = useState([]);

  if (!isLoaded) return;

  if (!userId) {
    router.push("/sign-in");
  }

  const socket = useRef<Socket>();

  useEffect(() => {
    if (userId) {
      socket.current = io(HOST);
      socket.current?.emit("add-user", userId);
    }
  }, [userId]);

  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on("msg-recieved", (data) => {
        setcurrentChatUserMessages((prevData) => [
          ...prevData,
          ...data.message,
        ]);
      });
      setsocketEvent(true);
    }
  }, [socket.current]);

  useEffect(() => {
    const getMessages = async () => {
      const token = await getToken();
      try {
        const { data } = await axios.get(
          `${GET_MESSAGE}/${userId}/${currentChatUser?.user_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!data.authentic) {
          router.push("/sign-in");
        }
        if (!data?.status) {
          router.refresh();
        }
        setcurrentChatUserMessages(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentChatUser != null) {
      getMessages();
    }
  }, [currentChatUser]);

  return (
    <SignedIn>
      <StateContext.Provider
        value={{
          setSet_Contact_page,
          currentChatUserMessages,
          Set_Contact_page,
          currentChatUser,
          setcurrentChatUser,
          setcurrentChatUserMessages,
          socket,
        }}
      >
        <div className="flex flex-row w-screen h-screen max-h-screen max-w-full overflow-hidden border-t-2 border-t-black">
          <div className="w-[30%] border-r-black border-r-2 h-screen max-h-screen">
            <ChatList />
          </div>
          <div className="w-[70%]">
            {currentChatUser != null ? <Chat /> : <Empty />}
          </div>
        </div>
      </StateContext.Provider>
    </SignedIn>
  );
}
