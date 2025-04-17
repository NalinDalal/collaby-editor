"use client";
import { useParams } from "next/navigation";
import Whiteboard from "@/components/Whiteboard";
import { useEffect } from "react";
import { socket } from "@/lib/socket";

export default function WhiteboardPage() {
  const { roomId } = useParams();

  useEffect(() => {
    socket.emit("join", { roomId });
  }, [roomId]);

  return <Whiteboard roomId={roomId as string} />;
}
