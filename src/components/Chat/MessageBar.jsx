import { StateContext } from "@/app/page";
import { useAuth } from "@clerk/nextjs";
import { useContext } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { SEND_MESSAGE } from "@/utils/ApiRoutes";
import axios from "axios";
import { useRouter } from "next/navigation";
import EmojiPicker from "emoji-picker-react";

function MessageBar() {
  const router = useRouter();
  const { currentChatUser, socket, setcurrentChatUserMessages } =
    useContext(StateContext);
  const { userId, getToken } = useAuth();
  const [message, setmessage] = useState("");
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  const handleEmojiModal = () => {
    setshowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji) => {
    setmessage((prev) => (prev += emoji.emoji));
  };

  const sendMessage = async () => {
    if (message.length <= 0) {
      return;
    }
    const sendMessage = async () => {
      const token = await getToken();
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
        socket.current.emit("send-msg", {
          from: userId,
          to: currentChatUser?.user_id,
          message: data.data,
        });
        console.log(data?.data);
        setcurrentChatUserMessages((prevData) => [...prevData, ...data.data]);
        setmessage("");
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

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.id !== "emoji-open") {
        if (
          emojiPickerRef.current &&
          !emojiPickerRef.current.contains(e.target)
        ) {
          setshowEmojiPicker(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });

  return (
    <div className="bg-panel-header-background h-10 px-4 flex items-center gap-6 relative">
      <>
        <div className="flex gap-6">
          <BsEmojiSmile
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Emoji"
            id="emoji-open"
            onClick={handleEmojiModal}
          />
          {showEmojiPicker && (
            <div
              className="absolute bottom-24 left-16 z-40"
              ref={emojiPickerRef}
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
            </div>
          )}
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
