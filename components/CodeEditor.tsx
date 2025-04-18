"use client";
import { useEffect } from "react";
import Editor from "@monaco-editor/react";
interface CodeEditorProps {
  roomId: string;
  language: string;
  code: string;
  setCode: (val: string) => void;
}
export default function CodeEditor({
  roomId,
  language,
  code,
  setCode,
}: CodeEditorProps) {
  useEffect(() => {
    console.log("Joined room:", roomId);
  }, [roomId]);
  return (
    <Editor
      height="500px"
      language={language}
      value={code}
      theme="vs-dark"
      onChange={(value) => setCode(value || "")}
    />
  );
}
