"use client";

interface RunButtonProps {
  onRun: () => void; // onRun is a function that takes no arguments and returns void
}
export default function RunButton({ onRun }: RunButtonProps) {
  return (
    <button
      onClick={onRun}
      className="py-2 px-4 text-white bg-green-600 rounded"
    >
      ▶ Run
    </button>
  );
}
