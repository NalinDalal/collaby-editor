"use client";
import { useEffect, useRef, useState } from "react";
import { socket } from "@/lib/socket";

export default function Whiteboard({ roomId }: { roomId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000");
  const [size, setSize] = useState(4);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawLine = (
      x0: number,
      y0: number,
      x1: number,
      y1: number,
      color: string,
      size: number,
    ) => {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.stroke();
      ctx.closePath();
    };

    socket.on("draw", (data) => {
      drawLine(data.x0, data.y0, data.x1, data.y1, data.color, data.size);
    });

    socket.on("clear", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    return () => {
      socket.off("draw");
      socket.off("clear");
    };
  }, []); // <-- Change here: removed unnecessary dependencies

  const getCoords = (e: MouseEvent | TouchEvent) => {
    if ("touches" in e) {
      const touch = e.touches[0];
      return { x: touch.clientX, y: touch.clientY };
    }
    return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    //const ctx = canvas.getContext("2d")!;
    let last = { x: 0, y: 0 };

    const start = (e: MouseEvent | TouchEvent) => {
      const { x, y } = getCoords(e);
      last = { x, y };
      setDrawing(true);
    };

    const move = (e: MouseEvent | TouchEvent) => {
      if (!drawing) return;
      const { x, y } = getCoords(e);
      socket.emit("draw", {
        roomId,
        x0: last.x,
        y0: last.y,
        x1: x,
        y1: y,
        color,
        size,
      });
      last = { x, y };
    };

    const end = () => setDrawing(false);

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    canvas.addEventListener("mouseup", end);
    canvas.addEventListener("mouseout", end);

    canvas.addEventListener("touchstart", start);
    canvas.addEventListener("touchmove", move);
    canvas.addEventListener("touchend", end);

    return () => {
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mousemove", move);
      canvas.removeEventListener("mouseup", end);
      canvas.removeEventListener("mouseout", end);

      canvas.removeEventListener("touchstart", start);
      canvas.removeEventListener("touchmove", move);
      canvas.removeEventListener("touchend", end);
    };
  }, [drawing, color, size, roomId]);

  return (
    <div>
      <canvas ref={canvasRef} className="absolute top-0 left-0 z-0" />
      <div className="flex fixed top-4 left-4 z-10 gap-2 items-center p-2 rounded bg-white/80">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type="range"
          min="1"
          max="10"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />
        <button
          onClick={() => socket.emit("clear", { roomId })}
          className="py-1 px-2 text-white bg-red-500 rounded"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
