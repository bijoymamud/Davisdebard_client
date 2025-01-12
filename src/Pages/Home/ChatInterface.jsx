import { useState } from "react";
import {
  Mic,
  SendHorizontal,
} from "lucide-react";
// import Navbar from "../Shared/Navbar";

const ChatInterface = () => {
  // AI Bot Data
  const aiBots = [
    {
      name: "Google",
      img: "https://w7.pngwing.com/pngs/829/570/png-transparent-logo-google-g-logos-brands-in-colors-icon.png",
    },
    {
      name: "ChatGPT",
      img: "https://cdn-icons-png.flaticon.com/512/11865/11865326.png",
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
      img: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/copilot-icon.png",
    },
  ];

  
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

 
  const getBotResponse = (userMessage) => {
    return `Bot Response to: "${userMessage}"`;
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    const newMessages = [
      ...messages,
      { sender: "user", text: inputValue },
      { sender: "bot", text: getBotResponse(inputValue) },
    ];
    setMessages(newMessages);
    setInputValue("");
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-between bg-[#e1e4ed] md:h-screen">
        {/* Header Section */}
       
        {/* <Navbar/> */}
        {/* Main Content Section */}
        <div className="flex flex-col items-center w-full max-w-4xl mt-10">
          {/* AI Options */}
          <div className="flex flex-wrap justify-center gap-10 mb-10">
            {aiBots.map((bot, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 px-6 py-3 bg-white border-gray-300 rounded-full shadow-lg hover:shadow-xl transition cursor-pointer"
              >
                <span className="text-[16px] font-semibold">{bot.name}</span>
                <img
                  src={bot.img}
                  alt={bot.name}
                  className="w-6 h-6 rounded-full"
                />
              </div>
            ))}
          </div>

 <div className="text-[30px] font-medium mt-20">
    <h1>How can I help you to day </h1>
</div>

   {/* Chat Section */}
          <div className="w-full h-96 overflow-y-auto rounded-lg p-4 space-y-4">
  {messages.map((message, index) => (
    <div
      key={index}
      className={`flex items-start ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {message.sender === "bot" && (
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png" // Bot Avatar Image
          alt="Bot Avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
      )}
      <div
        className={`${
          message.sender === "user"
            ? "bg-[#431D5A] text-white"
            : "bg-gray-200 text-black"
        } max-w-xs p-4 rounded-lg shadow`}
      >
        {message.text}
      </div>
    </div>
  ))}
</div>


          {/* Chat Input */}
          <div className="w-full mb-10 flex items-center bg-[#9e58ca33] rounded-full shadow p-2">
            <input
              type="text"
              placeholder="Ask Your Question....."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-transparent outline-none px-4 text-black"
            />
            <div className="flex items-center gap-2">
              <button className="flex items-center justify-center w-10 h-10 text-purple-600">
                <Mic size={24} className="text-[#431D5A]" />
              </button>
              <div className="w-[2px] h-6 bg-gray-400"></div>
              <button
                onClick={sendMessage}
                className="flex items-center justify-center w-10 h-10 text-white rounded-full"
              >
                <SendHorizontal size={24} className="text-[#431D5A]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
