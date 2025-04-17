"use client";
import { useState } from "react";

interface LanguageSelectorProps {
  language: string;
  setLanguage: (language: string) => void;
}

export default function LanguageSelector({ language, setLanguage }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { name: "JavaScript", value: "javascript" },
    { name: "Python", value: "python" },
    { name: "C++", value: "cpp" },
    { name: "Java", value: "java" },
    { name: "Go", value: "go" },
    { name: "Ruby", value: "ruby" },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="language-selector">
      <button onClick={toggleDropdown} className="language-btn">
        {language || "Select Language"}
      </button>
      {isOpen && (
        <ul className="language-dropdown">
          {languages.map((lang) => (
            <li
              key={lang.value}
              onClick={() => {
                setLanguage(lang.value);
                setIsOpen(false);
              }}
              className="language-option"
            >
              {lang.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

