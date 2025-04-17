"use client";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ language, code, setCode }) {
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
