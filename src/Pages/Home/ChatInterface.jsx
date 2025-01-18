
// import React, { useState } from "react";
// import axios from "axios";
// import { Mic, Send, ChevronDown, Plus, Menu, CircleHelp } from "lucide-react";
// import { RiChatHistoryLine } from "react-icons/ri";
// import { MdLogout, MdOutlineQuestionAnswer } from "react-icons/md";
// import { AiFillThunderbolt } from "react-icons/ai";
// import { FaRegUser } from "react-icons/fa";
// import { IoInvertMode } from "react-icons/io5";

// function ChatInterface() {
//   const [message, setMessage] = useState("");
//   const [lastMessage, setLastMessage] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);
//   const [selectedBot, setSelectedBot] = useState(null);

//   const botItems = [
//     {
//       name: "Google",
//       img: "https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png",
//     },
//     {
//       name: "ChatGPT",
//       img: "https://logohistory.net/wp-content/uploads/2023/05/ChatGPT-Logo.png",
//     },
//     {
//       name: "Claude",
//       img: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/claude-color.png",
//     },
//     {
//       name: "Gemini",
//       img: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png",
//     },
//     {
//       name: "Copilot",
//       img: "https://logos-world.net/wp-content/uploads/2023/10/Microsoft-Copilot-Logo.png",
//     },
//   ];

//   const handleBotResponse = async (bot, userMessage) => {
//     try {
//       const response = await axios.post(
//         "https://complete-buffalo-witty.ngrok-free.app/process-with-llm",
//         {
//           botName: bot.name, // Include the bot's name in the payload if needed
//           message: userMessage,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
         
//           },
//         }
//       );

//       const botReply =
//         response.data.reply ||
//         "I couldn't process that."; // Fallback in case response data is undefined

//       setChatMessages((prev) => [
//         ...prev,
//         {
//           type: "bot",
//           text: botReply,
//           img: bot.img,
//         },
//       ]);
//     } catch (error) {
//       console.error("Error fetching bot response:", error);
//       setChatMessages((prev) => [
//         ...prev,
//         {
//           type: "bot",
//           text: "An error occurred while contacting the bot. Please try again.",
//           img: bot.img,
//         },
//       ]);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!message.trim()) {
//       alert("Message cannot be empty.");
//       return;
//     }

//     if (!selectedBot) {
//       alert("Please select a bot first.");
//       return;
//     }

//     setChatMessages((prev) => [
//       ...prev,
//       { type: "user", text: message },
//     ]);

//     setLastMessage(message);
//     setMessage("");

//     handleBotResponse(selectedBot, message);
//   };

//   const handleBotSelection = (bot) => {
//     if (selectedBot?.name === bot.name) {
//       setSelectedBot(null); // Deselect if the same bot is clicked  
//       setLastMessage('')
// setMessage('')
//     } else {
//       setSelectedBot(bot); // Select the new bot

//       if (lastMessage) {
//         handleBotResponse(bot, lastMessage); // Respond to the last message if available
//       }
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br">
//       <div className="w-full mx-auto px-4 py-6">
//         {/* Navbar */}
//         <div className="rounded-2xl p-6 mb-6 flex justify-between items-center bg-white ">
//           <div className="bg-[#431D5A] rounded-lg flex items-center text-xl">
//             <button className="w-[120px] py-3 text-white px-2">New Chat</button>
//             <Plus size={32} className="text-white pr-2" />
//           </div>

//           <div className="flex gap-4 justify-center flex-wrap">
//             {botItems.map((bot, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleBotSelection(bot)}
//                 className={`w-40 flex items-center justify-between px-5 py-3 rounded-full
//                   ${selectedBot?.name === bot.name
//                     ? "bg-purple-100"
//                     : "bg-gradient-to-r from-purple-50 to-indigo-50"
//                   }
//                   hover:from-purple-100 hover:to-indigo-100 transition-all duration-300
//                   border border-purple-100 shadow-sm hover:shadow group`}
//               >
//                 <span className="font-semibold text-lg text-gray-700 group-hover:text-[#431D5A]">
//                   {bot.name}
//                 </span>
//                 <img
//                   src={bot.img}
//                   alt={bot.name}
//                   className="h-8 object-contain rounded-lg"
//                 />
//               </button>
//             ))}
//           </div>

//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} role="button" className="btn m-1"><Menu /></div>
//             <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[300px] p-2 shadow">
//               <li>
//                 <a className="flex items-center gap-2 "><RiChatHistoryLine className="text-xl" /><span className="text-lg font-semibold">Chat History</span></a>
//               </li>
//               <li><a><CircleHelp size={20} /><span className="text-lg font-semibold">Support</span></a></li>
//               <li><a><MdOutlineQuestionAnswer className="text-xl" /><span className="text-lg font-semibold">FAQ</span></a></li>
//               <li><a><AiFillThunderbolt className="text-xl" /><span className="text-lg font-semibold">Manage Subscription</span></a></li>
//               <li><a><FaRegUser className="text-xl" /><span className="text-lg font-semibold">Profile</span></a></li>
//               <li><a><IoInvertMode className="text-xl" /><span className="text-lg font-semibold">Light Mode</span></a></li>
//               <li><a><MdLogout className="text-xl" /><span className="text-lg font-semibold">Log out</span></a></li>
//             </ul>
//           </div>
//         </div>

//         <div className="relative md:ms-20">
//           <div className="relative bg-[#7B549333] rounded-xl flex items-center p-3 shadow-sm border border-purple-100 max-w-4xl mx-auto">
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Type your message..."
//               className="w-full bg-transparent outline-none text-[#431D5A] font-medium placeholder-gray-400 px-2"
//             />
//             <div className="flex items-center space-x-8">
//               <button className="text-[#431D5A] transition-colors duration-200"><Mic size={24} /></button>
//               <button
//                 onClick={handleSendMessage}
//                 className="bg-[#431D5A] hover:bg-black/80 text-white p-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-sm"
//               >
//                 <Send size={20} />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white mb-6 max-w-7xl mx-auto flex flex-col mt-20 space-y-4 p-4">
//           {chatMessages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex items-start ${msg.type === "user" ? "justify-end" : ""}`}
//             >
//               {msg.type === "bot" && (
//                 <img
//                   src={msg.img}
//                   alt="Bot Avatar"
//                   className="h-10 w-10 rounded-full object-cover mr-4"
//                 />
//               )}
//               <div
//                 className={`px-4 py-2 rounded-lg shadow-sm ${
//                   msg.type === "user"
//                     ? "bg-indigo-100 text-right"
//                     : "bg-gray-100 text-left"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatInterface;




import React, { useState } from "react";
import axios from "axios";
import { Mic, Send, Plus, Menu, CircleHelp } from "lucide-react";
import { RiChatHistoryLine } from "react-icons/ri";
import { MdLogout, MdOutlineQuestionAnswer } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { IoInvertMode } from "react-icons/io5";

function ChatInterface() {
  const [message, setMessage] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);

  const botItems = [
    {
      name: "Google",
      img: "https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png",
      apiEndpoint: "https://complete-buffalo-witty.ngrok-free.app/process-with-llm",
    },
    {
      name: "ChatGPT",
      img: "https://logohistory.net/wp-content/uploads/2023/05/ChatGPT-Logo.png",
      apiEndpoint: "https://complete-buffalo-witty.ngrok-free.app/process-with-openai",
    },
    {
      name: "Claude",
      img: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/claude-color.png",
      apiEndpoint: "https://api.anthropic.com/claude/respond",
    },
    {
      name: "Gemini",
      img: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png",
      apiEndpoint: "https://api.google.com/gemini/respond",
    },
    {
      name: "Copilot",
      img: "https://logos-world.net/wp-content/uploads/2023/10/Microsoft-Copilot-Logo.png",
      apiEndpoint: "https://api.microsoft.com/copilot/respond",
    },
  ];

  const handleBotResponse = async (bot, userMessage) => {
    try {
      const response = await axios.post(
        bot.apiEndpoint,
        {
          input_text: userMessage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Log the full response for debugging
      console.log("Backend Response:", response.data);

      // Access the correct field based on the actual response structure
      const botReply =
        response.data.response || // Expected key
        response.data.message || // Alternative key
        response.data.data || // Fallback key
        "I couldn't process that."; // Default fallback

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
          text: `Error: Unable to fetch response from ${bot.name}.`,
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

    setChatMessages((prev) => [...prev, { type: "user", text: message }]);
    setLastMessage(message);
    setMessage("");

    await handleBotResponse(selectedBot, message);
  };

  const handleBotSelection = (bot) => {
    if (selectedBot?.name === bot.name) {
      setSelectedBot(null);
      setLastMessage("");
      setMessage("");
    } else {
      setSelectedBot(bot);

      if (lastMessage) {
        handleBotResponse(bot, lastMessage);
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
        {/* Navbar */}
        <div className="rounded-2xl p-6 mb-6 flex justify-between items-center bg-white">
          <div className="bg-[#431D5A] rounded-lg flex items-center text-xl">
            <button className="w-[120px] py-3 text-white px-2">New Chat</button>
            <Plus size={32} className="text-white pr-2" />
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            {botItems.map((bot, index) => (
              <button
                key={index}
                onClick={() => handleBotSelection(bot)}
                className={`w-40 flex items-center justify-between px-5 py-3 rounded-full ${
                  selectedBot?.name === bot.name
                    ? "bg-purple-100"
                    : "bg-gradient-to-r from-purple-50 to-indigo-50"
                } hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 border border-purple-100 shadow-sm hover:shadow group`}
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

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              <Menu />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[300px] p-2 shadow"
            >
              <li>
                <a className="flex items-center gap-2">
                  <RiChatHistoryLine className="text-xl" />
                  <span className="text-lg font-semibold">Chat History</span>
                </a>
              </li>
              <li>
                <a>
                  <CircleHelp size={20} />
                  <span className="text-lg font-semibold">Support</span>
                </a>
              </li>
              <li>
                <a>
                  <MdOutlineQuestionAnswer className="text-xl" />
                  <span className="text-lg font-semibold">FAQ</span>
                </a>
              </li>
              <li>
                <a>
                  <AiFillThunderbolt className="text-xl" />
                  <span className="text-lg font-semibold">Manage Subscription</span>
                </a>
              </li>
              <li>
                <a>
                  <FaRegUser className="text-xl" />
                  <span className="text-lg font-semibold">Profile</span>
                </a>
              </li>
              <li>
                <a>
                  <IoInvertMode className="text-xl" />
                  <span className="text-lg font-semibold">Light Mode</span>
                </a>
              </li>
              <li>
                <a>
                  <MdLogout className="text-xl" />
                  <span className="text-lg font-semibold">Log out</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative md:ms-20">
          <div className="relative bg-[#7B549333] rounded-xl flex items-center p-3 shadow-sm border border-purple-100 max-w-4xl mx-auto">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full bg-transparent outline-none text-[#431D5A] font-medium placeholder-gray-400 px-2"
            />
            <div className="flex items-center space-x-8">
              <button className="text-[#431D5A] transition-colors duration-200">
                <Mic size={24} />
              </button>
              <button
                onClick={handleSendMessage}
                className="bg-[#431D5A] hover:bg-black/80 text-white p-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-sm"
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;


