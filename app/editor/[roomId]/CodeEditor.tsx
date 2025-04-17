"use client";
import Editor from "@monaco-editor/react";
interface CodeEditorProps {
  language: string; // Language should be a string (e.g., 'javascript', 'typescript')
  code: string; // Code should be a string
  setCode: (code: string) => void; // setCode is a function that takes a string and returns void
}
export default function CodeEditor({
  language,
  code,
  setCode,
}: CodeEditorProps) {
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
