
// import React, { useState } from "react";
// import { useChatHistoryQuery, usePerticularChatDeleteMutation,useDeleteAllChatsMutation } from "../../redux/features/baseApi/baseApi";
// import { useSearchParams } from "react-router-dom";
// import ChatSection from "./ChatSection";
// import { BiDotsHorizontalRounded } from "react-icons/bi";
// import { FaTrashAlt } from "react-icons/fa";
// import { FaPencil } from "react-icons/fa6";

// function ChatHistory() {
//   const { data, isLoading, error } = useChatHistoryQuery();
//   const history = data?.data ?? []; // Ensure history is always an array
//   const [searchParams, setSearchParams] = useSearchParams();
//   const selectedId = searchParams.get("id"); // Get the chat ID from the URL query
//   const [chatID, setChatId] = useState(undefined);
//   const [perticularChatDelete] = usePerticularChatDeleteMutation()
//   const [deleteAllChats] = useDeleteAllChatsMutation()
//   // Handle clicking a chat ID (update URL query)
//   const handleClick = (chatID) => {
//     setSearchParams({ id: chatID });
//     setChatId(chatID);
//   };


//   //delete perticular chat
//   const handleDelete = async (chatHistoryId) =>{
//     console.log(chatHistoryId);
     
//     try {
//       const response = await perticularChatDelete(chatHistoryId).unwrap();
//       setChatId(undefined);
//       refetch();
//       console.log(response);
//     } catch (error) {
//       console.error("Error Deleting Data:", error)
//     }
//   }

//   //delete all chats
//   const handleAllDelete =() =>{
//     try {
//       const response  = deleteAllChats().unwrap();
//       refetch()
//     } catch (error) {
//       console.error("Error Deleting History", error)
//     }
//   }


//   console.log(history);

//   return (
//     <div className="min-h-screen bg-[#e1e4ed]">
//       <div className="w-full mx-auto">
//         {/* Loading & Error States */}
//         {isLoading && <p className="text-gray-500">Loading chat history...</p>}
//         {error && <p className="text-red-500">Error loading chat history.</p>}

//         {/* Flex Container for Chat IDs & Messages */}
//         <div className="flex items-start">
//           {/* Left Section: Chat IDs */}
//           <div className="basis-3/12 bg-[#431D5A] text-white p-4 shadow-md h-screen relative">
//   <h2 className="text-2xl font-semibold mb-2">Chat History</h2>
  
//   {history.length > 0 ? (
//     <ul>
//       {history.map((chat) => (
//         <li key={chat.id} className="flex justify-between items-center p-2 border-b last:border-none">
//           {/* Chat ID (Clickable) */}
//           <span
//             onClick={() => handleClick(chat.id)}
//             className={`flex-grow cursor-pointer p-2 rounded-md ${
//               chat.id === selectedId
//                 ? "bg-[#734a8d] text-white font-medium"
//                 : "hover:bg-[#5a2c78] hover:text-white"
//             }`}
//           >
//             {chat.id}
//           </span>

//           {/* 3 Dot Menu */}
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} role="button" className="m-1">
//               <BiDotsHorizontalRounded className="text-2xl" />
//             </div>
//             <ul tabIndex={0} className="dropdown-content border-none menu bg-black z-[50] w-28 shadow">
//               <div className="flex flex-col">
//                 {/* <button className="flex items-center space-x-2 cursor-pointer hover:bg-gray-500 rounded-md px-2 py-1">
//                   <FaPencil className="text-base" />
//                   <span className="text-sm font-medium">Edit</span>
//                 </button> */}

//                 {/* Open the modal using document.getElementById('ID').showModal() method */}
// <button className="flex items-center space-x-2 cursor-pointer hover:bg-gray-500 rounded-md px-2 py-1" onClick={()=>document.getElementById('chatEdit_modal').showModal()}>
// <FaPencil className="text-base" />
// <span className="text-sm font-medium">Edit</span>
// </button>
// <dialog id="chatEdit_modal" className="modal text-black">
//   <div className="modal-box">
//     <h3 className="font-bold text-lg">Hello!</h3>
//     <p className="py-4">Press ESC key or click the button below to close</p>
//     <div className="modal-action">
//       <form method="dialog">
//         {/* if there is a button in form, it will close the modal */}
//         <button className="btn">Close</button>
//       </form>
//     </div>
//   </div>
// </dialog>
//                 <button
//                   onClick={() => handleDelete(chat.id)}
//                   className="flex items-center space-x-2 cursor-pointer hover:bg-gray-500 rounded-md px-2 py-1"
//                 >
//                   <FaTrashAlt className="text-lg text-red-600 cursor-pointer" />
//                   <span className="text-sm font-medium">Delete</span>
//                 </button>
//               </div>
//             </ul>
//           </div>
//         </li>
//       ))}
//     </ul>
//   ) : (
//     <p className="text-gray-500">No chat history available.</p>
//   )}

//   {/* DELETE CHAT BUTTON AT BOTTOM */}
//   <button
//     onClick={() => handleAllDelete()}
//     className="absolute bottom-4 w-[200px] py-[5px] hover:bg-[#ee5d5d] flex items-center justify-center gap-2 left-4 mx-auto right-4 border-2 text-white rounded-full  shadow-md text-base font-semibold transition-all duration-200"
//   >
//     Delete History
//     <FaTrashAlt className="text-lg text-white cursor-pointer" />
//   </button>
// </div>


//           {/* Right Section: Chat Messages */}
//           <div className="basis-9/12 rounded-lg">
//             {chatID && <ChatSection chatID={chatID} />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatHistory;

import React, { useState } from "react";
import { useChatHistoryQuery, usePerticularChatDeleteMutation, useEditChatTitleMutation, useDeleteAllChatsMutation } from "../../redux/features/baseApi/baseApi";
import { useSearchParams } from "react-router-dom";
import ChatSection from "./ChatSection";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

function ChatHistory() {
  const { data, isLoading, error, refetch } = useChatHistoryQuery();
  const [perticularChatDelete] = usePerticularChatDeleteMutation();
  const [editChatTitle] = useEditChatTitleMutation();
  const [deleteAllChats] = useDeleteAllChatsMutation();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("id");
  const [chatID, setChatId] = useState(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editingChat, setEditingChat] = useState(null);

  const handleClick = (chat) => {
    setSearchParams({ id: chat.id });
    setChatId(chat.id);
  };




  const handleDelete = async (chatHistoryId) => {
   

    try {
      await perticularChatDelete(chatHistoryId).unwrap();
      setChatId(undefined);
      refetch();
    } catch (error) {
      console.error("Error Deleting Chat:", error);
    }
  };

  const handleAllDelete = async () => {
  
    try {
      await deleteAllChats().unwrap();
      refetch();
    } catch (error) {
      console.error("Error Deleting All Chats:", error);
    }
  };

  const handleEditClick = (chat) => {
    setEditingChat(chat);
    setEditTitle(chat.title || ""); // Set current title in input
    setIsEditing(true);
    document.getElementById("chatEdit_modal").showModal(); // Open the modal
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return alert("Title cannot be empty!");

    try {
      await editChatTitle({ id: editingChat.id, newTitle: editTitle }).unwrap();
      refetch();
      setIsEditing(false);
      document.getElementById("chatEdit_modal").close(); // Close the modal
    } catch (error) {
      console.error("Error Updating Title:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#e1e4ed]">
      <div className="w-full mx-auto">
        {isLoading && <p className="text-gray-500">Loading chat history...</p>}
        {error && <p className="text-red-500">Error loading chat history.</p>}

        <div className="flex items-start">
          <div className="basis-3/12 bg-[#431D5A] text-white p-4 shadow-md h-screen relative">
            <h2 className="text-2xl font-semibold mb-2">Chat History</h2>
            
            {data?.data?.length > 0 ? (
              <ul>
                {data.data.map((chat) => (
                  <li key={chat.id} className="flex justify-between items-center p-2 border-b last:border-none">
                    <span
                      onClick={() => handleClick(chat)}
                      className={`flex-grow cursor-pointer p-2 rounded-md ${
                        chat.id === selectedId
                          ? "bg-[#734a8d] text-white font-medium"
                          : "hover:bg-[#5a2c78] hover:text-white"
                      }`}
                    >
                      {chat.title || chat.id} {/* Show title if available, else chat ID */}
                    </span>

                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="m-1">
                        <BiDotsHorizontalRounded className="text-2xl" />
                      </div>
                      <ul tabIndex={0} className="dropdown-content border-none menu bg-black z-[50] w-28 shadow">
                        <div className="flex flex-col">
                          <button
                            onClick={() => handleEditClick(chat)}
                            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-500 rounded-md px-2 py-1"
                          >
                            <FaPencil className="text-base" />
                            <span className="text-sm font-medium">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(chat.id)}
                            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-500 rounded-md px-2 py-1"
                          >
                            <FaTrashAlt className="text-lg text-red-500 cursor-pointer" />
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

            <button
              onClick={handleAllDelete}
              className="absolute bottom-4 w-[200px] py-[5px] hover:bg-[#ee5d5d] flex items-center justify-center gap-2 left-4 mx-auto right-4 border-2 text-white rounded-full  shadow-md text-base font-semibold transition-all duration-200"
            >
              Delete History
              <FaTrashAlt className="text-lg text-white cursor-pointer" />
            </button>
          </div>

          <div className="basis-9/12 rounded-lg">{chatID && <ChatSection chatID={chatID} />}</div>
        </div>
      </div>

      {/* Daisy UI Modal for Editing Chat Title */}
      <dialog id="chatEdit_modal" className="modal text-black">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Chat Title</h3>
          <label className="block text-gray-600 text-sm font-semibold mb-1">Chat ID:</label>
          <input
            type="text"
            value={editingChat?.id || ""}
            readOnly
            className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
          />

          <label className="block text-gray-600 text-sm font-semibold mt-3">New Chat Title:</label>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="input input-bordered w-full mt-2"
            placeholder="Enter new chat title"
          />
          <div className="modal-action">
            <button className="btn btn-error" onClick={() => document.getElementById("chatEdit_modal").close()}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSaveEdit}>
              Save
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ChatHistory;

