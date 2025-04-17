"use client";
import { useParams } from "next/navigation";
import CodeEditor from "@/components/CodeEditor";
import Chat from "@/components/Chat";
import Whiteboard from "@/components/Whiteboard";
import LanguageSelector from "@/components/LanguageSelector";
import FileTree from "@/components/FileTree";
import { useState, useEffect } from "react";
import { socket } from "@/lib/socket";
import VideoChat from "@/components/VideoChat";
export default function RoomPage() {
  const { roomId } = useParams();
  const [activeTab, setActiveTab] = useState<"editor" | "whiteboard">("editor");

  useEffect(() => {
    socket.emit("join", { roomId });
  }, [roomId]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex overflow-hidden flex-1">
        <div className="p-2 w-1/5 border-r">
          <FileTree roomId={roomId as string} />
          <LanguageSelector roomId={roomId as string} />
          <button onClick={() => setActiveTab("editor")}>Editor</button>
          <button onClick={() => setActiveTab("whiteboard")}>Whiteboard</button>
        </div>
        <div className="relative flex-1">
          {activeTab === "editor" ? (
            <CodeEditor roomId={roomId as string} />
          ) : (
            <Whiteboard roomId={roomId as string} />
          )}
        </div>
      </div>
      <div className="h-1/4 border-t">
        <Chat roomId={roomId as string} />
        <VideoChat roomId={roomId as string} />
      </div>
    </div>
  );
}
