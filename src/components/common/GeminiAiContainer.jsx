import { useAuth } from "@clerk/nextjs";
import { useContext, useEffect, useRef, useState } from "react";
import { calculateTime } from "../../utils/CalculateTime.js";
import { GeminiContext } from "./GeminiChatComponent.jsx";
import { GET_ALL_GEMINI_MESSAGE } from "@/utils/ApiRoutes.js";
import axios from "axios";
import Loader from "../Loader.jsx";

function GeminiAiContainer() {
  const { geminiMessages, setgeminiMessages } = useContext(GeminiContext);
  const containerRef = useRef();

  const [loader, setloader] = useState(true);

  const { userId, getToken } = useAuth();

  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [geminiMessages]);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get(
          `${GET_ALL_GEMINI_MESSAGE}/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setgeminiMessages(data.data);
        setloader(false);
      } catch (error) {
        console.log(error);
        setloader(false);
      }
    };
    getData();
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="h-[80vh] relative w-full flex-grow">
      <div className="absolute inset-0 bg-chat-background bg-fixed opacity-25 z-10"></div>
      <div
        className="relative h-full z-20 overflow-auto  p-2 no-scrollbar overflow-x-clip scroll"
        ref={containerRef}
      >
        <div className="flex flex-col my-4 w-full gap-1">
          {geminiMessages?.map((message, index) => (
            <div
              key={index + Date.now()}
              className={`flex ${
                userId === message.senderId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className="text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[50%]"
                style={{
                  backgroundColor:
                    message?.senderId === userId ? "#202c33" : "#005c4b",
                }}
              >
                <span className="break-all text-white">
                  {message?.promptResult.split("**").join("\n")}
                </span>
                <div className="flex gap-1 items-end">
                  <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                    {calculateTime(message?.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GeminiAiContainer;
