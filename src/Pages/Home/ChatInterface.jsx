// import React, { useState } from "react";
// import axios from "axios";
// import { Mic, Send, Plus, Menu, CircleHelp } from "lucide-react";
// import { RiChatHistoryLine } from "react-icons/ri";
// import { MdLogout, MdOutlineQuestionAnswer } from "react-icons/md";
// import { AiFillThunderbolt } from "react-icons/ai";
// import { FaRegUser } from "react-icons/fa";
// import { IoInvertMode } from "react-icons/io5";
// import { Link } from "react-router-dom";

// function ChatInterface() {
//   const [message, setMessage] = useState("");
//   const [lastMessage, setLastMessage] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);
//   const [selectedBot, setSelectedBot] = useState(null);
//   const [loading, setLoading] = useState(false);


//   const botItems = [
  
//     {
//       name: "ChatGPT",
//       img: "https://logohistory.net/wp-content/uploads/2023/05/ChatGPT-Logo.png",
//       apiEndpoint: "https://complete-buffalo-witty.ngrok-free.app/process-with-openai",
//     },
//     {
//       name: "Claude",
//       img: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/claude-color.png",
//       apiEndpoint: "https://api.anthropic.com/claude/respond",
//     },
//     {
//       name: "Gemini",
//       img: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png",
//       apiEndpoint: "https://api.google.com/gemini/respond",
//     },
//     {
//       name: "Copilot",
//       img: "https://logos-world.net/wp-content/uploads/2023/10/Microsoft-Copilot-Logo.png",
//       apiEndpoint: "https://api.microsoft.com/copilot/respond",
//     },
//   ];

//   const handleBotResponse = async (bot, userMessage) => {
//     try {
//       const response = await axios.post(
//         bot.apiEndpoint,
//         {
//           input_text: userMessage,
//           // user information
//           // model
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Log the full response for debugging
//       console.log("Backend Response:", response.data);

//       // Access the correct field based on the actual response structure
//       const botReply =
//         response.data.response || // Expected key
//         response.data.message || // Alternative key
//         response.data.data || // Fallback key
//         "I couldn't process that."; // Default fallback

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
//           text: `Error: Unable to fetch response from ${bot.name}.`,
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

//     setChatMessages((prev) => [...prev, { type: "user", text: message }]);
//     setLastMessage(message);
//     setMessage("");

//     await handleBotResponse(selectedBot, message);
//   };

//   const handleBotSelection = (bot) => {
//     if (selectedBot?.name === bot.name) {
//       setSelectedBot(null);
//       setLastMessage("");
//       setMessage("");
//     } else {
//       setSelectedBot(bot);

//       if (lastMessage) {
//         handleBotResponse(bot, lastMessage);
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
//     <div className="min-h-screen bg-[#e1e4ed]">
//       <div className="w-full mx-auto px-4 py-6">
//         {/* Navbar */}
//         <div className="rounded-2xl p-6 mb-6 flex justify-between items-center ">
//           <div className="bg-[#431D5A] rounded-lg flex items-center text-xl">
//             <button className="w-[120px] py-3 text-white px-2">New Chat</button>
//             <Plus size={32} className="text-white pr-2" />
//           </div>

//           <div className="flex gap-4 justify-center flex-wrap">
//             {botItems.map((bot, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleBotSelection(bot)}
//                 className={`w-40 flex items-center justify-between px-5 py-3 rounded-full ${
//                   selectedBot?.name === bot.name
//                     ? "bg-purple-100"
//                     : "bg-gradient-to-r from-purple-50 to-indigo-50"
//                 } hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 border border-purple-100 shadow-sm hover:shadow group`}
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
//   <div tabIndex={0} role="button" className="btn m-1">
//     <Menu />
//   </div>
//   <ul
//     tabIndex={0}
//     className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[300px] p-2 shadow"
//   >
//     <li>
//       <a className="flex items-center gap-2">
//         <RiChatHistoryLine className="text-xl" />
//         <span className="text-lg font-semibold">Chat History</span>
//       </a>
//     </li>
//     <li>
//       <Link to="/Support">
//         <CircleHelp size={20} />
//         <span className="text-lg font-semibold">Support</span>
//       </Link>
//     </li>
//     <li>
//       <Link to='/faq'>
//         <MdOutlineQuestionAnswer className="text-xl" />
//         <span className="text-lg font-semibold">FAQ</span>
//       </Link>
//     </li>
//     <li>
//       <Link to='/manageSubcription'>
//         <AiFillThunderbolt className="text-xl" />
//         <span className="text-lg font-semibold">Manage Subscription</span>
//       </Link>
//     </li>
//     <li>
//       <Link to="/userProfile">
//         <FaRegUser className="text-xl" />
//         <span className="text-lg font-semibold">Profile</span>
//       </Link>
//     </li>
//     <li>
//       <a>
//         <IoInvertMode className="text-xl" />
//         <span className="text-lg font-semibold">Light Mode</span>
//       </a>
//     </li>
//     <li>
//       <button
//         onClick={() => document.getElementById("logout_modal").showModal()}
//         className="flex items-center gap-2"
//       >
//         <MdLogout className="text-xl" />
//         <span className="text-lg font-semibold">Log out</span>
//       </button>
//     </li>
//   </ul>
// </div>

// {/* Modal Component */}
// <dialog id="logout_modal" className="modal">
//   <div className="modal-box w-96">
//    <div className="text-center">
//    <h3 className="font-bold text-lg pb-5">Leave Use the Best AI?</h3>
//    </div>
//     <div className="flex items-center justify-center gap-5">
//       <form method="dialog">
//         {/* Close button for the modal */}
//         <button className=" px-5 font-semibold py-2 rounded-md text-[#431D5A] bg-[#CDC7DB] hover:bg-[#CDC7DB] ">Cancel</button>
//       </form>
//       <button
//         className="px-5 font-semibold py-2 rounded-md bg-[#431D5A] hover:bg-[#431D5A] text-white"
//         onClick={() => {
//           // Perform logout action here
//           console.log("User logged out");
//           window.location.href = "/login"; // Example: Redirect to login page
//         }}
//       >
//         Log Out
//       </button>
//     </div>
//   </div>
// </dialog>


// {/* Modal Component */}
// <dialog id="logout_modal" className="modal">
//   <div className="modal-box">
//     <h3 className="font-bold text-lg">Confirm Logout</h3>
//     <p className="py-4">Are you sure you want to log out?</p>
//     <div className="modal-action">
//       <form method="dialog">
//         {/* Close button for the modal */}
//         <button className="btn">Cancel</button>
//       </form>
//       <button
//         className="btn btn-primary"
//         onClick={() => {
//           // Perform logout action here (e.g., clear user session, redirect to login)
//           console.log("User logged out");
//           // Example: Redirect to login page
//           window.location.href = "/login";
//         }}
//       >
//         Log Out
//       </button>
//     </div>
//   </div>
// </dialog>

//         </div>

//         <div className="relative md:ms-[90px]">
//           <div className="relative bg-[#7B549333] rounded-xl flex items-center p-3 shadow-sm border border-purple-100 w-[685px] mx-auto">
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Type your message..."
//               className="w-full bg-transparent outline-none text-[#431D5A] font-medium placeholder-gray-400 px-2"
//             />
//             <div className="flex items-center space-x-8">
//               <button className="text-[#431D5A] transition-colors duration-200">
//                 <Mic size={24} />
//               </button>
//               <button
//                 onClick={handleSendMessage}
//                 className="bg-[#431D5A] hover:bg-black/80 text-white p-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-sm"
//               >
//                 <Send size={20} />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className=" mb-6 max-w-7xl mx-auto flex flex-col mt-20 space-y-4 p-4">
//         {chatMessages.map((msg, index) => (
//   <div
//     key={index}
//     className={`flex items-start ${
//       msg.type === "user" ? "justify-end" : ""
//     }`}
//   >
//     {msg.type === "bot" && (
//       <img
//         src={msg.img}
//         alt="Bot Avatar"
//         className="h-10 w-10 rounded-full object-cover mr-4"
//       />
//     )}

//     <div className="flex flex-col">
//       <div
//         className={`px-4 py-2 rounded-lg shadow-sm ${
//           msg.type === "user"
//             ? "bg-blue-500 text-right text-white"
//             : "bg-gray-100 text-left"
//         }`}
//         style={{ marginBottom: "8px" }} // Adjust spacing as needed
//       >
//         {msg.text}
//       </div>
//     </div>

//     {msg.type === "user" && (
//       <img
//         src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA4L21vdGFybzdfcGhvdG9fb2ZfaGFuZHNvbWVfc21pbGluZ195b3VuZ19tYW5faW5fYmx1ZV9zaGlydF9hbmRfZ19kOTM2ZTNiZS1iOGVhLTRkZjEtYTBiOS1hNWYzMjE5M2Y0ZjAucG5n.png" // Replace with the user's avatar URL
//         alt="User Avatar"
//         className="h-10 w-10 rounded-full object-cover ml-4"
//       />
//     )}
//   </div>
// ))}
//  {isThinking && (
//               <div className="flex items-center space-x-2 justify-start">
//                 <Bot size={26} className="text-gray-200" />
//                 <span className="loading loading-dots loading-2xl"></span>
//               </div>
//             )}


//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatInterface;


// // // ----------------------perfect code without history---------------------













import React, { useState } from "react";
import axios from "axios";
import { Mic, Send, Plus, Menu, CircleHelp } from "lucide-react";
import { RiChatHistoryLine } from "react-icons/ri";
import { MdLogout, MdOutlineQuestionAnswer } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { IoInvertMode } from "react-icons/io5";
import { Link } from "react-router-dom";

function ChatInterface() {
  const [message, setMessage] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const botItems = [
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
    setIsThinking(true);
    try {
      const response = await axios.post(
        bot.apiEndpoint,
        {
          input_text: userMessage,
          // userINfo
          // chatModel
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Backend Response:", response.data);

      const botReply =
        response.data.response ||
        response.data.message ||
        response.data.data ||
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
          text: `Error: Unable to fetch response from ${bot.name}.`,
          img: bot.img,
        },
      ]);
    } finally {
      setIsThinking(false);
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
    <div className="min-h-screen bg-[#e1e4ed]">
      <div className="w-full mx-auto px-4 py-6">
        <div className="rounded-2xl p-6 mb-6 flex justify-between items-center">
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
                <Link to="/Support">
                  <CircleHelp size={20} />
                  <span className="text-lg font-semibold">Support</span>
                </Link>
              </li>
              <li>
                <Link to="/faq">
                  <MdOutlineQuestionAnswer className="text-xl" />
                  <span className="text-lg font-semibold">FAQ</span>
                </Link>
              </li>
              <li>
                <Link to="/manageSubcription">
                  <AiFillThunderbolt className="text-xl" />
                  <span className="text-lg font-semibold">Manage Subscription</span>
                </Link>
              </li>
              <li>
                <Link to="/userProfile">
                  <FaRegUser className="text-xl" />
                  <span className="text-lg font-semibold">Profile</span>
                </Link>
              </li>
              <li>
                <a>
                  <IoInvertMode className="text-xl" />
                  <span className="text-lg font-semibold">Light Mode</span>
                </a>
              </li>
              <li>
              <button
                onClick={() => document.getElementById("logout_modal").showModal()}
                className="flex items-center gap-2" >
                <MdLogout className="text-xl" />
              <span className="text-lg font-semibold">Log out</span>
             </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Component */}
 <dialog id="logout_modal" className="modal">
   <div className="modal-box">
     <p className="py-4">Leave Use the Best AI?</p>     
     <div className="flex items-center justify-center gap-5">
       <form method="dialog">         {/* Close button for the modal */}
         <button className="btn bg-[#CDC7DB] hover:bg-[#CDC7DB] text-[#431D5A]">Cancel</button>
      </form>
       <button
         className="btn bg-[#431D5A] hover:bg-[#431D5A] text-white"
         onClick={() => {
           // Perform logout action here (e.g., clear user session, redirect to login)
           console.log("User logged out");
           // Example: Redirect to login page
          window.location.href = "/login";
        }}
       >
        Log Out
       </button>
     </div>
   </div>
 </dialog>

        <div className="relative md:ms-[90px]">
          <div className="relative bg-[#7B549333] rounded-xl flex items-center p-3 shadow-sm border border-purple-100 w-[685px] mx-auto">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full bg-transparent outline-none text-[#431D5A] font-medium placeholder-gray-400 px-2"
            />
            <div className="flex items-center space-x-8">
              <button
                onClick={handleSendMessage}
                className="bg-[#431D5A] hover:bg-black/80 text-white p-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-sm"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 max-w-7xl mx-auto flex flex-col mt-20 space-y-4 p-4">
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
                  className="h-8 w-8 rounded-full object-cover mr-4"
                />
              )}

              <div className="flex flex-col">
                <div
                  className={`px-4 py-2 rounded-lg shadow-sm ${
                    msg.type === "user"
                      ? "bg-blue-500 text-right text-white"
                      : "bg-gray-100 text-left"
                  }`}
                >
                  {msg.text}
                </div>
              </div>

              {msg.type === "user" && (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full object-cover ml-4"
                />
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center space-x-2 justify-start">
              <img
                src={selectedBot?.img || ""}
                alt="Bot Avatar"
                className="h-8 w-8 rounded-full object-cover mr-3"
              />
              <span className="loading loading-dots loading-2xl "></span>
             
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
