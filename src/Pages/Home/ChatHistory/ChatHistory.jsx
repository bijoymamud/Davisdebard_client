// import React from "react";
// import { useChatHistoryQuery } from "../../redux/features/baseApi/baseApi";
// import { useSearchParams } from "react-router-dom";

// function ChatHistory() {
//   const { data, isLoading, error } = useChatHistoryQuery();
//   const history = data?.data ?? []; // Ensure history is always an array
//   const [searchParams, setSearchParams] = useSearchParams();
//   const selectedId = searchParams.get("id"); 
//   const selectedChat = history.find((chat) => chat.id === selectedId); // Find selected chat

//   // Handle clicking a chat ID (update URL query)
//   const handleClick = (chatId) => {
//     setSearchParams({ id: chatId }); // Updates the URL dynamically (without navigating)
//   };

//   return (
//     <div className="min-h-screen bg-[#e1e4ed]">
//       <div className="w-full mx-auto px-4 py-6">
//         <h1 className="text-2xl font-bold mb-6">Chat History</h1>

//         {/* Loading & Error States */}
//         {isLoading && <p className="text-gray-500">Loading chat history...</p>}
//         {error && <p className="text-red-500">Error loading chat history.</p>}

//         {/* Flex Container for Chat IDs & Details */}
//         <div className="flex items-start gap-10 bg-green-100 p-4 rounded-lg">
//           {/* Left Section: Chat IDs */}
//           <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold mb-2">Select a Chat</h2>
//             {history.length > 0 ? (
//               <ul>
//                 {history.map((chat) => (
//                   <li
//                     key={chat.id}
//                     className={`p-2 border-b last:border-none cursor-pointer hover:bg-gray-100 ${
//                       chat.id === selectedId ? "text-red-500 font-bold" : "text-blue-700"
//                     }`}
//                     onClick={() => handleClick(chat.id)}
//                   >
//                     {chat.id}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-500">No chat history available.</p>
//             )}
//           </div>

//           {/* Right Section: Chat Details */}
//           <div className="w-3/4 bg-white p-4 rounded-lg shadow-md">
//             <h2 className="text-lg font-semibold mb-2">Chat Details</h2>
//             {selectedChat ? (
//               <pre className="p-2 bg-gray-100 rounded-md">
//                 {JSON.stringify(selectedChat, null, 2)}
//               </pre>
//             ) : (
//               <p className="text-gray-500">Click on a chat ID to view details.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatHistory;



import React, { useState } from "react";
import { useChatHistoryQuery } from "../../redux/features/baseApi/baseApi";
import {useSearchParams } from "react-router-dom";
import ChatSection from "./ChatSection";

function ChatHistory() {
  const { data, isLoading, error } = useChatHistoryQuery();
  const history = data?.data ?? []; // Ensure history is always an array
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("id"); // Get the chat ID from the URL query
  const selectedChat = history.find((chat) => chat.id === selectedId); // Find selected chat
  const [chatID, setChatId] = useState(undefined);
  // Handle clicking a chat ID (update URL query)
  const handleClick = (chatID) => {
    setSearchParams({ id: chatID }); 
    setChatId(chatID)
  };

  console.log(history)

  return (
    <div className="min-h-screen bg-[#e1e4ed]">
      <div className="w-full mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Chat History</h1>

        {/* Loading & Error States */}
        {isLoading && <p className="text-gray-500">Loading chat history...</p>}
        {error && <p className="text-red-500">Error loading chat history.</p>}

        {/* Flex Container for Chat IDs & Messages */}
        <div className="flex items-start gap-10  p-4 rounded-lg">
          {/* Left Section: Chat IDs */}
          <div className="w-1/4 bg-[#431D5A] text-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Select a Chat</h2>
            {history.length > 0 ? (
              <ul>
                {history.map((chat) => (
                  <li
                    key={chat.id}
                    className={`p-2 border-b last:border-none cursor-pointer hover:bg-gray-100 hover:text-black ${
                      chat.id === selectedId ? "text-green-500 font-medium" : "text-white "
                    }`}
                    onClick={() => handleClick(chat.id)}
                  >
                    {chat.id}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No chat history available.</p>
            )}
          </div>

          {/* Right Section: Chat Messages */}
          <div className="w-3/4  p-4 rounded-lg ">
           {chatID && <ChatSection chatID={chatID} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHistory;
