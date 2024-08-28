import { StateContext } from "../Main.jsx";
import { HOST } from "@/utils/ApiRoutes";
import { calculateTime } from "@/utils/CalculateTime";
import { useAuth } from "@clerk/nextjs";
import { useContext, useEffect, useRef, useState } from "react";
import { FaPlay, FaStop } from "react-icons/fa";
import WaveSurfer from "wavesurfer.js";
import Avatar from "../common/Avatar";
import MessageStatus from "../common/MessageStatus";

function VoiceMessage({ message }) {
  const { currentChatUser } = useContext(StateContext);
  const { userId } = useAuth();

  const [audiomessage, setaudiomessage] = useState(null);
  const [isplaying, setisplaying] = useState(false);
  const [currentplaybackTime, setcurrentplaybackTime] = useState(0);
  const [totlaDuration, settotlaDuration] = useState(0);

  const waveformref = useRef(null);

  const waveform = useRef(null);

  const handlePlayAudio = () => {
    if (audiomessage) {
      waveform.current.stop();
      waveform.current.play();
      audiomessage.play();
      setisplaying(true);
    }
  };
  const handlePauseAudio = () => {
    waveform.current.stop();
    audiomessage.pause();
    setisplaying(false);
  };
  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (audiomessage) {
      const updatePlaybackTime = () => {
        setcurrentplaybackTime(audiomessage.currentTime);
      };
      audiomessage.addEventListener("timeupdate", updatePlaybackTime);

      return () => {
        audiomessage.removeEventListener("timeupdate", updatePlaybackTime);
      };
    }
  }, [audiomessage]);

  useEffect(() => {
    const audiourl = `${HOST}/${message.messageContent}`;
    const audio = new Audio(audiourl);
    setaudiomessage(audio);
    waveform.current.load(audiourl);
    waveform.current.on("ready", () => {
      settotlaDuration(waveform.current.getDuration());
    });
  }, [message.messageContent]);

  useEffect(() => {
    if (waveform.current === null) {
      waveform.current = WaveSurfer.create({
        container: waveformref.current,
        waveColour: "#ccc",
        progressColor: "#4a9eff",
        cursorColor: "#7ae3c3",
        barWidth: 2,
        height: 30,
        responsive: true,
      });
      waveform.current.on("finish", () => {
        setisplaying(false);
      });
    }
    return () => {
      waveform.current.destroy();
    };
  }, []);

  return (
    <div
      className={` flex items-center gap-5 text-white px-4 pr-2 text-sm rounded-md ${
        message.senderId == currentChatUser?.user_id
          ? "bg-incoming-background"
          : "bg-outgoing-background"
      }`}
    >
      <div>
        <Avatar type="lg" image={currentChatUser?.profilePicture} />
      </div>
      <div className="cursor-pointer text-xl">
        {!isplaying ? (
          <FaPlay onClick={handlePlayAudio} />
        ) : (
          <FaStop onClick={handlePauseAudio} />
        )}
      </div>
      <div className="relative">
        <div className="w-60" ref={waveformref} />
        <div className="text-bubble-meta text-[11px] pt-1 justify-between absolute b-[-22px] w-full">
          <span>
            {formatTime(isplaying ? currentplaybackTime : totlaDuration)}
          </span>
          <div className="flex gap-1">
            <span> {calculateTime(message.createdAt)}</span>
            {message.senderId === userId && (
              <MessageStatus messageStatus={message?.messageStatus} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceMessage;
