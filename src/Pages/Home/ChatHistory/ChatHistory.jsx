
// import React, { useState, useEffect, useRef } from "react";

// import {
//   useChatHistoryQuery,
//   usePerticularChatDeleteMutation,
//   useDeleteAllChatsMutation,
// } from "../../redux/features/baseApi/baseApi";
// import { Link, useSearchParams } from "react-router-dom";
// import ChatSection from "./ChatSection";
// import { BiDotsHorizontalRounded } from "react-icons/bi";
// import { FaTrashAlt, FaBars } from "react-icons/fa";
// import { TbArrowBackUpDouble } from "react-icons/tb";
// import { FaPencil } from "react-icons/fa6";

// function ChatHistory() {
//   const { data, isLoading, error, refetch } = useChatHistoryQuery(undefined, {
//     pollingInterval: 5000, // Refetch every 5 seconds
//   });

//   const [perticularChatDelete] = usePerticularChatDeleteMutation();
//   const [deleteAllChats] = useDeleteAllChatsMutation();

//   const [searchParams, setSearchParams] = useSearchParams();
//   const selectedId = searchParams.get("id");

//   const [chatID, setChatId] = useState(undefined);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
//   const sidebarRef = useRef(null); // Ref for the sidebar

//   // Automatically select the latest chat when history is available
//   useEffect(() => {
//     if (data?.data?.length > 0 && !selectedId) {
//       const latestChat = data.data[data.data.length - 1];
//       setChatId(latestChat.id);
//       setSearchParams({ id: latestChat.id });
//     }
//   }, [data, selectedId, setSearchParams]);

//   // Close sidebar when clicking outside of it on mobile
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setIsSidebarOpen(false);
//       }
//     };

//     if (isSidebarOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isSidebarOpen]);

//   // Handle chat selection
//   const handleClick = (chat) => {
//     setSearchParams({ id: chat.id });
//     setChatId(chat.id);
//     setIsSidebarOpen(false); // Close sidebar on mobile after selecting a chat
//   };

//   // Handle deletion of a specific chat
//   const handleDelete = async (chatHistoryId) => {
//     try {
//       await perticularChatDelete(chatHistoryId).unwrap();
//       setChatId(undefined); // Clear selected chat
//       refetch(); // Refetch chat history
//     } catch (error) {
//       console.error("Error Deleting Chat:", error);
//     }
//   };

//   // Handle deletion of all chats
//   const handleAllDelete = async () => {
//     try {
//       await deleteAllChats().unwrap();
//       setChatId(undefined); // Clear selected chat
//       refetch(); // Refetch chat history
//     } catch (error) {
//       console.error("Error Deleting All Chats:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#e1e4ed] flex">
//       {/* Sidebar (Drawer on Mobile, Fixed on Desktop) */}
//       <div
//         ref={sidebarRef}
//         className={`fixed md:relative top-0 left-0 w-3/5 md:w-1/4 h-screen bg-[#431D5A] text-white md:p-4 p-2 shadow-md z-50 transition-transform duration-300 ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0`}
//         style={{ overflowY: "auto" }} // Ensures sidebar scrolls, not the page
//       >
//         {/* Sidebar Header */}
//         <div className="flex items-center justify-between mb-5 md:mb-10">
//           <h2 className="md:text-2xl font-semibold md:mb-2">Chat History</h2>
//           <Link to="/" className="">
//             <TbArrowBackUpDouble className="md:text-3xl text-2xl text-red-500 hover:bg-[#551d77] rounded-md" />
//           </Link>
//         </div>

//         {/* Chat List */}
//         {data?.data?.length > 0 ? (
//           <ul className="overflow-y-auto md:overflow-visible" style={{ maxHeight: "75vh" }}>
//             {data.data.map((chat) => (
//               <li key={chat.id} className="flex justify-between items-center md:p-2 p-1 border-b last:border-none">
//                 <span
//                   onClick={() => handleClick(chat)}
//                   className={`flex-grow cursor-pointer md:p-2 p-[3px] text-xs md:text-base rounded-sm ${
//                     chat.id === selectedId
//                       ? "bg-[#734a8d] text-white font-medium"
//                       : "hover:bg-[#5a2c78] hover:text-white"
//                   }`}
//                 >
//                   {chat.title || "Untitled Chat"}
//                 </span>
//                 <div className="dropdown dropdown-end">
//                   <div tabIndex={0} role="button" className="m-1">
//                     <BiDotsHorizontalRounded className="text-2xl" />
//                   </div>
//                   <ul tabIndex={0} className="dropdown-content border-none menu bg-black z-[50] w-28 shadow">
//                     <button
                      
//                       className="flex items-center space-x-2 mb-1 cursor-pointer hover:bg-gray-500 rounded-md px-2 py-1"
//                     >
//                       <FaPencil className="text-lg text-white cursor-pointer" />
//                       <span className="text-sm font-medium">Edit</span>
//                     </button>
//                     <button
//                       onClick={() => handleDelete(chat.id)}
//                       className="flex items-center space-x-2 cursor-pointer hover:bg-gray-500 rounded-md px-2 py-1"
//                     >
//                       <FaTrashAlt className="text-lg text-red-500 cursor-pointer" />
//                       <span className="text-sm font-medium">Delete</span>
//                     </button>
//                   </ul>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">No chat history available.</p>
//         )}

//         {/* Fixed Delete Button at Bottom */}
//         <div className="absolute bottom-4 left-4 right-4">
//           <button
//             onClick={handleAllDelete}
//             className="md:w-3/6 w-[150px] mx-auto md:py-2 p-[2px] bg-red-500 hover:bg-[#ee5d5d] flex items-center justify-center gap-2 md:border-2 border border-white text-white rounded-full shadow-md text-sm md:text-base md:font-semibold font-medium transition-all duration-200"
//           >
//             Delete History
//             <FaTrashAlt className="md:text-lg text-white cursor-pointer" />
//           </button>
//         </div>
//       </div>

//       {/* Chat Section (Full Width on Mobile, 3/4 Width on Desktop) */}
//       <div className="w-full md:w-3/4 h-screen">
//         {/* Mobile Sidebar Toggle Button */}
//         <button
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           className="md:hidden fixed top-4 left-4 z-40 p-2 bg-[#431D5A] text-white rounded-md shadow-md"
//         >
//           <FaBars className="text-2xl" />
//         </button>

//         {/* Render ChatSection if a chat is selected */}
//         {chatID && <ChatSection chatID={chatID} />}
//       </div>
//     </div>
//   );
// }

// export default ChatHistory;




// import React, { useState, useEffect, useRef } from "react";
// import {
//   useChatHistoryQuery,
//   usePerticularChatDeleteMutation,
//   useDeleteAllChatsMutation,
//   useEditChatTitleMutation,
// } from "../../redux/features/baseApi/baseApi";
// import { Link, useSearchParams } from "react-router-dom";
// import ChatSection from "./ChatSection";
// import { BiDotsHorizontalRounded } from "react-icons/bi";
// import { FaTrashAlt, FaBars } from "react-icons/fa";
// import { TbArrowBackUpDouble } from "react-icons/tb";
// import { FaPencil } from "react-icons/fa6";

// function ChatHistory() {
//   const { data, isLoading, error, refetch } = useChatHistoryQuery(undefined, {
//     pollingInterval: 5000, // Auto refetch every 5 seconds
//   });

//   const [perticularChatDelete] = usePerticularChatDeleteMutation();
//   const [deleteAllChats] = useDeleteAllChatsMutation();
//   const [editChatTitle] = useEditChatTitleMutation();

//   const [searchParams, setSearchParams] = useSearchParams();
//   const selectedId = searchParams.get("id");

//   const [chatID, setChatId] = useState(undefined);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const sidebarRef = useRef(null);

//   const [editingChatId, setEditingChatId] = useState(null); // Track which chat is being edited
//   const [newTitle, setNewTitle] = useState(""); // Store new title input

//   // Automatically select the latest chat when history is available
//   useEffect(() => {
//     if (data?.data?.length > 0 && !selectedId) {
//       const latestChat = data.data[data.data.length - 1];
//       setChatId(latestChat.id);
//       setSearchParams({ id: latestChat.id });
//     }
//   }, [data, selectedId, setSearchParams]);

//   // Close sidebar when clicking outside of it on mobile
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setIsSidebarOpen(false);
//       }
//     };

//     if (isSidebarOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isSidebarOpen]);

//   // Handle chat selection
//   const handleClick = (chat) => {
//     setSearchParams({ id: chat.id });
//     setChatId(chat.id);
//     setIsSidebarOpen(false);
//   };

//   // Handle deletion of a specific chat
//   const handleDelete = async (chatHistoryId) => {
//     try {
//       await perticularChatDelete(chatHistoryId).unwrap();
//       setChatId(undefined);
//       refetch();
//     } catch (error) {
//       console.error("Error Deleting Chat:", error);
//     }
//   };

//   // Handle deletion of all chats
//   const handleAllDelete = async () => {
//     try {
//       await deleteAllChats().unwrap();
//       setChatId(undefined);
//       refetch();
//     } catch (error) {
//       console.error("Error Deleting All Chats:", error);
//     }
//   };

//   // Handle Edit Click - Enable Editing Mode
//   const handleEditClick = (chat) => {
//     setEditingChatId(chat.id);
//     setNewTitle(chat.title || ""); // Set existing title in input
//   };

//   // Handle Saving the Edited Title
//   const handleSaveEdit = async (chatId) => {
//     if (!newTitle.trim()) return alert("Title cannot be empty!");

//     try {
//       await editChatTitle({ id: chatId, newTitle }).unwrap();
//       setEditingChatId(null); // Exit editing mode
//       refetch(); // Refresh chat history
//     } catch (error) {
//       console.error("Error Updating Title:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#e1e4ed] flex">
//       {/* Sidebar */}
//       <div
//         ref={sidebarRef}
//         className={`fixed md:relative top-0 left-0 w-3/5 md:w-1/4 h-screen bg-[#431D5A] text-white md:p-4 p-2 shadow-md z-50 transition-transform duration-300 ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0`}
//         style={{ overflowY: "auto" }}
//       >
//         {/* Sidebar Header */}
//         <div className="flex items-center justify-between mb-5 md:mb-10">
//           <h2 className="md:text-2xl font-semibold md:mb-2">Chat History</h2>
//           <Link to="/">
//             <TbArrowBackUpDouble className="md:text-3xl text-2xl text-red-500 hover:bg-[#551d77] rounded-md" />
//           </Link>
//         </div>

//         {/* Chat List */}
//         {data?.data?.length > 0 ? (
//           <ul className="overflow-y-auto md:overflow-visible" style={{ maxHeight: "75vh" }}>
//             {data.data.map((chat) => (
//               <li key={chat.id} className="flex justify-between items-center md:p-2 p-1 border-b last:border-none">
//                 {/* Editable Title */}
//                 {editingChatId === chat.id ? (
//                   <input
//                     type="text"
//                     value={newTitle}
//                     onChange={(e) => setNewTitle(e.target.value)}
//                     onBlur={() => handleSaveEdit(chat.id)} // Save on blur
//                     onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(chat.id)} // Save on Enter
//                     className="bg-white text-black px-2 py-1 rounded-md w-full"
//                     autoFocus
//                   />
//                 ) : (
//                   <span
//                     onClick={() => handleClick(chat)}
//                     className={`flex-grow cursor-pointer md:p-2 p-[3px] text-xs md:text-base rounded-sm ${
//                       chat.id === selectedId
//                         ? "bg-[#734a8d] text-white font-medium"
//                         : "hover:bg-[#5a2c78] hover:text-white"
//                     }`}
//                   >
//                     {chat.title || "Untitled Chat"}
//                   </span>
//                 )}

//                 <div className="dropdown dropdown-end">
//                   <div tabIndex={0} role="button" className="m-1">
//                     <BiDotsHorizontalRounded className="text-2xl" />
//                   </div>
//                   <ul tabIndex={0} className="dropdown-content border-none menu bg-black z-[50] w-28 shadow md:mt-3">
//                     <button
//                       onClick={() => handleEditClick(chat)}
//                       className="flex items-center space-x-2 mb-1 cursor-pointer hover:bg-gray-500 rounded-md px-2 py-1"
//                     >
//                       <FaPencil className="text-lg text-white cursor-pointer" />
//                       <span className="text-sm font-medium">Edit</span>
//                     </button>
//                     <button
//                       onClick={() => handleDelete(chat.id)}
//                       className="flex items-center space-x-2 cursor-pointer hover:bg-gray-500 rounded-md px-2 py-1"
//                     >
//                       <FaTrashAlt className="text-lg text-red-500 cursor-pointer" />
//                       <span className="text-sm font-medium">Delete</span>
//                     </button>
//                   </ul>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">No chat history available.</p>
//         )}
//       </div>

//       {/* Chat Section */}
//       <div className="w-full md:w-3/4 h-screen">{chatID && <ChatSection chatID={chatID} />}</div>
//     </div>
//   );
// }

// export default ChatHistory;






import React, { useState, useEffect, useRef } from "react";
import {
  useChatHistoryQuery,
  usePerticularChatDeleteMutation,
  useDeleteAllChatsMutation,
  useEditChatTitleMutation, // Import the editChatTitle mutation
} from "../../redux/features/baseApi/baseApi";
import { Link, useSearchParams } from "react-router-dom";
import ChatSection from "./ChatSection";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaTrashAlt, FaBars } from "react-icons/fa";
import { TbArrowBackUpDouble } from "react-icons/tb";
import { FaPencil } from "react-icons/fa6";

function ChatHistory() {
  const { data, isLoading, error, refetch } = useChatHistoryQuery(undefined, {
    pollingInterval: 5000, // Refetch every 5 seconds
  });

  const [perticularChatDelete] = usePerticularChatDeleteMutation();
  const [deleteAllChats] = useDeleteAllChatsMutation();
  const [editChatTitle] = useEditChatTitleMutation(); // Use the editChatTitle mutation

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("id");

  const [chatID, setChatId] = useState(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
  const sidebarRef = useRef(null); // Ref for the sidebar
  const [editingChatId, setEditingChatId] = useState(null); // State to manage which chat is being edited
  const [newTitle, setNewTitle] = useState(""); // State to manage the new title

  // Automatically select the latest chat when history is available
  useEffect(() => {
    if (data?.data?.length > 0 && !selectedId) {
      const latestChat = data.data[data.data.length - 1];
      setChatId(latestChat.id);
      setSearchParams({ id: latestChat.id });
    }
  }, [data, selectedId, setSearchParams]);

  // Close sidebar when clicking outside of it on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Handle chat selection
  const handleClick = (chat) => {
    setSearchParams({ id: chat.id });
    setChatId(chat.id);
    setIsSidebarOpen(false); // Close sidebar on mobile after selecting a chat
  };

  // Handle deletion of a specific chat
  const handleDelete = async (chatHistoryId) => {
    try {
      await perticularChatDelete(chatHistoryId).unwrap();
      setChatId(undefined); // Clear selected chat
      refetch(); // Refetch chat history
    } catch (error) {
      console.error("Error Deleting Chat:", error);
    }
  };

  // Handle deletion of all chats
  const handleAllDelete = async () => {
    try {
      await deleteAllChats().unwrap();
      setChatId(undefined); // Clear selected chat
      refetch(); // Refetch chat history
    } catch (error) {
      console.error("Error Deleting All Chats:", error);
    }
  };

  // Handle edit button click
  const handleEditClick = (chatId, currentTitle) => {
    setEditingChatId(chatId);
    setNewTitle(currentTitle);
  };

  // Handle title change
  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  // Handle title submit
  const handleTitleSubmit = async (chatId) => {
    try {
      await editChatTitle({ id: chatId, newTitle }).unwrap();
      setEditingChatId(null); // Exit editing mode
      refetch(); // Refetch chat history to update the UI
    } catch (error) {
      console.error("Error Updating Chat Title:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#e1e4ed] flex">
      {/* Sidebar (Drawer on Mobile, Fixed on Desktop) */}
      <div
        ref={sidebarRef}
        className={`fixed md:relative top-0 left-0 w-3/5 md:w-1/4 h-screen bg-[#431D5A] text-white md:p-4 p-2 shadow-md z-50 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ overflowY: "auto" }} // Ensures sidebar scrolls, not the page
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-5 md:mb-10">
          <h2 className="md:text-2xl font-semibold md:mb-2">Chat History</h2>
          <Link to="/" className="">
            <TbArrowBackUpDouble className="md:text-3xl text-2xl text-red-500 hover:bg-[#551d77] rounded-md" />
          </Link>
        </div>

        {/* Chat List */}
        {data?.data?.length > 0 ? (
          <ul className="overflow-y-auto md:overflow-visible" style={{ maxHeight: "75vh" }}>
            {data.data.map((chat) => (
              <li key={chat.id} className="flex justify-between items-center md:p-2 p-1 border-b last:border-none">
                {editingChatId === chat.id ? (
                  <input
                    type="text"
                    value={newTitle}
                    onChange={handleTitleChange}
                    onBlur={() => handleTitleSubmit(chat.id)}
                    onKeyPress={(e) => e.key === "Enter" && handleTitleSubmit(chat.id)}
                    className="flex-grow p-2 text-xs md:text-base rounded-sm bg-[#734a8d] text-white"
                    autoFocus
                  />
                ) : (
                  <span
                    onClick={() => handleClick(chat)}
                    className={`flex-grow cursor-pointer md:p-2 p-[3px] text-xs md:text-base rounded-sm ${
                      chat.id === selectedId
                        ? "bg-[#734a8d] text-white font-medium"
                        : "hover:bg-[#5a2c78] hover:text-white"
                    }`}
                  >
                    {chat.title || "Untitled Chat"}
                  </span>
                )}
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="m-1">
                    <BiDotsHorizontalRounded className="text-2xl" />
                  </div>
                  <ul tabIndex={0} className="dropdown-content border-none menu bg-black z-[50] w-28 shadow">
                    <button
                      onClick={() => handleEditClick(chat.id, chat.title)}
                      className="flex items-center space-x-2 mb-1 cursor-pointer hover:bg-gray-500 rounded-md px-2 py-1"
                    >
                      <FaPencil className="text-lg text-white cursor-pointer" />
                      <span className="text-sm font-medium">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(chat.id)}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-gray-500 rounded-md px-2 py-1"
                    >
                      <FaTrashAlt className="text-lg text-red-500 cursor-pointer" />
                      <span className="text-sm font-medium">Delete</span>
                    </button>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No chat history available.</p>
        )}

        {/* Fixed Delete Button at Bottom */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleAllDelete}
            className="md:w-3/6 w-[150px] mx-auto md:py-2 p-[2px] bg-red-500 hover:bg-[#ee5d5d] flex items-center justify-center gap-2 md:border-2 border border-white text-white rounded-full shadow-md text-sm md:text-base md:font-semibold font-medium transition-all duration-200"
          >
            Delete History
            <FaTrashAlt className="md:text-lg text-white cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Chat Section (Full Width on Mobile, 3/4 Width on Desktop) */}
      <div className="w-full md:w-3/4 h-screen">
        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden fixed top-4 left-4 z-40 p-2 bg-[#431D5A] text-white rounded-md shadow-md"
        >
          <FaBars className="text-xl" />
        </button>

        {/* Render ChatSection if a chat is selected */}
        {chatID && <ChatSection chatID={chatID} />}
      </div>
    </div>
  );
}

export default ChatHistory;