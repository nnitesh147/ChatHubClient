import { StateContext } from "../Main.jsx";
import Image from "next/image";
import { useContext } from "react";

function IncomingCall() {
  const {
    SET_INCOMING_VIDEO_CALL,
    setSET_INCOMING_VOICE_CALL,
    currentChatUser,
    SET_VIDEO_CALL,
    setSET_VIDEO_CALL,
    SET_VOICE_CALL,
    setSET_VOICE_CALL,
    socket,
    setSET_INCOMING_VIDEO_CALL,
    SET_INCOMING_VOICE_CALL,
  } = useContext(StateContext);

  const acceptCall = () => {
    setSET_VOICE_CALL({
      ...SET_INCOMING_VOICE_CALL,
      type: "in-coming",
    });
    socket.current.emit("accept-incoming-call", {
      id: SET_INCOMING_VOICE_CALL.id,
    });

    setSET_INCOMING_VOICE_CALL(undefined);
  };
  const rejectCall = () => {
    socket.current.emit("reject-voice-call", {
      from: SET_INCOMING_VOICE_CALL.id,
    });
    setSET_INCOMING_VIDEO_CALL(undefined);
    setSET_INCOMING_VOICE_CALL(undefined);
    setSET_VIDEO_CALL(undefined);
    setSET_VOICE_CALL(undefined);
  };

  return (
    <div className="h-24 w-80 fixed bottom-0 mb-0 right-6 z-50 rounded-sm flex gap-5 items-center justify-start p-4 bg-conversation-panel-background text-white drop-shadow-2xl border-icon-green border-2 py-4">
      <div>
        <Image
          src={SET_INCOMING_VOICE_CALL?.profilePicture}
          alt=""
          height={70}
          width={70}
          className="rounded-full"
        />
      </div>
      <div>
        <div>{SET_INCOMING_VOICE_CALL?.name}</div>
        <div className="text-xs">Incoming Voice Call</div>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-red-500 p-1 px-3 text-sm rounded-full"
            onClick={rejectCall}
          >
            Reject
          </button>
          <button
            onClick={acceptCall}
            className="bg-green-500 p-1 px-3 text-sm rounded-full"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default IncomingCall;
