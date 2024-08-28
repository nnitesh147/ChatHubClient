import { StateContext } from "../Main.jsx";
import { useAuth } from "@clerk/nextjs";
import { useContext } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { ADD_IMAGE_MESSAGE, SEND_MESSAGE } from "@/utils/ApiRoutes";
import axios from "axios";
import { useRouter } from "next/navigation";
import EmojiPicker from "emoji-picker-react";
import PhotoPicker from "../common/PhotoPicker";
import dynamic from "next/dynamic";
const CaptureAudio = dynamic(() => import("../common/CaptureAudio"), {
  ssr: false,
});

function MessageBar() {
  const router = useRouter();
  const { currentChatUser, socket, setcurrentChatUserMessages } =
    useContext(StateContext);
  const { userId, getToken } = useAuth();
  const [message, setmessage] = useState("");
  const [grabPhot, setgrabPhoto] = useState(false);
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const [showAudioRecord, setshowAudioRecord] = useState(false);

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

  useEffect(() => {
    if (grabPhot) {
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setgrabPhoto(false);
        }, 1000);
      };
    }
  }, [grabPhot]);

  const photoPickerChange = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      console.log(file);
      formData.set("file", file);
      const token = await getToken();
      const { data } = await axios.post(ADD_IMAGE_MESSAGE, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          from: userId,
          to: currentChatUser.user_id,
        },
      });
      if (data?.status) {
        const data1 = [data.data];
        // because to make it iterable
        socket.current.emit("send-msg", {
          from: userId,
          to: currentChatUser?.user_id,
          message: data1,
        });
        console.log(data?.data);
        setcurrentChatUserMessages((prevData) => [...prevData, ...data1]);
      }
    } catch (error) {}
  };

  return (
    <div className="bg-panel-header-background h-10 px-4 flex items-center gap-6 relative">
      {!showAudioRecord && (
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
              onClick={() => setgrabPhoto(true)}
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
              {message.length ? (
                <MdSend
                  className="text-panel-header-icon cursor-pointer text-xl"
                  title="Send Message"
                  onClick={sendMessage}
                />
              ) : (
                <FaMicrophone
                  className="text-panel-header-icon cursor-pointer text-xl"
                  title="Record Audio"
                  onClick={() => setshowAudioRecord(true)}
                />
              )}
            </button>
          </div>
        </>
      )}
      {grabPhot && <PhotoPicker onChange={photoPickerChange} />}
      {showAudioRecord && <CaptureAudio onChange={setshowAudioRecord} />}
    </div>
  );
}

export default MessageBar;
