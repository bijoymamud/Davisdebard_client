
import React, { useState } from "react";
import { useChatHistoryQuery, usePerticularChatDeleteMutation,useDeleteAllChatsMutation } from "../../redux/features/baseApi/baseApi";
import { useSearchParams } from "react-router-dom";
import ChatSection from "./ChatSection";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

function ChatHistory() {
  const { data, isLoading, error } = useChatHistoryQuery();
  const history = data?.data ?? []; // Ensure history is always an array
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("id"); // Get the chat ID from the URL query
  const [chatID, setChatId] = useState(undefined);
  const [perticularChatDelete] = usePerticularChatDeleteMutation()
  const [deleteAllChats] = useDeleteAllChatsMutation()
  // Handle clicking a chat ID (update URL query)
  const handleClick = (chatID) => {
    setSearchParams({ id: chatID });
    setChatId(chatID);
  };


  //delete perticular chat
  const handleDelete = async (chatHistoryId) =>{
    console.log(chatHistoryId);
     
    try {
      const response = await perticularChatDelete(chatHistoryId).unwrap();
      setChatId(undefined);
      refetch();
      console.log(response);
    } catch (error) {
      console.error("Error Deleting Data:", error)
    }
  }

  //delete all chats
  const handleAllDelete =() =>{
    try {
      const response  = deleteAllChats().unwrap();
      refetch()
    } catch (error) {
      console.error("Error Deleting History", error)
    }
  }


  console.log(history);

  return (
    <div className="min-h-screen bg-[#e1e4ed]">
      <div className="w-full mx-auto">
        {/* Loading & Error States */}
        {isLoading && <p className="text-gray-500">Loading chat history...</p>}
        {error && <p className="text-red-500">Error loading chat history.</p>}

        {/* Flex Container for Chat IDs & Messages */}
        <div className="flex items-start">
          {/* Left Section: Chat IDs */}
          <div className="basis-3/12 bg-[#431D5A] text-white p-4 shadow-md h-screen relative">
  <h2 className="text-2xl font-semibold mb-2">Chat History</h2>
  
  {history.length > 0 ? (
    <ul>
      {history.map((chat) => (
        <li key={chat.id} className="flex justify-between items-center p-2 border-b last:border-none">
          {/* Chat ID (Clickable) */}
          <span
            onClick={() => handleClick(chat.id)}
            className={`flex-grow cursor-pointer p-2 rounded-md ${
              chat.id === selectedId
                ? "bg-[#734a8d] text-white font-medium"
                : "hover:bg-[#5a2c78] hover:text-white"
            }`}
          >
            {chat.id}
          </span>

          {/* 3 Dot Menu */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="m-1">
              <BiDotsHorizontalRounded className="text-2xl" />
            </div>
            <ul tabIndex={0} className="dropdown-content border-none menu bg-black z-[50] w-28 shadow">
              <div className="flex flex-col">
                <button className="flex items-center space-x-2 cursor-pointer hover:bg-gray-500 rounded-md px-2 py-1">
                  <FaPencil className="text-base" />
                  <span className="text-sm font-medium">Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(chat.id)}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-500 rounded-md px-2 py-1"
                >
                  <FaTrashAlt className="text-lg text-black cursor-pointer" />
                  <span className="text-sm font-medium">Delete</span>
                </button>
              </div>
            </ul>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500">No chat history available.</p>
  )}

  {/* DELETE CHAT BUTTON AT BOTTOM */}
  <button
    onClick={() => handleAllDelete()}
    className="absolute bottom-4 w-[200px] py-[5px] hover:bg-[#ee5d5d] flex items-center justify-center gap-2 left-4 mx-auto right-4 border-2 text-white rounded-full  shadow-md text-base font-semibold transition-all duration-200"
  >
    Delete History
    <FaTrashAlt className="text-lg text-white cursor-pointer" />
  </button>
</div>


          {/* Right Section: Chat Messages */}
          <div className="basis-9/12 rounded-lg">
            {chatID && <ChatSection chatID={chatID} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHistory;
