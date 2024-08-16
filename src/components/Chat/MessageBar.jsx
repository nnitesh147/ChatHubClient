import { StateContext } from "@/app/page";
import { useAuth } from "@clerk/nextjs";
import { useContext } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { useState } from "react";
import { SEND_MESSAGE } from "@/utils/ApiRoutes";
import axios from "axios";
import { useRouter } from "next/navigation";

function MessageBar() {
  const router = useRouter();
  const { currentChatUser } = useContext(StateContext);
  const { userId, getToken } = useAuth();
  const [message, setmessage] = useState("");

  const sendMessage = async () => {
    if (message.length <= 0) {
      return;
    }
    const sendMessage = async () => {
      const token = await getToken();
      setmessage("");
      try {
        const { data } = await axios.post(
          SEND_MESSAGE,
          {
            from: userId,
            to: currentChatUser?.user_id,
            message: message,
          },
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
      } catch (error) {
        console.log(error);
        router.refresh();
      }
    };
    sendMessage();
  };

  return (
    <div className="bg-panel-header-background h-10 px-4 flex items-center gap-6 relative">
      <>
        <div className="flex gap-6">
          <BsEmojiSmile
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Emoji"
          />
          <ImAttachment
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Attach file"
          />
        </div>
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
            {/* <FaMicrophone
              className="text-panel-header-icon cursor-pointer text-xl"
              title="Record Audio"
            /> */}
          </button>
        </div>
      </>
    </div>
  );
}

export default MessageBar;
