"use client";
import { useState } from "react";

interface FileTreeProps {
  files: string[] | undefined;
  onSelectFile: (file: string) => void;
  roomId: string; // Adding roomId prop
}

export default function FileTree({ files = [], onSelectFile }: FileTreeProps) {
  const [openFolders, setOpenFolders] = useState<{ [key: string]: boolean }>(
    {},
  );

  const toggleFolder = (folder: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folder]: !prev[folder],
    }));
  };
  if (!files || files.length === 0) {
    return <div>No files available</div>;
  }
  return (
    <div className="file-tree">
      {files.map((file, index) => {
        const isFolder = file.includes("/"); // Assuming folder names include slashes
        const folderName = isFolder ? file.split("/")[0] : null;
        const fileName = isFolder ? file.split("/")[1] : file;

        return (
          <div key={index}>
            {folderName && (
              <div className="folder">
                <button
                  onClick={() => toggleFolder(folderName)}
                  className="folder-toggle"
                >
                  {openFolders[folderName] ? "[-]" : "[+]"}
                </button>
                <span className="folder-name">{folderName}</span>
              </div>
            )}

            {folderName && openFolders[folderName] && !isFolder && (
              <div className="file" onClick={() => onSelectFile(file)}>
                {fileName}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
