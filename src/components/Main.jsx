"use client";
import VideoCall from "../components/Call/VideoCall.jsx";
import VoiceCall from "../components/Call/VoiceCall.jsx";
import Chat from "../components/Chat/Chat.jsx";
import SearchMessages from "../components/Chat/SearchMessages.jsx";
import IncomingCall from "../components/common/IncomingCall.jsx";
import IncomingVideoCall from "../components/common/IncomingVideoCall.jsx";
import Empty from "../components/Empty.jsx";
import GeminiChatComponent from "../components/common/GeminiChatComponent.jsx";

import { useAuth } from "@clerk/nextjs";
import { createContext, useEffect, useRef, useState } from "react";

import { GET_MESSAGE, HOST } from "@/utils/ApiRoutes.js";
import axios from "axios";
import { useRouter } from "next/navigation.js";
import { io } from "socket.io-client";
import ChatList from "../components/Chatlist/ChatList.jsx";

export const StateContext = createContext({});

function Main() {
  const router = useRouter();
  const socket = useRef(null);
  const { userId, getToken } = useAuth();
  const [Set_Contact_page, setSet_Contact_page] = useState(false);
  const [SET_MESSAGE_SEARCH, setSET_MESSAGE_SEARCH] = useState(false);
  const [SET_USER_CONRACTS, setSET_USER_CONRACTS] = useState([]);
  const [onlineUsers, setonlineUsers] = useState([]);
  const [socketEvent, setsocketEvent] = useState(false);
  const [currentChatUser, setcurrentChatUser] = useState(null);
  const [currentChatUserMessages, setcurrentChatUserMessages] = useState([]);

  const [geminiaidetails, setgeminiaidetails] = useState(false);

  const [SET_VIDEO_CALL, setSET_VIDEO_CALL] = useState(undefined);
  const [SET_VOICE_CALL, setSET_VOICE_CALL] = useState(undefined);
  const [SET_INCOMING_VIDEO_CALL, setSET_INCOMING_VIDEO_CALL] =
    useState(undefined);
  const [SET_INCOMING_VOICE_CALL, setSET_INCOMING_VOICE_CALL] =
    useState(undefined);

  useEffect(() => {
    if (userId) {
      socket.current = io(HOST, {
        transports: ["websocket", "polling"],
      });
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

      socket.current.on("incoming-voice-call", ({ from, roomId, callType }) => {
        setSET_INCOMING_VOICE_CALL({
          ...from,
          roomId,
          callType,
        });
      });
      socket.current.on("incoming-video-call", ({ from, roomId, callType }) => {
        setSET_INCOMING_VIDEO_CALL({
          ...from,
          roomId,
          callType,
        });
      });

      socket.current.on("voice-call-rejected", () => {
        setSET_INCOMING_VIDEO_CALL(undefined);
        setSET_INCOMING_VOICE_CALL(undefined);
        setSET_VIDEO_CALL(undefined);
        setSET_VOICE_CALL(undefined);
      });
      socket.current.on("video-call-rejected", () => {
        setSET_INCOMING_VIDEO_CALL(undefined);
        setSET_INCOMING_VOICE_CALL(undefined);
        setSET_VIDEO_CALL(undefined);
        setSET_VOICE_CALL(undefined);
      });

      socket.current.on("online-users", ({ onlineUsers }) => {
        setonlineUsers(onlineUsers);
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
    <StateContext.Provider
      value={{
        SET_VIDEO_CALL,
        geminiaidetails,
        setgeminiaidetails,
        setSET_VIDEO_CALL,
        SET_VOICE_CALL,
        setSET_VOICE_CALL,
        SET_INCOMING_VIDEO_CALL,
        setSET_INCOMING_VIDEO_CALL,
        SET_INCOMING_VOICE_CALL,
        setSET_INCOMING_VOICE_CALL,
        setSet_Contact_page,
        currentChatUserMessages,
        Set_Contact_page,
        currentChatUser,
        setcurrentChatUser,
        SET_USER_CONRACTS,
        setSET_USER_CONRACTS,
        setcurrentChatUserMessages,
        onlineUsers,
        setonlineUsers,
        socket,
        setSET_MESSAGE_SEARCH,
        SET_MESSAGE_SEARCH,
      }}
    >
      {SET_INCOMING_VIDEO_CALL && <IncomingVideoCall />}
      {SET_INCOMING_VOICE_CALL && <IncomingCall />}
      {SET_VIDEO_CALL && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VideoCall />
        </div>
      )}
      {SET_VOICE_CALL && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VoiceCall />
        </div>
      )}
      {!SET_VIDEO_CALL && !SET_VOICE_CALL && (
        <div className="flex flex-row w-screen h-screen max-h-screen max-w-full overflow-hidden border-t-2 border-t-black">
          <div className="w-[30%] border-r-black border-r-2 h-screen max-h-screen">
            <ChatList />
          </div>
          <div className="w-[70%]">
            {currentChatUser != null && (
              <div
                className={
                  SET_MESSAGE_SEARCH ? "grid grid-cols-2" : "grid-cols-2"
                }
              >
                <Chat />
                {SET_MESSAGE_SEARCH && <SearchMessages />}
              </div>
            )}
            {geminiaidetails && (
              <div>
                <GeminiChatComponent />
              </div>
            )}
            {currentChatUser === null && !geminiaidetails && <Empty />}
          </div>
        </div>
      )}
    </StateContext.Provider>
  );
}

export default Main;
