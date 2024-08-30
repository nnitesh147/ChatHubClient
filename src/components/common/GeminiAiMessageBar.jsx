import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { MdSend } from "react-icons/md";
import { GeminiContext } from "./GeminiChatComponent.jsx";
import { SEND_TO_GEMINI_MESSAGE } from "@/utils/ApiRoutes.js";

function GeminiAiMessageBar() {
  const router = useRouter();
  const { geminiMessages, setgeminiMessages } = useContext(GeminiContext);
  const { userId, getToken } = useAuth();
  const [message, setmessage] = useState("");

  const sendMessage = async () => {
    if (message.length <= 0) {
      return;
    }
    try {
      const token = await getToken();
      setmessage("");
      const { data } = await axios.post(
        SEND_TO_GEMINI_MESSAGE,
        {
          from: userId,
          prompt: message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setgeminiMessages((prev) => [...prev, ...data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-panel-header-background h-10 px-4 flex items-center gap-6 relative">
      <>
        <div className="w-full rounded-lg h-8 flex items-center">
          <input
            type="text"
            placeholder="Type a message"
            className="bg-input-background text-sm focus:outline-none text-white h-8 rounded-lg px-5 py-4 w-full"
            onChange={(e) => setmessage(e.target.value)}
            value={message}
          />
        </div>
        <div className="flex w-10 items-center justify-center">
          <button>
            <MdSend
              className="text-panel-header-icon cursor-pointer text-xl"
              title="Send Message"
              onClick={sendMessage}
            />
          </button>
        </div>
      </>
    </div>
  );
}

export default GeminiAiMessageBar;
