import { StateContext } from "@/app/page";
import { useAuth, useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";

const Container = dynamic(() => import("./Container.jsx"));

function VoiceCall() {
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

  const { userId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (SET_VOICE_CALL.type === "out-going") {
      socket.current.emit("outgoing-voice-call", {
        to: SET_VOICE_CALL.user_id,
        from: {
          id: userId,
          profilePicture: "/default_avatar.png",
          name: user.firstName,
        },
        callType: SET_VOICE_CALL.callType,
        roomId: SET_VOICE_CALL.roomId,
      });
    }
  }, [SET_VOICE_CALL]);

  return <Container data={SET_VOICE_CALL} />;
}

export default VoiceCall;
