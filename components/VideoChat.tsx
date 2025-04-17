"use client";
import { useWebRTC } from "@/hooks/useWebRTC";
import { useState } from "react";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import { MonitorUp } from "lucide-react";
import { CircleDot, Square } from "lucide-react";
export default function VideoChat({ roomId }: { roomId: string }) {
  const { localVideoRef, toggleAudio, toggleVideo } = useWebRTC(roomId);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const { toggleScreenShare } = useWebRTC(roomId);
  const handleToggleAudio = () => {
    toggleAudio();
    setAudioEnabled((prev) => !prev);
  };
  const [recording, setRecording] = useState(false);
  const { startRecording, stopRecording } = useWebRTC(roomId);

  const handleRecord = () => {
    if (recording) {
      stopRecording();
      setRecording(false);
    } else {
      startRecording();
      setRecording(true);
    }
  };
  const handleToggleVideo = () => {
    toggleVideo();
    setVideoEnabled((prev) => !prev);
  };

  return (
    <div className="flex fixed right-4 bottom-4 z-50 flex-col items-center p-2 rounded-xl shadow-lg bg-white/90">
      <video
        ref={localVideoRef}
        autoPlay
        muted
        playsInline
        className="w-32 h-24 rounded-md border"
      />
      <div id="remote-videos" className="flex gap-2 mt-2" />
      <div className="flex gap-3 mt-2">
        <button onClick={handleToggleAudio} title="Toggle Microphone">
          {audioEnabled ? (
            <Mic className="text-green-500" />
          ) : (
            <MicOff className="text-red-500" />
          )}
        </button>
        <button onClick={handleToggleVideo} title="Toggle Camera">
          {videoEnabled ? (
            <Video className="text-green-500" />
          ) : (
            <VideoOff className="text-red-500" />
          )}
        </button>
        <button onClick={toggleScreenShare} title="Share Screen">
          <MonitorUp />
        </button>

        <button onClick={handleRecord} title="Record Session">
          {recording ? (
            <Square className="text-red-600" />
          ) : (
            <CircleDot className="text-gray-800" />
          )}
        </button>
      </div>
    </div>
  );
}
