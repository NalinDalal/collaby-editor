"use client";

interface LanguageSelectorProps {
  language: string; // language is a string (e.g., 'javascript', 'python')
  setLanguage: (language: string) => void; // setLanguage is a function that takes a string and updates the language
}
export default function LanguageSelector({
  language,
  setLanguage,
}: LanguageSelectorProps) {
  const languages = ["javascript", "python", "cpp", "java", "rust"];
  return (
    <div>
      <select onChange={(e) => setLanguage(e.target.value)} value={language}>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
}
