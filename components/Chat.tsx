"use client";
import { useState, useEffect } from "react";

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
}

export default function Chat({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Simulating fetching room's chat history (you'd replace this with a proper API call)
    setMessages([
      { sender: "John", message: "Hello, everyone!", timestamp: "10:00 AM" },
      { sender: "Alice", message: "Hi, John!", timestamp: "10:01 AM" },
    ]);

    // Setting a temporary username for the chat (this can be fetched from user auth)
    setUserName("User1");
  }, [roomId]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage: ChatMessage = {
      sender: userName,
      message: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    // Add message to chat history (this could be an API call in a real app)
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage(""); // Clear input
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.sender}:</strong> {msg.message}{" "}
            <span>{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}
