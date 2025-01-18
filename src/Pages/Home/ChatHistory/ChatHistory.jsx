import React, { useEffect, useState } from "react";

function ChatHistory() {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatHistory");
    if (storedMessages) {
      setChatHistory(JSON.parse(storedMessages));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#e1e4ed]">
      <div className="w-full mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Chat History</h1>
        <div className="space-y-4">
          {chatHistory.length > 0 ? (
            chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start ${
                  msg.type === "user" ? "justify-end" : ""
                }`}
              >
                {msg.type === "bot" && (
                  <img
                    src={msg.img}
                    alt="Bot Avatar"
                    className="h-10 w-10 rounded-full object-cover mr-4"
                  />
                )}
                <div
                  className={`px-4 py-2 rounded-lg shadow-sm ${
                    msg.type === "user"
                      ? "bg-indigo-100 text-right"
                      : "bg-gray-100 text-left"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No chat history available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatHistory;
