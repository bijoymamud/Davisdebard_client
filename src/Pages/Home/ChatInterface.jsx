// // // ----------------------perfect code without history---------------------
import React, { useEffect, useState } from "react";
import { Send, Plus, CircleHelp } from "lucide-react";
import { RiChatHistoryLine } from "react-icons/ri";
import { MdLogout, MdOutlineQuestionAnswer } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
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
import { LuLogIn } from "react-icons/lu";

function ChatInterface({ onChatStart }) {
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

  console.log(chatMessages,'chat-message',lastMessage,message)
    const { id } = useParams();
    console.log(id)

  let notFromHome = id !== undefined && id !== null;

  //getting icons and bot info
  const botItems = data?.data ?? [];


  const [logOutUser] = useLogOutUserMutation();



  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token); // Set `true` if token exists, otherwise `false`
  }, []);

  useEffect(() => {
  
    if (notFromHome && chatMessages.length === 0) {
        retrivedChat(id)
            .unwrap() // Ensures we get the actual data, not a promise object
            .then((response) => {
              const list = response?.data?.content??[];
              
              const lastUserMessage = list.slice().reverse().find(item => item.role === "user");
              setChatMessages(list)
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
    console.log(bot);
    setIsThinking(true);

    
    try {
      if (onChatStart && (id === undefined || id === null)) {
        const { data } = await chatCreate({
          model_id: bot.id,
          content: userMessage,
        });
       // console.log(data.data,'server db');

        const botReply = data.data?.content ?? [];
        // onChatStart(data?.data?.id);
        onChatStart(data?.data);

        setChatMessages((prev) => { 
          return [...prev, botReply[1]];
        });
      } else {
        const { data } = await chatContinue({
          chatID: id,
          data: { model_id: bot.id, content: userMessage },
        });
        console.log(data.data);

        const botReply = data.data?.content ?? [];
        // onChatStart(data?.data?.id);
       
        console.log(botReply)

        // setChatMessages((prev)=>{
        //   return [...prev, botReply[1]];
        // });
        console.log(botReply,'bot reply')
        setChatMessages(botReply);
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

  // const handleSendMessage = async () => {
  //   if (!message.trim()) {
  //     alert("Message cannot be empty.");
  //     return;
  //   }

  //   if (!selectedBot) {
  //     alert("Please select a bot first.");
  //     return;
  //   }

  //   setChatMessages((prev) => [...prev, { role: "user", content: message }]);
  //   setLastMessage(message);
  //   setMessage("");

  //   await handleBotResponse(selectedBot, message);
  // };


  const handleSendMessage = async () => {
    if (!message.trim()) {
      alert("Message cannot be empty.");
      return;
    }
  
    if (!selectedBot) {
      alert("Please select a bot first.");
      return;
    }
  
    // Prevent duplicate consecutive user messages from being displayed
    if (chatMessages.length > 0 && chatMessages[chatMessages.length - 1].content === message) {
      return; // Exit function if the input is the same as the last message
    }
  
    setChatMessages((prev) => [...prev, { role: "user", content: message }]);
    setLastMessage(message);
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

      console.log(bot);
      console.log("-------");
      console.log(selectedBot);
      if (lastMessage) {
        await handleBotResponse(bot,lastMessage);  ///lastmessate
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
                  src={bot.icon}
                  alt={bot.name}
                  className="h-8 object-contain rounded-lg"
                />
              </button>
            ))}
          </div>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className=" m-1">
              <HiOutlineBars4 className="text-4xl" />
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[300px] p-2 shadow "
            >
              {isLoggedIn && (
                <li>
                  <Link
                    to="/chatHistory"
                    className="flex items-center gap-2 hover:bg-gray-200"
                  >
                    <RiChatHistoryLine className="text-xl" />
                    <span className="text-lg font-semibold">Chat History</span>
                  </Link>
                </li>
              )}

              <li>
                <Link to="/Support" className="hover:bg-gray-200">
                  <CircleHelp size={20} />
                  <span className="text-lg font-semibold">Support</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:bg-gray-200">
                  <MdOutlineQuestionAnswer className="text-xl" />
                  <span className="text-lg font-semibold">FAQ</span>
                </Link>
              </li>
              <li>
                <Link to="/manageSubcription" className="hover:bg-gray-200">
                  <AiFillThunderbolt className="text-xl" />
                  <span className="text-lg font-semibold">
                    Manage Subscription
                  </span>
                </Link>
              </li>

              {isLoggedIn && (
                <li>
                  <Link to="/userProfile" className="hover:bg-gray-200">
                    <FaRegUser className="text-xl" />
                    <span className="text-lg font-semibold">Profile</span>
                  </Link>
                </li>
              )}

              <li>
                <button className="hover:bg-gray-200">
                  <IoInvertMode className="text-xl" />
                  <span className="text-lg font-semibold">Light Mode</span>
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
                    <span className="text-lg font-semibold">Log out</span>
                  </button>
                </li>
              ) : (
                <li>
                  <Link to="/login" className="flex items-center gap-2">
                    <LuLogIn className="text-xl" />
                    <span className="text-lg font-semibold">Login</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Modal Component logout*/}
        <dialog id="logout_modal" className="modal">
          <div className="modal-box">
            <p className="py-4">Leave Use the Best AI?</p>
            <div className="flex items-center justify-center gap-5">
              {/* Cancel Button */}
              <form method="dialog">
                <button className="btn border-none bg-[#CDC7DB] hover:bg-[#CDC7DB] text-[#431D5A]">
                  Cancel
                </button>
              </form>

              {/* Log Out Button */}
              <button
                onClick={() => handleLogOutuser()} // Corrected to invoke the function
                className="btn bg-[#431D5A] hover:bg-[#431D5A] text-white"
              >
                Log Out
              </button>
            </div>
          </div>
        </dialog>

        <div className="relative md:ms-[105px]">
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
                msg.role === "user" ? "justify-end" : ""
              }`}
            >
              {msg.role === "ai" && (
                <img
                  src={msg.model.icon}
                  alt="Bot Avatar"
                  className="h-8 w-8 rounded-full object-cover mr-4"
                />
              )}

              <div className="flex flex-col">
                <div
                  className={`px-4 py-2 rounded-lg shadow-sm ${
                    msg.role === "user"
                      ? "bg-blue-500 text-right text-white"
                      : "bg-gray-100 text-left"
                  }`}
                >
                  {msg.content}
                </div>
              </div>

              {msg.role === "user" && (
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
