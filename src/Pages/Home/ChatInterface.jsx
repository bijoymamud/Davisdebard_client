import React, { useState } from "react";
import { Mic, Send, ChevronDown } from 'lucide-react';

function ChatInterface() {
  const [message, setMessage] = useState("");
  
  const botItems = [
    {
      name: "Google",
      img: "https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png",
    },
    {
      name: "ChatGPT",
      img: "https://logohistory.net/wp-content/uploads/2023/05/ChatGPT-Logo.png",
    },
    {
      name: "Claude",
      img: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/claude-color.png",
    },
    {
      name: "Gemini",
      img: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png",
    },
    {
      name: "Copilot",
      img: "https://logos-world.net/wp-content/uploads/2023/10/Microsoft-Copilot-Logo.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <div className="w-full mx-auto px-4 py-6">
        {/* Header Section */}
        <div className=" rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className=""> {/* Spacer */}</div>
            
            {/* Bot Buttons */}
            <div className="flex gap-4 justify-center flex-wrap md:ms-48">
              {botItems.map((bot, index) => (
                <button
                  key={index}
                  className="w-40 flex items-center justify-between px-5 py-3 rounded-xl
                    bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 
                    hover:to-indigo-100 transition-all duration-300 border border-purple-100
                    shadow-sm hover:shadow group"
                >
                  <span className="font-medium text-gray-700 group-hover:text-purple-700">
                    {bot.name}
                  </span>
                  <img
                    src={bot.img}
                    alt={bot.name}
                    className="h-8 object-contain rounded-lg"
                  />
                </button>
              ))}
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-50 
              cursor-pointer transition-colors duration-200">
              <img
                src="https://www.shutterstock.com/image-photo/image-asian-boy-posing-on-600nw-2332205301.jpg"
                alt="User Avatar"
                className="h-12 w-12 rounded-xl object-cover shadow-sm"
              />
              <span className="font-medium text-gray-700">User Name</span>
              <ChevronDown size={20} className="text-gray-400" />
            </div>
          </div>
        </div>

  {/* Input Area */}
  <div className="relative ">
            <div className="relative bg-gradient-to-r from-purple-50 to-indigo-50 
              rounded-xl flex items-center p-4 shadow-sm border border-purple-100 max-w-7xl mx-auto">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask your question..."
                className="w-full bg-transparent outline-none text-gray-700 
                  placeholder-gray-400 px-2"
              />
              <div className="flex items-center gap-3">
                <button className="text-purple-500 hover:text-purple-700 
                  transition-colors duration-200">
                  <Mic size={22} />
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white 
                  p-2.5 rounded-lg transition-colors duration-200 flex items-center 
                  justify-center shadow-sm">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>

        {/* Chat Area */}
        <div className="bg-white  mb-6 max-w-7xl mx-auto  flex flex-col mt-20">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto mb-6 ">
            {/* Example message - you can map through actual messages here */}
            <div className="flex justify-end mb-4">
              <div className="bg-purple-600 text-white rounded-2xl rounded-tr-none 
                px-6 py-3 max-w-lg shadow-sm">
                Hello! How can I help you today?
              </div>
            </div>
            <div className="flex justify-start mb-4">
              <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none 
                px-6 py-3 max-w-lg shadow-sm">
                I have a question about AI...
              </div>
            </div>
          </div>

        
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;

