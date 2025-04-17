"use client";
import { useState } from "react";
import CodeEditor from "./CodeEditor";
import LanguageSelector from "./LanguageSelector";
import FileTree from "./FileTree";
import RunButton from "./RunButton";

export default function EditorPage() {
  const [code, setCode] = useState("// write your code here");
  const [language, setLanguage] = useState("javascript");

  const runCode = async () => {
    const res = await fetch("/api/execute", {
      method: "POST",
      body: JSON.stringify({ code, language }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    alert(data.output || data.error);
  };

  return (
    <div className="flex h-screen">
      <FileTree />
      <div className="flex-1 p-4">
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <CodeEditor code={code} setCode={setCode} language={language} />
        <RunButton onRun={runCode} />
      </div>
    </div>
  );
}
