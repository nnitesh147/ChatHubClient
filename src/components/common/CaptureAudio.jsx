import { StateContext } from "@/app/page";
import { useAuth } from "@clerk/nextjs";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FaMicrophone,
  FaPauseCircle,
  FaPlay,
  FaStop,
  FaTrash,
} from "react-icons/fa";
import { MdSend } from "react-icons/md";
import WaveSurfer from "wavesurfer.js";

function CaptureAudio({ onChange }) {
  const { currentChatUser, socket } = useContext(StateContext);

  const { userId } = useAuth();

  const [isrecording, setrecording] = useState(false);
  const [recordedAudio, setrecordedAudio] = useState(null);
  const [waveform, setwaveform] = useState(null);
  const [recordingduration, setrecordingduration] = useState(0);
  const [currentplaybackTime, setcurrentplaybackTime] = useState(0);
  const [totlaDuration, settotlaDuration] = useState(0);
  const [isPlaying, setisPlaying] = useState(0);

  const [renderAudio, setrenderAudio] = useState(null);

  const audioRef = useRef(null);
  const mediarecorderRef = useRef(null);
  const waveformref = useRef(null);

  const handlePlayRecording = () => {
    if (recordedAudio) {
      waveform.stop();
      waveform.play();
      recordedAudio.play();
      setisPlaying(true);
    }
  };
  const handlePauseRecording = () => {
    waveform.stop();
    recordedAudio.pause();
    setisPlaying(false);
  };

  const sendRecording = async () => {
    // render Audio will contain file!!!
    onChange(false);
  };

  const handleStopRecording = () => {
    if (mediarecorderRef.current && isrecording) {
      mediarecorderRef.current.stop();
      setrecording(false);
      waveform.stop();

      const audioChunks = [];
      mediarecorderRef.current.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });
      mediarecorderRef.current.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: "audia/mp3" });
        const audioFile = new File([audioBlob], "recording.mp3");
        setrenderAudio(audioFile);
      });
    }
  };

  const handleStartRecording = () => {
    setrecordingduration(0);
    setcurrentplaybackTime(0);
    settotlaDuration(0);
    setrecording(true);
    setrecordedAudio(null);
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediarecorderRef.current = mediaRecorder;
        audioRef.current.srcObject = stream;

        const chunks = [];
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "audia/ogg; codecs=opus" });
          const audioUrl = URL.createObjectURL(blob);
          const audio = new Audio(audioUrl);

          setrecordedAudio(audio);
          waveform.load(audioUrl);
        };

        mediaRecorder.start();
      })
      .catch((error) => console.log("error while recording"));
  };

  useEffect(() => {
    let interval;
    if (isrecording) {
      interval = setInterval(() => {
        setrecordingduration((prevDuration) => {
          settotlaDuration(prevDuration + 1);
          return prevDuration + 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isrecording]);

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveformref.current,
      waveColour: "#ccc",
      progressColor: "#4a9eff",
      cursorColor: "#7ae3c3",
      barWidth: 2,
      height: 30,
      responsive: true,
    });
    setwaveform(wavesurfer);
    wavesurfer.on("finish", () => {
      setisPlaying(false);
    });

    return () => {
      wavesurfer.destroy();
    };
  }, []);

  useEffect(() => {
    if (waveform) {
      handleStartRecording();
    }
  }, []);

  useEffect(() => {
    if (recordedAudio) {
      const updatePlaybackTime = () => {
        setcurrentplaybackTime(recordedAudio.currentTime);
      };
      recordedAudio.addEventListener("timeupdate", updatePlaybackTime);

      return () => {
        recordedAudio.removeEventListener("timeupdate", updatePlaybackTime);
      };
    }
  }, [recordedAudio]);

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex text-2xl w-full justify-end items-center">
      <div className="pt-1">
        <FaTrash
          className="text-panel-header-icon"
          onClick={() => onChange(false)}
        />
      </div>
      <div className="mx-4 py-2 px-4 text-white text-lg flex gap-3 justify-center items-center bg-search-input-container-background rounded-full drop-shadow-lg">
        {isrecording ? (
          <div className="text-red-500 animate-pulse w-60 text-center">
            Recording <span>{recordingduration}s</span>
          </div>
        ) : (
          <div>
            {recordedAudio && (
              <>
                {!isPlaying ? (
                  <FaPlay onClick={handlePlayRecording} />
                ) : (
                  <FaStop onClick={handlePauseRecording} />
                )}
              </>
            )}
          </div>
        )}
        <div className="w-60" ref={waveformref} hidden={isrecording} />
        {recordedAudio && isPlaying && (
          <span>{formatTime(currentplaybackTime)}</span>
        )}
        {recordedAudio && !isPlaying && (
          <span>{formatTime(totlaDuration)}</span>
        )}
        <audio ref={audioRef} hidden />
      </div>
      <div className="mr-4">
        {!isrecording ? (
          <FaMicrophone
            className="text-red-500"
            onClick={handleStartRecording}
          />
        ) : (
          <FaPauseCircle
            className="text-red-500"
            onClick={handleStopRecording}
          />
        )}
      </div>
      <div>
        <MdSend
          className="text-panel-header-icon cursor-pointer mr-4"
          title="send"
          onClick={sendRecording}
        />
      </div>
    </div>
  );
}

export default CaptureAudio;
