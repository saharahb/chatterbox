import React, { useState } from "react";
import axios from "axios";

function Chatterbox() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (messageText) => {
    // Add user's message to the conversation
    setMessages([...messages, { text: messageText, sender: "user" }]);

    // Call backend API to get AI response
    try {
      const response = await axios.post("http://localhost:3001/chat", {
        message: messageText,
      });
      const aiResponse = response.data.message;

      // Add AI's response to the conversation
      setMessages([...messages, { text: aiResponse, sender: "ai" }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="Chatterbox">
      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === "user" ? "user" : "ai"}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage(e.target.value);
                e.target.value = "";
              }
            }}
          />
          <button
            onClick={() => sendMessage(document.querySelector("input").value)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatterbox;
