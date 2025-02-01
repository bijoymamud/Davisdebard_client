// import React, { useState } from "react";
// import { useChatHistoryQuery, usePerticularChatDeleteMutation, useEditChatTitleMutation, useDeleteAllChatsMutation } from "../../redux/features/baseApi/baseApi";
// import { useSearchParams } from "react-router-dom";
// import ChatSection from "./ChatSection";
// import { BiDotsHorizontalRounded } from "react-icons/bi";
// import { FaTrashAlt } from "react-icons/fa";
// import { FaPencil } from "react-icons/fa6";

// function ChatHistory() {
//   const { data, isLoading, error, refetch } = useChatHistoryQuery();
//   const [perticularChatDelete] = usePerticularChatDeleteMutation();
//   const [editChatTitle] = useEditChatTitleMutation();
//   const [deleteAllChats] = useDeleteAllChatsMutation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const selectedId = searchParams.get("id");
//   const [chatID, setChatId] = useState(undefined);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editTitle, setEditTitle] = useState("");
//   const [editingChat, setEditingChat] = useState(null);

//   const handleClick = (chat) => {
//     setSearchParams({ id: chat.id });
//     setChatId(chat.id);
//   };




//   const handleDelete = async (chatHistoryId) => {
   

//     try {
//       await perticularChatDelete(chatHistoryId).unwrap();
//       setChatId(undefined);
//       refetch();
//     } catch (error) {
//       console.error("Error Deleting Chat:", error);
//     }
//   };

//   const handleAllDelete = async () => {
  
//     try {
//       await deleteAllChats().unwrap();
//       refetch();
//     } catch (error) {
//       console.error("Error Deleting All Chats:", error);
//     }
//   };

//   const handleEditClick = (chat) => {
//     setEditingChat(chat);
//     setEditTitle(chat.title || ""); // Set current title in input
//     setIsEditing(true);
//     document.getElementById("chatEdit_modal").showModal(); // Open the modal
//   };

//   const handleSaveEdit = async () => {
//     if (!editTitle.trim()) return alert("Title cannot be empty!");

//     try {
//       await editChatTitle({ id: editingChat.id, newTitle: editTitle }).unwrap();
//       refetch();
//       setIsEditing(false);
//       document.getElementById("chatEdit_modal").close(); // Close the modal
//     } catch (error) {
//       console.error("Error Updating Title:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#e1e4ed]">
//       <div className="w-full mx-auto">
//         {isLoading && <p className="text-gray-500">Loading chat history...</p>}
//         {error && <p className="text-red-500">Error loading chat history.</p>}

//         <div className="flex items-start">
//           <div className="basis-3/12 bg-[#431D5A] text-white p-4 shadow-md h-screen relative">
//             <h2 className="text-2xl font-semibold mb-2">Chat History</h2>
            
//             {data?.data?.length > 0 ? (
//               <ul>
//                 {data.data.map((chat) => (
//                   <li key={chat.id} className="flex justify-between items-center p-2 border-b last:border-none">
//                     <span
//                       onClick={() => handleClick(chat)}
//                       className={`flex-grow cursor-pointer p-2 rounded-md ${
//                         chat.id === selectedId
//                           ? "bg-[#734a8d] text-white font-medium"
//                           : "hover:bg-[#5a2c78] hover:text-white"
//                       }`}
//                     >
//                       {chat.title || chat.id} {/* Show title if available, else chat ID */}
//                     </span>

//                     <div className="dropdown dropdown-end">
//                       <div tabIndex={0} role="button" className="m-1">
//                         <BiDotsHorizontalRounded className="text-2xl" />
//                       </div>
//                       <ul tabIndex={0} className="dropdown-content border-none menu bg-black z-[50] w-28 shadow">
//                         <div className="flex flex-col">
//                           <button
//                             onClick={() => handleEditClick(chat)}
//                             className="flex items-center space-x-2 cursor-pointer hover:bg-gray-500 rounded-md px-2 py-1"
//                           >
//                             <FaPencil className="text-base" />
//                             <span className="text-sm font-medium">Edit</span>
//                           </button>
//                           <button
//                             onClick={() => handleDelete(chat.id)}
//                             className="flex items-center space-x-2 cursor-pointer hover:bg-gray-500 rounded-md px-2 py-1"
//                           >
//                             <FaTrashAlt className="text-lg text-red-500 cursor-pointer" />
//                             <span className="text-sm font-medium">Delete</span>
//                           </button>
//                         </div>
//                       </ul>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-500">No chat history available.</p>
//             )}

//             <button
//               onClick={handleAllDelete}
//               className="absolute bottom-4 w-[200px] py-[5px] hover:bg-[#ee5d5d] flex items-center justify-center gap-2 left-4 mx-auto right-4 border-2 text-white rounded-full  shadow-md text-base font-semibold transition-all duration-200"
//             >
//               Delete History
//               <FaTrashAlt className="text-lg text-white cursor-pointer" />
//             </button>
//           </div>

//           <div className="basis-9/12 rounded-lg">{chatID && <ChatSection chatID={chatID} />}</div>
//         </div>
//       </div>

//       {/* Daisy UI Modal for Editing Chat Title */}
//       <dialog id="chatEdit_modal" className="modal text-black">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">Edit Chat Title</h3>
//           <label className="block text-gray-600 text-sm font-semibold mb-1">Chat ID:</label>
//           <input
//             type="text"
//             value={editingChat?.id || ""}
//             readOnly
//             className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
//           />

//           <label className="block text-gray-600 text-sm font-semibold mt-3">New Chat Title:</label>
//           <input
//             type="text"
//             value={editTitle}
//             onChange={(e) => setEditTitle(e.target.value)}
//             className="input input-bordered w-full mt-2"
//             placeholder="Enter new chat title"
//           />
//           <div className="modal-action">
//             <button className="btn btn-error" onClick={() => document.getElementById("chatEdit_modal").close()}>
//               Cancel
//             </button>
//             <button className="btn btn-success" onClick={handleSaveEdit}>
//               Save
//             </button>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// }

// export default ChatHistory;




// import React, { useState, useEffect } from "react";
// import { useChatHistoryQuery, usePerticularChatDeleteMutation, useEditChatTitleMutation, useDeleteAllChatsMutation } from "../../redux/features/baseApi/baseApi";
// import { useSearchParams } from "react-router-dom";
// import ChatSection from "./ChatSection";
// import { BiDotsHorizontalRounded } from "react-icons/bi";
// import { FaTrashAlt } from "react-icons/fa";
// import { FaPencil } from "react-icons/fa6";

// function ChatHistory() {
//   const { data, isLoading, error, refetch } = useChatHistoryQuery();
//   const [perticularChatDelete] = usePerticularChatDeleteMutation();
//   const [editChatTitle] = useEditChatTitleMutation();
//   const [deleteAllChats] = useDeleteAllChatsMutation();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const selectedId = searchParams.get("id");
//   const [chatID, setChatId] = useState(undefined);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editTitle, setEditTitle] = useState("");
//   const [editingChat, setEditingChat] = useState(null);

//   // ✅ Automatically select the latest chat when history is available
//   useEffect(() => {
//     if (data?.data?.length > 0 && !selectedId) {
//       const latestChat = data.data[data.data.length - 1]; // Get the most recent chat
//       setChatId(latestChat.id);
//       setSearchParams({ id: latestChat.id });
//     }
//   }, [data, selectedId, setSearchParams]);

//   const handleClick = (chat) => {
//     setSearchParams({ id: chat.id });
//     setChatId(chat.id);
//   };

//   const handleDelete = async (chatHistoryId) => {
//     try {
//       await perticularChatDelete(chatHistoryId).unwrap();
//       setChatId(undefined);
//       refetch();
//     } catch (error) {
//       console.error("Error Deleting Chat:", error);
//     }
//   };

//   const handleAllDelete = async () => {
//     try {
//       await deleteAllChats().unwrap();
//       setChatId(undefined);
//       refetch();
//     } catch (error) {
//       console.error("Error Deleting All Chats:", error);
//     }
//   };

//   const handleEditClick = (chat) => {
//     setEditingChat(chat);
//     setEditTitle(chat.title || ""); // Set current title in input
//     setIsEditing(true);
//     document.getElementById("chatEdit_modal").showModal(); // Open the modal
//   };

//   const handleSaveEdit = async () => {
//     if (!editTitle.trim()) return alert("Title cannot be empty!");

//     try {
//       await editChatTitle({ id: editingChat.id, newTitle: editTitle }).unwrap();
//       refetch();
//       setIsEditing(false);
//       document.getElementById("chatEdit_modal").close(); // Close the modal
//     } catch (error) {
//       console.error("Error Updating Title:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#e1e4ed]">
//       <div className="w-full mx-auto">
//         {isLoading && <p className="text-gray-500">Loading chat history...</p>}
//         {error && <p className="text-red-500">Error loading chat history.</p>}

//         <div className="flex items-start">
//           <div className="basis-3/12 bg-[#431D5A] text-white p-4 shadow-md h-screen relative">
//             <h2 className="text-2xl font-semibold mb-2">Chat History</h2>

//             {data?.data?.length > 0 ? (
//               <ul>
//                 {data.data.map((chat) => (
//                   <li key={chat.id} className="flex justify-between items-center p-2 border-b last:border-none">
//                     <span
//                       onClick={() => handleClick(chat)}
//                       className={`flex-grow cursor-pointer p-2 rounded-md ${
//                         chat.id === selectedId
//                           ? "bg-[#734a8d] text-white font-medium"
//                           : "hover:bg-[#5a2c78] hover:text-white"
//                       }`}
//                     >
//                       {chat.title || chat.id} {/* Show title if available, else chat ID */}
//                     </span>

//                     <div className="dropdown dropdown-end">
//                       <div tabIndex={0} role="button" className="m-1">
//                         <BiDotsHorizontalRounded className="text-2xl" />
//                       </div>
//                       <ul tabIndex={0} className="dropdown-content border-none menu bg-black z-[50] w-28 shadow">
//                         <div className="flex flex-col">
//                           <button
//                             onClick={() => handleEditClick(chat)}
//                             className="flex items-center space-x-2 cursor-pointer hover:bg-gray-500 rounded-md px-2 py-1"
//                           >
//                             <FaPencil className="text-base" />
//                             <span className="text-sm font-medium">Edit</span>
//                           </button>
//                           <button
//                             onClick={() => handleDelete(chat.id)}
//                             className="flex items-center space-x-2 cursor-pointer hover:bg-gray-500 rounded-md px-2 py-1"
//                           >
//                             <FaTrashAlt className="text-lg text-red-500 cursor-pointer" />
//                             <span className="text-sm font-medium">Delete</span>
//                           </button>
//                         </div>
//                       </ul>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-500">No chat history available.</p>
//             )}

//             <button
//               onClick={handleAllDelete}
//               className="absolute bottom-4 w-[200px] py-[5px] hover:bg-[#ee5d5d] flex items-center justify-center gap-2 left-4 mx-auto right-4 border-2 text-white rounded-full shadow-md text-base font-semibold transition-all duration-200"
//             >
//               Delete History
//               <FaTrashAlt className="text-lg text-white cursor-pointer" />
//             </button>
//           </div>

//           {/* ✅ Automatically Show Latest Chat */}
//           <div className="basis-9/12 rounded-lg">
//             {chatID && <ChatSection chatID={chatID} />}
//           </div>
//         </div>
//       </div>

//       {/* Daisy UI Modal for Editing Chat Title */}
//       <dialog id="chatEdit_modal" className="modal text-black">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">Edit Chat Title</h3>
//           {/* <label className="block text-gray-600 text-sm font-semibold mb-1">Chat ID:</label>
//           <input
//             type="text"
//             value={editingChat?.id || ""}
//             readOnly
//             className="input input-bordered w-full bg-gray-200 cursor-not-allowed"
//           /> */}

//           <label className="block text-gray-600 text-sm font-semibold mt-3">New Chat Title:</label>
//           <input
//             type="text"
//             value={editTitle}
//             onChange={(e) => setEditTitle(e.target.value)}
//             className="input input-bordered w-full mt-2"
//             placeholder="Enter new chat title"
//           />
//           <div className="modal-action">
//             <button className="btn btn-error" onClick={() => document.getElementById("chatEdit_modal").close()}>
//               Cancel
//             </button>
//             <button className="btn btn-success" onClick={handleSaveEdit}>
//               Save
//             </button>
//           </div>
//         </div>
//       </dialog>
//     </div>
//   );
// }

// export default ChatHistory;





import React, { useState, useEffect } from "react";
import { useChatHistoryQuery, usePerticularChatDeleteMutation, useEditChatTitleMutation, useDeleteAllChatsMutation } from "../../redux/features/baseApi/baseApi";
import { useSearchParams } from "react-router-dom";
import ChatSection from "./ChatSection";
import { BiDotsHorizontalRounded, BiMenu, BiX } from "react-icons/bi";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (data?.data?.length > 0 && !selectedId) {
      const latestChat = data.data[data.data.length - 1];
      setChatId(latestChat.id);
      setSearchParams({ id: latestChat.id });
    }
  }, [data, selectedId, setSearchParams]);

  const handleClick = (chat) => {
    setSearchParams({ id: chat.id });
    setChatId(chat.id);
    setIsSidebarOpen(false); // Close sidebar on mobile
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
      setChatId(undefined);
      refetch();
    } catch (error) {
      console.error("Error Deleting All Chats:", error);
    }
  };

  const handleEditClick = (chat) => {
    setEditingChat(chat);
    setEditTitle(chat.title || "");
    setIsEditing(true);
    document.getElementById("chatEdit_modal").showModal();
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return alert("Title cannot be empty!");

    try {
      await editChatTitle({ id: editingChat.id, newTitle: editTitle }).unwrap();
      refetch();
      setIsEditing(false);
      document.getElementById("chatEdit_modal").close();
    } catch (error) {
      console.error("Error Updating Title:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#e1e4ed]">
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden text-3xl absolute  left-3 text-gray-700 z-50"
      >
        {isSidebarOpen ? <BiX /> : <BiMenu />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#431D5A] text-white p-4 shadow-md transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-1/4 transition-transform duration-300 ease-in-out`}
      >
        <h2 className="text-2xl font-semibold mb-4">Chat History</h2>

        {isLoading && <p className="text-gray-500">Loading chat history...</p>}
        {error && <p className="text-red-500">Error loading chat history.</p>}

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
                  {chat.title || chat.id}
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
          className="absolute bottom-4 w-full py-2 hover:bg-[#ee5d5d] flex items-center justify-center gap-2 text-white rounded-md text-base font-semibold transition-all duration-200"
        >
          Delete History
          <FaTrashAlt className="text-lg text-white cursor-pointer" />
        </button>
      </div>

      {/* Chat Section */}
      <div className="flex-1 p-4 overflow-hidden">
        {chatID ? <ChatSection chatID={chatID} /> : <p className="text-center text-gray-500">Select a chat to start</p>}
      </div>

      {/* Edit Chat Title Modal */}
      <dialog id="chatEdit_modal" className="modal text-black">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Chat Title</h3>
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
