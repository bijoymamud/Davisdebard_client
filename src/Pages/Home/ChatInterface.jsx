

// here user can generate the ans from several botItems.. when user disselect the botItems user cant able to genereate the response again... if he type something new on the input field and select another botItem the user will be able to genereate  the response.. he can also generate the ans from multiple botItems.. after disselect the botItems he will not be able to genereate response again...



import React, { useState } from "react";
import axios from "axios";
import { Mic, Send, ChevronDown } from "lucide-react";

function ChatInterface() {
  const [message, setMessage] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);

  const botItems = [
    {
      name: "Google",
      img: "https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png",
      api: "https://api.googlechatbot.com/sendMessage",
    },
    {
      name: "ChatGPT",
      img: "https://logohistory.net/wp-content/uploads/2023/05/ChatGPT-Logo.png",
      api: "https://api.openai.com/v1/chat/completions",
    },
    {
      name: "Claude",
      img: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/claude-color.png",
      api: "https://api.anthropic.com/v1/completions",
    },
    {
      name: "Gemini",
      img: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png",
      api: "https://api.geminiassistant.com/respond",
    },
    {
      name: "Copilot",
      img: "https://logos-world.net/wp-content/uploads/2023/10/Microsoft-Copilot-Logo.png",
      api: "https://api.microsoftcopilot.com/chat",
    },
  ];

  const handleBotResponse = async (bot, userMessage) => {
    try {
      const response = await axios.post(
        bot.api,
        {
          prompt: userMessage,
          model: "gpt-3.5-turbo",
          max_tokens: 100,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_API_KEY`,
          }
        }
      );

      const botReply =
        response.data.reply ||
        response.data.choices?.[0]?.message?.content ||
        "I couldn't process that.";

      setChatMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: botReply,
          img: bot.img,
        },
      ]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "An error occurred while contacting the bot. Please try again.",
          img: bot.img,
        },
      ]);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      alert("Message cannot be empty.");
      return;
    }

    if (!selectedBot) {
      alert("Please select a bot first.");
      return;
    }

    setChatMessages((prev) => [
      ...prev,
      { type: "user", text: message },
    ]);

    setLastMessage(message);
    setMessage("");

    handleBotResponse(selectedBot, message);
  };

  const handleBotSelection = (bot) => {
    if (selectedBot?.name === bot.name) {
      setSelectedBot(null); // Deselect if the same bot is clicked
    } else {
      setSelectedBot(bot); // Select the new bot

      if (lastMessage) {
        handleBotResponse(bot, lastMessage); // Respond to the last message if available
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="w-full mx-auto px-4 py-6">
        <div className="rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className=""></div>

            <div className="flex gap-4 justify-center flex-wrap md:ms-48">
              {botItems.map((bot, index) => (
                <button
                  key={index}
                  onClick={() => handleBotSelection(bot)}
                  className={`w-40 flex items-center justify-between px-5 py-3 rounded-full
                    ${selectedBot?.name === bot.name
                      ? "bg-purple-100"
                      : "bg-gradient-to-r from-purple-50 to-indigo-50"
                    }
                    hover:from-purple-100 hover:to-indigo-100 transition-all duration-300
                    border border-purple-100 shadow-sm hover:shadow group`}
                >
                  <span className="font-semibold text-lg text-gray-700 group-hover:text-[#431D5A]">
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

            <div className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-50
              cursor-pointer transition-colors duration-200">
              <img
                src="https://www.shutterstock.com/image-photo/image-asian-boy-posing-on-600nw-2332205301.jpg"
                alt="User Avatar"
                className="h-12 w-12 rounded-full object-cover shadow-sm"
              />
              <span className="font-medium text-gray-700">Al Mamud Bijoy</span>
              <ChevronDown size={20} className="text-gray-400" />
            </div>
          </div>
        </div>

        <div className="relative md:me-16">
          <div className="relative bg-[#7B549333]
              rounded-xl flex items-center p-3 shadow-sm border border-purple-100 max-w-4xl mx-auto">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full bg-transparent outline-none text-[#431D5A] font-medium
                  placeholder-gray-400 px-2"
            />
            <div className="flex items-center space-x-8">
              <button className="text-[#431D5A] transition-colors duration-200">
                <Mic size={24} />
              </button>
              <button
                onClick={handleSendMessage}
                className="bg-[#431D5A] hover:bg-black/80 text-white
                  p-2.5 rounded-lg transition-colors duration-200 flex items-center
                  justify-center shadow-sm"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white mb-6 max-w-7xl mx-auto flex flex-col mt-20 space-y-4 p-4">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start ${msg.type === "user" ? "justify-end" : ""}`}
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;







