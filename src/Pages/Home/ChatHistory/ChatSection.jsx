import React, { useEffect, useState } from "react";
import { Send, Plus, CircleHelp } from "lucide-react";
import { useChatContinueMutation, useChatCreateMutation, useGetBotInfoQuery, useRetrivedChatMutation } from "../../redux/features/baseApi/baseApi";
import { Link } from "react-router-dom";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { IoInvertMode } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { HiOutlineBars4 } from "react-icons/hi2";

function ChatSection({ chatID }) {

  const [message, setMessage] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const { data } = useGetBotInfoQuery();
  const [chatCreate] = useChatCreateMutation();
  const [chatContinue] = useChatContinueMutation();
  const [retrivedChat] = useRetrivedChatMutation();
 

  
  
  const botItems = data?.data ?? [];
  
  useEffect(()=>{
    setChatMessages([])
    setLastMessage("")
  },[chatID])

  useEffect(() => {
      if (chatMessages.length === 0) {
      console.log(chatID);
      retrivedChat(chatID)
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
  }, [chatID,chatMessages, retrivedChat]);


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


  const handleBotResponse = async (bot, userMessage) => {
    setIsThinking(true);

    try {
      // continue messagting block
      const { data } = await chatContinue({
        chatID: chatID,
        data: { model_id: bot.id, content: userMessage },
      });

      const botReply = data.data?.content ?? [];
      initialProcessMessage(botReply);
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
      <div className="w-full mx-auto px-4 pt-3">
        <div className="rounded-2xl mb-6 flex justify-between items-center">
          <div className="bg-[#431D5A] rounded-lg flex items-center justify-center py-[5px]">
            <Link to="/"
            className="w-[100px] text-white ps-2">New Chat</Link>
            <Plus size={20} className="text-white me-2" />
          </div>

          <div className="flex gap-4 justify-center flex-wrap ms-5">
            {botItems.map((bot, index) => (
              <button
                key={index}
                onClick={() => handleBotSelection(bot)}
                className={`w-40 flex items-center justify-between px-5 py-[5px] rounded-full ${
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
                  className="h-6 object-contain rounded-lg"
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
         
                      
                         <li>
                           <Link to="/userProfile" className="hover:bg-gray-200">
                             <FaRegUser className="text-xl" />
                             <span className="text-lg font-semibold">Profile</span>
                           </Link>
                         </li>
                      
         
                       <li>
                         <button className="hover:bg-gray-200">
                           <IoInvertMode className="text-xl" />
                           <span className="text-lg font-semibold">Light Mode</span>
                         </button>
                       </li>
                     </ul>
                   </div>
        </div>


        <div className="relative md:ms-[105px]">
          <div className="relative bg-[#7B549333] rounded-xl flex items-center px-2 py-[5px] shadow-sm border border-purple-100 w-[685px] mx-auto">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full bg-transparent outline-none py-2 text-[#431D5A] font-medium placeholder-gray-400 px-2"
            />
            <div className="flex items-center space-x-8">
              <button
                onClick={handleSendMessage}
                className="bg-[#431D5A] hover:bg-black/80 text-white p-2 rounded-lg transition-colors duration-200 flex items-center justify-center shadow-sm"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 max-w-4xl mx-auto flex flex-col mt-20 space-y-4 p-4">
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
                  className="h-8 w-8 rounded-full object-cover ml-4"
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

export default ChatSection;


