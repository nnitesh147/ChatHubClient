import { StateContext } from "../Main";
import Image from "next/image";
import { useContext, useState } from "react";
import { MdOutlineCallEnd } from "react-icons/md";

function Container({ data }) {
  const [callAccepted, setcallAccepted] = useState(false);
  const {
    currentChatUser,
    SET_VIDEO_CALL,
    setSET_VIDEO_CALL,
    SET_VOICE_CALL,
    setSET_VOICE_CALL,
    SET_INCOMING_VIDEO_CALL,
    setSET_INCOMING_VIDEO_CALL,
    SET_INCOMING_VOICE_CALL,
    setSET_INCOMING_VOICE_CALL,
    socket,
  } = useContext(StateContext);

  const endCall = () => {
    if (data.callType === "video") {
      socket.current.emit("reject-video-call", {
        from: data.id ?? data.user_id,
      });
    } else {
      socket.current.emit("reject-voice-call", {
        from: data.id ?? data.user_id,
      });
    }
    setSET_VIDEO_CALL(undefined);
    setSET_VOICE_CALL(undefined);
    setSET_INCOMING_VIDEO_CALL(undefined);
    setSET_INCOMING_VOICE_CALL(undefined);
  };

  return (
    <div
      className="border-conversation-border border-l bg-conversation-panel-background 
  flex flex-col h-[100vh] overflow-hidden items-center justify-center text-white"
    >
      <div className="flex flex-col gap-3 items-center">
        <span className="text-5xl ">{data?.name}</span>
        <span className="text-lg">
          {callAccepted && data.callType !== "video"
            ? "On Going Call"
            : "Calling"}
        </span>
      </div>
      {(!callAccepted || data?.callType === "audio") && (
        <div className="my-24">
          <Image
            src={data?.profilePicture}
            alt=""
            height={300}
            width={300}
            className="rounded-full"
          />
        </div>
      )}
      <div className="h-16 w-16 bg-red-600 flex items-center justify-center rounded-full">
        <MdOutlineCallEnd
          className="text-3xl cursor-pointer"
          onClick={endCall}
        />
      </div>
    </div>
  );
}

export default Container;
