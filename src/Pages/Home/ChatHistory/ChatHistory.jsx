



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
//     pollingInterval: 5000, // Refetch every 5 seconds
//   });

//   const [perticularChatDelete] = usePerticularChatDeleteMutation();
//   const [deleteAllChats] = useDeleteAllChatsMutation();
//   const [editChatTitle] = useEditChatTitleMutation();

//   const [searchParams, setSearchParams] = useSearchParams();
//   const selectedId = searchParams.get("id");

//   const [chatID, setChatId] = useState(undefined);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const sidebarRef = useRef(null);
//   const [editingChatId, setEditingChatId] = useState(null);
//   const [newTitle, setNewTitle] = useState("");
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to manage modal visibility

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
//     } finally {
//       setIsDeleteModalOpen(false); // Close the modal after deletion
//     }
//   };

//   // Handle edit button click
//   const handleEditClick = (chatId, currentTitle) => {
//     setEditingChatId(chatId);
//     setNewTitle(currentTitle);
//   };

//   // Handle title change
//   const handleTitleChange = (e) => {
//     setNewTitle(e.target.value);
//   };

//   // Handle title submit
//   const handleTitleSubmit = async (chatId) => {
//     try {
//       await editChatTitle({ id: chatId, newTitle }).unwrap();
//       setEditingChatId(null);
//       refetch();
//     } catch (error) {
//       console.error("Error Updating Chat Title:", error);
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
//         style={{ overflowY: "auto" }}
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
//                 {editingChatId === chat.id ? (
//                   <input
//                     type="text"
//                     value={newTitle}
//                     onChange={handleTitleChange}
//                     onBlur={() => handleTitleSubmit(chat.id)}
//                     onKeyPress={(e) => e.key === "Enter" && handleTitleSubmit(chat.id)}
//                     className="flex-grow p-2 text-xs md:text-base rounded-sm bg-[#734a8d] text-white"
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
//                   <ul tabIndex={0} className="dropdown-content border-none menu bg-black z-[50] w-28 shadow">
//                     <button
//                       onClick={() => handleEditClick(chat.id, chat.title)}
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
//             onClick={() => setIsDeleteModalOpen(true)} // Open the modal
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
//           <FaBars className="text-xl" />
//         </button>

//         {/* Render ChatSection if a chat is selected */}
//         {chatID && <ChatSection chatID={chatID} />}
//       </div>

//       {/* DaisyUI Modal for Delete Confirmation */}
//       {isDeleteModalOpen && (
//        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//        <div className="bg-white p-6 rounded-lg shadow-lg md:w-[600px] px-1 text-center">
//          <div className="flex justify-center">
//            <div className="w-14 h-14 flex items-center justify-center bg-red-100 rounded-full">
//              <svg
//                xmlns="http://www.w3.org/2000/svg"
//                fill="none"
//                viewBox="0 0 24 24"
//                strokeWidth={2}
//                stroke="red"
//                className="w-10 h-10"
//              >
//                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//              </svg>
//            </div>
//          </div>
//          <h3 className="md:text-2xl text-lg text-red-600 font-medium md:font-semibold mt-4">Are you sure?</h3>
//          <p className="text-gray-600 mt-2 text-base">
//            Do you really want to delete these records? 
//          </p>
//          <p className="text-gray-600">
//          This process cannot be undone.
//          </p>
//          <div className="flex justify-center space-x-4 mt-6">
//            <button
//              onClick={() => setIsDeleteModalOpen(false)}
//              className="px-4 py-2 bg-gray-300 font-medium text-gray-800 rounded-md hover:bg-gray-400 transition"
//            >
//              Cancel
//            </button>
//            <button
//              onClick={handleAllDelete}
//              className="px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition"
//            >
//              Delete
//            </button>
//          </div>
//        </div>
//      </div>
     
//       )}
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
//     pollingInterval: 5000, // Refetch every 5 seconds
//   });

//   const [perticularChatDelete] = usePerticularChatDeleteMutation();
//   const [deleteAllChats] = useDeleteAllChatsMutation();
//   const [editChatTitle] = useEditChatTitleMutation();

//   const [searchParams, setSearchParams] = useSearchParams();
//   const selectedId = searchParams.get("id");

//   const [chatID, setChatId] = useState(undefined);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const sidebarRef = useRef(null);
//   const [editingChatId, setEditingChatId] = useState(null);
//   const [newTitle, setNewTitle] = useState("");
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to manage modal visibility

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
//     } finally {
//       setIsDeleteModalOpen(false); // Close the modal after deletion
//     }
//   };

//   // Handle edit button click
//   const handleEditClick = (chatId, currentTitle) => {
//     setEditingChatId(chatId);
//     setNewTitle(currentTitle);
//   };

//   // Handle title change
//   const handleTitleChange = (e) => {
//     setNewTitle(e.target.value);
//   };

//   // Handle title submit
//   const handleTitleSubmit = async (chatId) => {
//     try {
//       await editChatTitle({ id: chatId, newTitle }).unwrap();
//       setEditingChatId(null);
//       refetch();
//     } catch (error) {
//       console.error("Error Updating Chat Title:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#e1e4ed] flex">
//       {/* Sidebar (Drawer on Mobile, Fixed on Desktop) */}
//       <div
//         ref={sidebarRef}
//         className={`fixed md:relative top-0 left-0 w-4/6 md:w-1/4 h-screen bg-[#431D5A] text-white md:p-4 p-2 shadow-md z-50 transition-transform duration-300 ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0`}
//         style={{ overflowY: "auto" }}
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
//                 {editingChatId === chat.id ? (
//                   <input
//                     type="text"
//                     value={newTitle}
//                     onChange={handleTitleChange}
//                     onBlur={() => handleTitleSubmit(chat.id)}
//                     onKeyPress={(e) => e.key === "Enter" && handleTitleSubmit(chat.id)}
//                     className="flex-grow p-2 text-xs md:text-base rounded-sm bg-[#734a8d] text-white"
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

//                 {/* Mobile Buttons (Edit and Delete) */}
//                 <div className="md:hidden ms-5 flex items-center justify-end gap-2">
//                   <button
//                     onClick={() => handleEditClick(chat.id, chat.title)}
//                     className=" text-white hover:bg-[#5a2c78] rounded-md"
//                   >
//                     <FaPencil className="text-sm" />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(chat.id)}
//                     className=" text-red-500 hover:bg-[#5a2c78] rounded-md"
//                   >
//                     <FaTrashAlt className="text-sm" />
//                   </button>
//                 </div>

//                 {/* Dropdown for Larger Screens */}
//                 <div className="hidden md:block dropdown dropdown-end">
//                   <div tabIndex={0} role="button" className="m-1">
//                     <BiDotsHorizontalRounded className="text-2xl" />
//                   </div>
//                   <ul tabIndex={0} className="dropdown-content border-none menu bg-black z-[50] w-28 shadow">
//                     <button
//                       onClick={() => handleEditClick(chat.id, chat.title)}
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
//             onClick={() => setIsDeleteModalOpen(true)} // Open the modal
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
//           <FaBars className="text-xl" />
//         </button>

//         {/* Render ChatSection if a chat is selected */}
//         {chatID && <ChatSection chatID={chatID} />}
//       </div>

//       {/* DaisyUI Modal for Delete Confirmation */}
//       {isDeleteModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg md:w-[600px] px-1 text-center">
//             <div className="flex justify-center">
//               <div className="w-14 h-14 flex items-center justify-center bg-red-100 rounded-full">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={2}
//                   stroke="red"
//                   className="w-10 h-10"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </div>
//             </div>
//             <h3 className="md:text-2xl text-lg text-red-600 font-medium md:font-semibold mt-4">Are you sure?</h3>
//             <p className="text-gray-600 mt-2 text-base">
//               Do you really want to delete these records?
//             </p>
//             <p className="text-gray-600">This process cannot be undone.</p>
//             <div className="flex justify-center space-x-4 mt-6">
//               <button
//                 onClick={() => setIsDeleteModalOpen(false)}
//                 className="px-4 py-2 bg-gray-300 font-medium text-gray-800 rounded-md hover:bg-gray-400 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAllDelete}
//                 className="px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChatHistory;




import React, { useState, useEffect, useRef } from "react";
import {
  useChatHistoryQuery,
  usePerticularChatDeleteMutation,
  useDeleteAllChatsMutation,
  useEditChatTitleMutation,
} from "../../redux/features/baseApi/baseApi";
import { Link, useSearchParams } from "react-router-dom";
import ChatSection from "./ChatSection";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaTrashAlt, FaBars, FaRegEdit } from "react-icons/fa";
import { TbArrowBackUpDouble } from "react-icons/tb";
import { FaPencil } from "react-icons/fa6";
import { AiOutlineSelect } from "react-icons/ai";

function ChatHistory() {
  const { data, isLoading, error, refetch } = useChatHistoryQuery(undefined, {
    pollingInterval: 5000, // Refetch every 5 seconds
  });

  const [perticularChatDelete] = usePerticularChatDeleteMutation();
  const [deleteAllChats] = useDeleteAllChatsMutation();
  const [editChatTitle] = useEditChatTitleMutation();

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("id");

  const [chatID, setChatId] = useState(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [editingChatId, setEditingChatId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to manage modal visibility

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
    setIsSidebarOpen(false);
  };

  // Handle deletion of a specific chat
  const handleDelete = async (chatHistoryId) => {
    try {
      await perticularChatDelete(chatHistoryId).unwrap();
      setChatId(undefined);
      refetch();
    } catch (error) {
      console.error("Error Deleting Chat:", error);
    }
  };

  // Handle deletion of all chats
  const handleAllDelete = async () => {
    try {
      await deleteAllChats().unwrap();
      setChatId(undefined);
      refetch();
    } catch (error) {
      console.error("Error Deleting All Chats:", error);
    } finally {
      setIsDeleteModalOpen(false); // Close the modal after deletion
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
      setEditingChatId(null);
      refetch();
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
        style={{ overflowY: "auto" }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-5 md:mb-10">
          <h2 className="md:text-2xl font-semibold md:mb-2">Chat History</h2>
          <div className="bg-[#7e23b6] md:p-[3px] p-[1px] md:shadow-md shadow-sm hover:bg-[#7629a7] shadow-black rounded-tl-md rounded-br-md">
          <Link to="/" className="">
            <AiOutlineSelect className="md:text-xl text-xl font-bold text-gray-200  rounded-md" />
          </Link>
          </div>
        </div>

        {/* Chat List */}
        {data?.data?.length > 0 ? (
          <ul className="overflow-y-auto h-full md:overflow-visible" style={{ maxHeight: "75vh" }}>
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

                {/* Mobile Dropdown (Three Dots) */}
                <div className="md:hidden dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="m-1">
                    <BiDotsHorizontalRounded className="text-2xl" />
                  </div>
                  <ul tabIndex={0} className="dropdown-content border-none menu bg-[#48225f] z-[50] w-32 shadow-sm border-2 shadow-black/50 mt-2">
                  <button
                      onClick={() => handleEditClick(chat.id, chat.title)}
                      className="flex items-center space-x-2 mb-1 cursor-pointer hover:bg-[#734a8d] rounded-sm px-2 py-1"
                    >
                      <FaRegEdit  className="text-lg text-white cursor-pointer" />
                      <span className="text-sm font-medium">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(chat.id)}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-[#734a8d] rounded-sm px-2 py-1"
                    >
                      <FaTrashAlt className="text-lg text-red-500 cursor-pointer" />
                      <span className="text-sm font-medium">Delete</span>
                    </button>
                  </ul>
                </div>

                {/* Dropdown for Larger Screens */}
                <div className="hidden md:block dropdown dropdown-end ">
                  <div tabIndex={0} role="button" className="m-1">
                    <BiDotsHorizontalRounded className="text-2xl" />
                  </div>
                  <ul tabIndex={0} className="dropdown-content border-none menu bg-[#48225f] z-[50] w-28 shadow-sm border-2 shadow-black/50 mt-2">
                    <button
                      onClick={() => handleEditClick(chat.id, chat.title)}
                      className="flex items-center space-x-2 mb-1 cursor-pointer hover:bg-[#734a8d] rounded-sm px-2 py-1"
                    >
                      <FaRegEdit  className="text-lg text-white cursor-pointer" />
                      <span className="text-sm font-medium">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(chat.id)}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-[#734a8d] rounded-sm px-2 py-1"
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
            onClick={() => setIsDeleteModalOpen(true)} // Open the modal
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

      {/* DaisyUI Modal for Delete Confirmation */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg md:w-[600px] px-1 text-center">
            <div className="flex justify-center">
              <div className="w-14 h-14 flex items-center justify-center bg-red-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="red"
                  className="w-10 h-10"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h3 className="md:text-2xl text-lg text-red-600 font-medium md:font-semibold mt-4">Are you sure?</h3>
            <p className="text-gray-600 mt-2 text-base">
              Do you really want to delete these records?
            </p>
            <p className="text-gray-600">This process cannot be undone.</p>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 font-medium text-gray-800 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAllDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatHistory;