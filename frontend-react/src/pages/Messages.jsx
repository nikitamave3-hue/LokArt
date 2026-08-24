import { useState, useEffect } from "react";
import "../styles/messages.css";

import { getMessages, saveMessages } from "../utils/storage";
import useSyncStorage from "../hooks/useSyncStorage";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const load = () => {
    setMessages(getMessages());
  };

  useEffect(() => {
    load();
  }, []);

  useSyncStorage(load);

  const sendMessage = () => {
    if (!text.trim()) return;

    const newMsg = {
      id: Date.now(),
      text,
      sender: "You",
    };

    const updated = [...messages, newMsg];

    setMessages(updated);
    saveMessages(updated);

    setText("");
  };

  return (
    <div className="chat-container">
      <div className="chat-box">

        <h2>💬 LokArt Chat</h2>

        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className="msg right">
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type message..."
          />

          <button onClick={sendMessage}>
            Send
          </button>
        </div>

      </div>
    </div>
  );
}