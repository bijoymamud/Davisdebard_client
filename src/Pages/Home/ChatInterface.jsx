// // ----------------------perfect code without history---------------------
// import React, { useEffect, useRef, useState } from "react";
// import { Send, Plus, CircleHelp } from "lucide-react";
// import { RiChatHistoryLine } from "react-icons/ri";
// import { MdLogout, MdOutlineQuestionAnswer } from "react-icons/md";
// import { AiFillThunderbolt } from "react-icons/ai";
// import { FaRegUser } from "react-icons/fa";
// import { IoInvertMode } from "react-icons/io5";
// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import { HiOutlineBars4 } from "react-icons/hi2";
// import {
//   useChatContinueMutation,
//   useChatCreateMutation,
//   useGetBotInfoQuery,
//   useLogOutUserMutation,
//   useRetrivedChatMutation,
// } from "../redux/features/baseApi/baseApi";
// import { LuLogIn } from "react-icons/lu";
// import useUserInfo from "../../Hooks/useUserInfo";

// function ChatInterface({ onChatStart }) {

//   const {id} = useParams();

//   const [message, setMessage] = useState("");
//   const [lastMessage, setLastMessage] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);
//   const [selectedBot, setSelectedBot] = useState(null);
//   const [isThinking, setIsThinking] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const { data } = useGetBotInfoQuery();
//   const [chatCreate] = useChatCreateMutation();
//   const [chatContinue] = useChatContinueMutation();
//   const [retrivedChat] = useRetrivedChatMutation();

//   const {isLoading:userLoading, user, error:userError} = useUserInfo();
//   console.log(user)

//   //making scrollbar
//   const chatContainerRef = useRef(null);
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [chatMessages, isThinking]);

//   let notFromHome = id !== undefined && id !== null;

//   const botItems = data?.data ?? [];
//   const [logOutUser] = useLogOutUserMutation();

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     setIsLoggedIn(!!token);
//   }, []);

//   useEffect(() => {
//     if (notFromHome && chatMessages.length === 0) {
//       retrivedChat(id)
//         .unwrap()
//         .then((response) => {
//           const list = response?.data?.content ?? [];
//           const lastUserMessage = list
//             .slice()
//             .reverse()
//             .find((item) => item.role === "user");
//           // setChatMessages(list);
//           initialProcessMessage(list);
//           if (lastUserMessage !== null) {
//             setLastMessage(lastUserMessage.content);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching chat:", error);
//         });
//     }
//   }, [id, notFromHome, chatMessages, retrivedChat]);

//   const navigate = useNavigate();

//   const initialProcessMessage = async (allmessages) => {
//     const nArray = [];
//     allmessages.forEach((element) => {
//       if (element.role == "user") {
//         const question = nArray
//           .slice()
//           .reverse()
//           .find((e) => e.role == "user");
//         if (!(question !== undefined && question.content === element.content)) {
//           // when no same question found in array;
//           nArray.push(element);
//         }
//       } else {
//         nArray.push(element);
//       }
//     });
//     setChatMessages(nArray);
//   };

//   const handleLogOutuser = async () => {
//     const refresh_token = localStorage.getItem("refresh_token");

//     try {
//       const response = await logOutUser({ refresh_token }).unwrap();
//       localStorage.clear("access_token");
//       localStorage.clear("refresh_token");
//       setIsLoggedIn(false);
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout Error:", error);
//     }
//   };

//   const handleBotResponse = async (bot, userMessage) => {
//     setIsThinking(true);

//     try {
//       if (onChatStart && (id === undefined || id === null)) {
//         // home initial chat block
//         const { data } = await chatCreate({
//           model_id: bot.id,
//           content: userMessage,
//         });

//         const botReply = data.data?.content ?? [];
//         onChatStart(data?.data);

//         setChatMessages((prev) => [...prev, botReply[1]]);
//       } else {
//         // continue messagting block
//         const { data } = await chatContinue({
//           chatID: id,
//           data: { model_id: bot.id, content: userMessage },
//         });

//         const botReply = data.data?.content ?? [];
//         initialProcessMessage(botReply);
//       }
//     } catch (error) {
//       console.error("Error fetching bot response:", error);
//       setChatMessages((prev) => [
//         ...prev,
//         {
//           role: "ai",
//           content: `Error: Unable to fetch response from ${bot.name}.`,
//           model: { icon: "" },
//         },
//       ]);
//     } finally {
//       setIsThinking(false);
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

//     if (lastMessage !== message) {
//       setChatMessages((prev) => [...prev, { role: "user", content: message }]);
//       setLastMessage(message);
//     }

//     setMessage("");
//     await handleBotResponse(selectedBot, message);
//   };

//   const handleBotSelection = async (bot) => {
//     if (selectedBot?.name === bot.name) {
//       setSelectedBot(null);
//       setLastMessage("");
//       setMessage("");
//     } else {
//       setSelectedBot(bot);

//       if (lastMessage) {
//         await handleBotResponse(bot, lastMessage);
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
//       <div className="w-full mx-auto m:px-4 md:py-6">
//         <div className="rounded-2xl mb-6 flex justify-between items-center md:px-5">
//           <div className="bg-[#431D5A] rounded-lg flex items-center md:text-xl text-sm">
//             <Link
//             to="/"
//             className="md:w-[120px] md:py-3 text-white px-2">New Chat</Link>
//             <Plus size={32} className="text-white pr-2" />
//           </div>

//  {/* {bot for large device} */}
//  <div className="hidden md md:flex gap-4 mx-auto justify-center flex-wrap ">
//   {botItems.map((bot, index) => (
//     <div className="">
//       <button
//       key={index}
//       onClick={() => handleBotSelection(bot)}
//       className={`w-40 flex items-center justify-between px-5 py-3 rounded-full ${
//         selectedBot?.name === bot.name
//           ? "bg-purple-100"
//           : "bg-gradient-to-r from-purple-50 to-indigo-50"
//       } hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 border border-purple-100 shadow-sm hover:shadow group`}
//     >
//       <span className="font-semibold text-lg text-gray-700 group-hover:text-[#431D5A] capitalize">
//         {bot.name}
//       </span>
//       <img
//         src={bot.icon}
//         alt={bot.name}
//         className="h-8 object-contain rounded-lg"
//       />
//     </button>
//     </div>
//   ))}
// </div>

// <div className="flex flex-col md:grid md:grid-cols-4 gap-5">
//   {/* Mobile Design: One Button on Top */}
//   <div className="md:hidden flex flex-col items-center gap-3">
//     {/* Top Button */}
//     {botItems.length > 0 && (
//       <button
//         onClick={() => handleBotSelection(botItems[0])}
//         className={`w-24 h-24 flex flex-col items-center justify-center px-3 py-2 rounded-lg ${
//           selectedBot && selectedBot.name === botItems[0].name
//             ? "bg-purple-100"
//             : "bg-gradient-to-r from-purple-50 to-indigo-50"
//         } hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 border border-purple-100 shadow-sm hover:shadow group`}
//       >
//         <img
//           src={botItems[0].icon}
//           alt={botItems[0].name}
//           className="h-8 w-8 object-contain mb-2"
//         />
//         <span className="text-xs font-medium text-gray-700 group-hover:text-[#431D5A] text-center">
//           {botItems[0].name}
//         </span>
//       </button>
//     )}

//     {/* Bottom Three Buttons */}
//     <div className="flex flex-wrap justify-center gap-3">
//       {botItems.slice(1).map((bot, index) => (
//         <button
//           key={index}
//           onClick={() => handleBotSelection(bot)}
//           className={`w-24 h-24 flex flex-col items-center justify-center px-3 py-2 rounded-lg ${
//             selectedBot && selectedBot.name === bot.name
//               ? "bg-purple-100"
//               : "bg-gradient-to-r from-purple-50 to-indigo-50"
//           } hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 border border-purple-100 shadow-sm hover:shadow group`}
//         >
//           <img
//             src={bot.icon}
//             alt={bot.name}
//             className="h-8 w-8 object-contain mb-2"
//           />
//           <span className="text-xs font-medium text-gray-700 group-hover:text-[#431D5A] text-center">
//             {bot.name}
//           </span>
//         </button>
//       ))}
//     </div>
//   </div>

//   {/* Large Device Design: Unchanged */}

// </div>

//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} role="button" className=" m-1">
//               <HiOutlineBars4 className="text-4xl" />
//             </div>

//             <ul
//               tabIndex={0}
//               className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[300px] p-2 shadow "
//             >
//               {isLoggedIn && (
//                 <li>
//                   <Link
//                     to="/chatHistory"
//                     className="flex items-center gap-2 hover:bg-gray-200"
//                   >
//                     <RiChatHistoryLine className="text-xl" />
//                     <span className="text-lg font-semibold">Chat History</span>
//                   </Link>
//                 </li>
//               )}

//               <li>
//                 <Link to="/Support" className="hover:bg-gray-200">
//                   <CircleHelp size={20} />
//                   <span className="text-lg font-semibold">Support</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/faq" className="hover:bg-gray-200">
//                   <MdOutlineQuestionAnswer className="text-xl" />
//                   <span className="text-lg font-semibold">FAQ</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/manageSubcription" className="hover:bg-gray-200">
//                   <AiFillThunderbolt className="text-xl" />
//                   <span className="text-lg font-semibold">
//                     Manage Subscription
//                   </span>
//                 </Link>
//               </li>

//               {isLoggedIn && (
//                 <li>
//                   <Link to="/userProfile" className="hover:bg-gray-200">
//                     <FaRegUser className="text-xl" />
//                     <span className="text-lg font-semibold">Profile</span>
//                   </Link>
//                 </li>
//               )}

//               <li>
//                 <button className="hover:bg-gray-200">
//                   <IoInvertMode className="text-xl" />
//                   <span className="text-lg font-semibold">Light Mode</span>
//                 </button>
//               </li>

//               {isLoggedIn ? (
//                 <li>
//                   <button
//                     onClick={() =>
//                       document.getElementById("logout_modal").showModal()
//                     }
//                     className="flex items-center gap-2 hover:bg-gray-200"
//                   >
//                     <MdLogout className="text-xl" />
//                     <span className="text-lg font-semibold">Log out</span>
//                   </button>
//                 </li>
//               ) : (
//                 <li>
//                   <Link to="/login" className="flex items-center gap-2">
//                     <LuLogIn className="text-xl" />
//                     <span className="text-lg font-semibold">Login</span>
//                   </Link>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>

//         <dialog id="logout_modal" className="modal">
//           <div className="modal-box">
//             <p className="py-4">Leave Use the Best AI?</p>
//             <div className="flex items-center justify-center gap-5">
//               <form method="dialog">
//                 <button className="btn border-none bg-[#CDC7DB] hover:bg-[#CDC7DB] text-[#431D5A]">
//                   Cancel
//                 </button>
//               </form>

//               <button
//                 onClick={() => handleLogOutuser()}
//                 className="btn bg-[#431D5A] hover:bg-[#431D5A] text-white"
//               >
//                 Log Out
//               </button>
//             </div>
//           </div>
//         </dialog>

//         <div className="relative md:ms-[55px] px-2 md:px-0">
//           <div className="relative bg-[#7B549333] rounded-xl flex items-center md:p-3 p-2 shadow-sm border border-purple-100 md:w-[685px] mx-auto">
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Type your message..."
//               className="w-full bg-transparent outline-none text-[#431D5A] font-medium placeholder-gray-400 px-2"
//             />
//             <div className="flex items-center space-x-8">
//               <button
//                 onClick={handleSendMessage}
//                 className="bg-[#431D5A] hover:bg-black/80 text-white p-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-sm"
//               >
//                 <Send size={20} />
//               </button>
//             </div>
//           </div>
//         </div>

// <div
//       ref={chatContainerRef}
//       className="mb-6 md:max-w-7xl mx-auto h-[70vh] flex flex-col md:mt-14 space-y-4 md:p-4 p-1 overflow-y-auto shadow"
//       style={{
//         scrollbarWidth: "thin",
//         scrollbarColor: "#9ECA2E transparent",
//         scrollBehavior: "smooth", // Smooth scrolling
//       }}
//     >
//       {chatMessages.map((msg, index) => (
//         <div
//           key={index}
//           className={`flex items-start ${
//             msg.role === "user" ? "justify-end" : ""
//           }`}
//         >
//           {msg.role === "ai" && (
//             <img
//               src={msg.model?.icon || ""}
//               alt="Bot Avatar"
//               className="h-8 w-8 rounded-full object-cover mr-4"
//             />
//           )}

//           <div className="flex flex-col">
//             <div
//               className={`px-4 py-2 rounded-lg shadow-sm w-10/12 w-full ${
//                 msg.role === "user"
//                   ? "bg-gray-400 text-right text-white"
//                   : "bg-gray-100 text-left"
//               }`}
//             >
//               {msg.content}
//             </div>
//           </div>

//           {msg.role === "user" && (
//                 (userLoading || userError != null || !user.image)?<img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User Avatar" className="h-8 w-8 rounded-full object-cover ml-4" />:
//                 <img src={user.image} alt="User Avatar" className="h-8 w-8 rounded-full object-cover ml-4" />
//               )}
//         </div>
//       ))}

//       {isThinking && (
//         <div className="flex items-center space-x-2 justify-start">
//           <img
//             src={selectedBot?.icon || ""}
//             alt="Bot Avatar"
//             className="h-8 w-8 rounded-full object-cover mr-3"
//           />
//           <span className="loading loading-dots loading-2xl "></span>
//         </div>
//       )}
//     </div>

//       </div>
//     </div>
//   );
// }

// export default ChatInterface;

import React, { useEffect, useRef, useState } from "react";
import { Send, Plus, CircleHelp } from "lucide-react";
import { RiChatHistoryLine } from "react-icons/ri";
import { MdLogout, MdOutlineQuestionAnswer } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaPlus, FaRegUser } from "react-icons/fa";
import { IoInvertMode } from "react-icons/io5";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { HiOutlineBars4 } from "react-icons/hi2";
import {
  useChatContinueMutation,
  useChatCreateMutation,
  useGetBotInfoQuery,
  useLogOutUserMutation,
  useRetrivedChatMutation,
} from "../redux/features/baseApi/baseApi";
import { LuLogIn, LuSend } from "react-icons/lu";
import useUserInfo from "../../Hooks/useUserInfo";

function ChatInterface({ onChatStart }) {
  const { id } = useParams();

  const [message, setMessage] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data } = useGetBotInfoQuery();
  const [chatCreate] = useChatCreateMutation();
  const [chatContinue] = useChatContinueMutation();
  const [retrivedChat] = useRetrivedChatMutation();

  const { isLoading: userLoading, user, error: userError } = useUserInfo();
  console.log(user);

  //making scrollbar
  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, isThinking]);

  let notFromHome = id !== undefined && id !== null;

  const botItems = data?.data ?? [];
  const [logOutUser] = useLogOutUserMutation();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (notFromHome && chatMessages.length === 0) {
      retrivedChat(id)
        .unwrap()
        .then((response) => {
          const list = response?.data?.content ?? [];
          const lastUserMessage = list
            .slice()
            .reverse()
            .find((item) => item.role === "user");
          // setChatMessages(list);
          initialProcessMessage(list);
          if (lastUserMessage !== null) {
            setLastMessage(lastUserMessage.content);
          }
        })
        .catch((error) => {
          console.error("Error fetching chat:", error);
        });
    }
  }, [id, notFromHome, chatMessages, retrivedChat]);

  const navigate = useNavigate();

  const initialProcessMessage = async (allmessages) => {
    const nArray = [];
    allmessages.forEach((element) => {
      if (element.role == "user") {
        const question = nArray
          .slice()
          .reverse()
          .find((e) => e.role == "user");
        if (!(question !== undefined && question.content === element.content)) {
          // when no same question found in array;
          nArray.push(element);
        }
      } else {
        nArray.push(element);
      }
    });
    setChatMessages(nArray);
  };

  const handleLogOutuser = async () => {
    const refresh_token = localStorage.getItem("refresh_token");

    try {
      const response = await logOutUser({ refresh_token }).unwrap();
      localStorage.clear("access_token");
      localStorage.clear("refresh_token");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleBotResponse = async (bot, userMessage) => {
    setIsThinking(true);

    try {
      if (onChatStart && (id === undefined || id === null)) {
        // home initial chat block
        const { data } = await chatCreate({
          model_id: bot.id,
          content: userMessage,
        });

        const botReply = data.data?.content ?? [];
        onChatStart(data?.data);

        setChatMessages((prev) => [...prev, botReply[1]]);
      } else {
        // continue messagting block
        const { data } = await chatContinue({
          chatID: id,
          data: { model_id: bot.id, content: userMessage },
        });

        const botReply = data.data?.content ?? [];
        initialProcessMessage(botReply);
      }
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: `Error: Unable to fetch response from ${bot.name}.`,
          model: { icon: "" },
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

    if (lastMessage !== message) {
      setChatMessages((prev) => [...prev, { role: "user", content: message }]);
      setLastMessage(message);
    }

    setMessage("");
    await handleBotResponse(selectedBot, message);
  };

  const handleBotSelection = async (bot) => {
    if (selectedBot?.name === bot.name) {
      setSelectedBot(null);
      setLastMessage("");
      setMessage("");
    } else {
      setSelectedBot(bot);

      if (lastMessage) {
        await handleBotResponse(bot, lastMessage);
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
      <div className="w-full mx-auto m:px-4 md:py-6">

        {/* //for mobile devices */}
        <div className="flex items-center justify-between pt-2">
          <div className="bg-[#431D5A] p-2 w-[100px] text-center rounded-md md:hidden mx-2">
            <div className="flex items-center gap-4">
              <h1 className="text-white ps-2 text-base font-semibold">New</h1>
              <span>
                <FaPlus className="text-white" />
              </span>
            </div>
          </div>

          <div className="dropdown dropdown-end md:hidden">
            <div tabIndex={0} role="button" className=" m-1">
              <HiOutlineBars4 className="md:text-4xl text-2xl font-semibold" />
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[260px] shadow me-2 "
            >
              {isLoggedIn && (
                <li>
                  <Link
                    to="/chatHistory"
                    className="flex items-center gap-2 hover:bg-gray-200"
                  >
                    <RiChatHistoryLine className="text-xl" />
                    <span className="text-base font-semibold">Chat History</span>
                  </Link>
                </li>
              )}

              <li>
                <Link to="/Support" className="hover:bg-gray-200">
                  <CircleHelp size={20} />
                  <span className="text-base font-semibold">Support</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:bg-gray-200">
                  <MdOutlineQuestionAnswer className="text-xl" />
                  <span className="text-base font-semibold">FAQ</span>
                </Link>
              </li>
              <li>
                <Link to="/manageSubcription" className="hover:bg-gray-200">
                  <AiFillThunderbolt className="text-xl" />
                  <span className="text-base font-semibold">
                    Manage Subscription
                  </span>
                </Link>
              </li>

              {isLoggedIn && (
                <li>
                  <Link to="/userProfile" className="hover:bg-gray-200">
                    <FaRegUser className="text-xl" />
                    <span className="text-base font-semibold">Profile</span>
                  </Link>
                </li>
              )}

              <li>
                <button className="hover:bg-gray-200">
                  <IoInvertMode className="text-xl" />
                  <span className="text-base font-semibold">Light Mode</span>
                </button>
              </li>

              {isLoggedIn ? (
                <li>
                  <button
                    onClick={() =>
                      document.getElementById("logout_modal").showModal()
                    }
                    className="flex items-center gap-2 hover:bg-gray-200"
                  >
                    <MdLogout className="text-xl" />
                    <span className="text-base font-semibold">Log out</span>
                  </button>
                </li>
              ) : (
                <li>
                  <Link to="/login" className="flex items-center gap-2">
                    <LuLogIn className="text-xl" />
                    <span className="text-base font-semibold">Login</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>


{/* for large devices */}
<div className="flex items-center justify-between w-full px-6 ">

      {/* Left: New Chat Button */}
      <div className="hidden md:flex items-center">
        <Link
          to="/"
          className="flex items-center bg-[#431D5A] text-white font-semibold text-base px-4 py-2 rounded-md"
        >
          New Chat <FaPlus className="ml-2 text-sm" />
        </Link>
      </div>

      {/* Center: Bot Selection */}
      <div className="flex justify-center flex-1">
        <div className="hidden md:flex flex-wrap items-center gap-4">
          {botItems.map((bot, index) => (
            <button
              key={index}
              onClick={() => handleBotSelection(bot)}
              className={`flex items-center px-8 py-3 rounded-full ${
                selectedBot?.name === bot.name ? "bg-purple-100" : "bg-gray-100"
              } hover:bg-purple-200 transition-all duration-300 border border-gray-200 shadow-sm hover:shadow group`}
            >
              <span className="font-semibold text-xl text-gray-700 group-hover:text-[#431D5A] capitalize">
                {bot.name}
              </span>
              <img src={bot.icon} alt={bot.name} className="h-8 ml-2 object-contain rounded-lg" />
            </button>
          ))}
        </div>
      </div>

      {/* Right: Dropdown Menu */}
      <div className="dropdown dropdown-end hidden md:flex">
            <div tabIndex={0} role="button" className=" m-1">
              <HiOutlineBars4 className="md:text-4xl text-2xl font-semibold" />
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[260px] shadow me-2 "
            >
              {isLoggedIn && (
                <li>
                  <Link
                    to="/chatHistory"
                    className="flex items-center gap-2 hover:bg-gray-200"
                  >
                    <RiChatHistoryLine className="text-xl" />
                    <span className="text-base font-semibold">Chat History</span>
                  </Link>
                </li>
              )}

              <li>
                <Link to="/Support" className="hover:bg-gray-200">
                  <CircleHelp size={20} />
                  <span className="text-base font-semibold">Support</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:bg-gray-200">
                  <MdOutlineQuestionAnswer className="text-xl" />
                  <span className="text-base font-semibold">FAQ</span>
                </Link>
              </li>
              <li>
                <Link to="/manageSubcription" className="hover:bg-gray-200">
                  <AiFillThunderbolt className="text-xl" />
                  <span className="text-base font-semibold">
                    Manage Subscription
                  </span>
                </Link>
              </li>

              {isLoggedIn && (
                <li>
                  <Link to="/userProfile" className="hover:bg-gray-200">
                    <FaRegUser className="text-xl" />
                    <span className="text-base font-semibold">Profile</span>
                  </Link>
                </li>
              )}

              <li>
                <button className="hover:bg-gray-200">
                  <IoInvertMode className="text-xl" />
                  <span className="text-base font-semibold">Light Mode</span>
                </button>
              </li>

              {isLoggedIn ? (
                <li>
                  <button
                    onClick={() =>
                      document.getElementById("logout_modal").showModal()
                    }
                    className="flex items-center gap-2 hover:bg-gray-200"
                  >
                    <MdLogout className="text-xl" />
                    <span className="text-base font-semibold">Log out</span>
                  </button>
                </li>
              ) : (
                <li>
                  <Link to="/login" className="flex items-center gap-2">
                    <LuLogIn className="text-xl" />
                    <span className="text-base font-semibold">Login</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
      
    </div>



        <div className="flex mx-auto mt-5 flex-col md:grid md:grid-cols-4 gap-5">
            {/* Mobile Design: One Button on Top */}
            <div className="md:hidden flex flex-col items-center gap-3">
              {/* Top Button */}
              <div className="">
                {botItems.length > 0 && (
                  <button
                    onClick={() => handleBotSelection(botItems[0])}
                    className={`flex items-center justify-center gap-2 rounded-full ${
                      selectedBot && selectedBot.name === botItems[0].name
                        ? "bg-purple-100"
                        : "bg-gradient-to-r from-purple-50 to-indigo-50"
                    } hover:from-purple-100 hover:to-indigo-100 transition-all p-2 px-4 duration-300 border border-purple-100 shadow-sm hover:shadow group`}
                  >
                    <img
                      src={botItems[0].icon}
                      alt={botItems[0].name}
                      className="h-6 w-6 object-contain"
                    />
                    <span className="font-semibold text-gray-700 capitalize group-hover:text-[#431D5A] text-center">
                      {botItems[0].name}
                    </span>
                  </button>
                )}
              </div>

              {/* Bottom Three Buttons */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {botItems.slice(1).map((bot, index) => (
                  <button
                    key={index}
                    onClick={() => handleBotSelection(bot)}
                    className={`flex  items-center justify-center  rounded-full w-[120px] gap-[2px] p-2 px-1 ${
                      selectedBot && selectedBot.name === bot.name
                        ? "bg-purple-100"
                        : "bg-gradient-to-r from-purple-50 to-indigo-50"
                    } hover:from-purple-100 hover:to-indigo-100 transition-all capitalize duration-300 border border-purple-100 shadow-sm hover:shadow group`}
                  >
                    <img
                      src={bot.icon}
                      alt={bot.name}
                      className="w-6 h-6 object-contain"
                    />
                    <span className="font-semibold text-gray-700 group-hover:text-[#431D5A] text-center">
                      {bot.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Large Device Design: Unchanged */}
          </div>

        <dialog id="logout_modal" className="modal">
          <div className="modal-box">
            <p className="py-4">Leave Use the Best AI?</p>
            <div className="flex items-center justify-center gap-5">
              <form method="dialog">
                <button className="btn border-none bg-[#CDC7DB] hover:bg-[#CDC7DB] text-[#431D5A]">
                  Cancel
                </button>
              </form>

              <button
                onClick={() => handleLogOutuser()}
                className="btn bg-[#431D5A] hover:bg-[#431D5A] text-white"
              >
                Log Out
              </button>
            </div>
          </div>
        </dialog>

        <div className="relative md:ms-[95px] px-2 md:px-0 mb-10 md:mb-0">
          <div className="relative bg-[#7B549333] rounded-xl flex items-center md:p-3 p-2 shadow-sm border border-purple-100 md:w-[750px] mx-auto">
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
                className="bg-[#431D5A] hover:bg-black/80 text-white md:p-2.5 p-2 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-sm"
              >
                <LuSend className="md:text-lg"/>
              </button>
            </div>
          </div>
        </div>

        <div
          ref={chatContainerRef}
          className="mb-6 md:max-w-7xl mx-auto h-[70vh] flex flex-col md:mt-14 space-y-4 md:p-4 p-1 overflow-y-auto shadow"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#9ECA2E transparent",
            scrollBehavior: "smooth", // Smooth scrolling
          }}
        >
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start ${
                msg.role === "user" ? "justify-end" : ""
              }`}
            >
              {msg.role === "ai" && (
                <img
                  src={msg.model?.icon || ""}
                  alt="Bot Avatar"
                  className="h-8 w-8 rounded-full object-cover mr-4"
                />
              )}

              <div className="flex flex-col">
                <div
                  className={`px-4 py-2 rounded-lg shadow-sm w-10/12 w-full ${
                    msg.role === "user"
                      ? "bg-gray-400 text-right text-white"
                      : "bg-gray-100 text-left"
                  }`}
                >
                  {msg.content}
                </div>
              </div>

              {msg.role === "user" &&
                (userLoading || userError != null || !user.image ? (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="User Avatar"
                    className="h-8 w-8 rounded-full object-cover ml-4"
                  />
                ) : (
                  <img
                    src={user.image}
                    alt="User Avatar"
                    className="h-8 w-8 rounded-full object-cover ml-4"
                  />
                ))}
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center space-x-2 justify-start">
              <img
                src={selectedBot?.icon || ""}
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
