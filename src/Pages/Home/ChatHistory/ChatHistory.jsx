

import { useState, useEffect, useRef } from "react";
import {
  useChatHistoryQuery,
  usePerticularChatDeleteMutation,
  useDeleteAllChatsMutation,
  useEditChatTitleMutation,
} from "../../redux/features/baseApi/baseApi";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import ChatSection from "./ChatSection";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaTrashAlt, FaRegEdit, FaHome } from "react-icons/fa";
import { AiTwotoneDiff } from "react-icons/ai";
import { GoSidebarCollapse } from "react-icons/go";
import { RiSidebarUnfoldFill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";

function ChatHistory() {
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = location.state?.from || "/";

  const { data, isLoading, error, refetch } = useChatHistoryQuery(undefined, {
    pollingInterval: 5000,
  });

  const [perticularChatDelete] = usePerticularChatDeleteMutation();
  const [deleteAllChats] = useDeleteAllChatsMutation();
  const [editChatTitle] = useEditChatTitleMutation();

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("id");

  const [chatID, setChatId] = useState(selectedId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [editingChatId, setEditingChatId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Set the latest chat as selected if no chat is selected
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
  const handleChatClick = (chat) => {
    setSearchParams({ id: chat.id });
    setChatId(chat.id);
    setIsSidebarOpen(false);
  };

  // Handle chat deletion
  const handleChatDelete = async (chatHistoryId) => {
    try {
      await perticularChatDelete(chatHistoryId).unwrap();
      setChatId(undefined);
      refetch();
    } catch (error) {
      console.error("Error Deleting Chat:", error);
    }
  };

  // Handle all chats deletion
  const handleAllChatsDelete = async () => {
    try {
      await deleteAllChats().unwrap();
      setChatId(undefined);
      refetch();
    } catch (error) {
      console.error("Error Deleting All Chats:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  // Handle chat title edit
  const handleEditClick = (chatId, currentTitle) => {
    setEditingChatId(chatId);
    setNewTitle(currentTitle);
  };

  // Handle chat title update
  const handleTitleSubmit = async (chatId) => {
    try {
      await editChatTitle({ id: chatId, newTitle }).unwrap();
      setEditingChatId(null);
      refetch();
    } catch (error) {
      console.error("Error Updating Chat Title:", error);
    }
  };

  // Handle Resume Chat
  const handleResumeChat = async (chatHistoryId) => {
    navigate(`/chat/${chatHistoryId}?ai=google`);
  };

  return (
    <div className="min-h-screen bg-[#e1e4ed] flex">
      {/* Sidebar (Fixed Width, Scrollable) */}
      <div
        ref={sidebarRef}
        className={`fixed md:relative top-0 left-0 w-3/5 md:w-[280px] h-screen bg-[#431D5A] text-white md:p-4 p-2 shadow-md z-50 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-5 md:mb-6">
          <h2 className="md:text-2xl font-semibold">Chat History</h2>
        </div>

        {/* Chat List with Scrollbar */}
        {data?.data?.length > 0 ? (
          <ul className="h-[70vh] overflow-y-auto">
            {data.data.map((chat) => (
              <li key={chat.id} className="flex justify-between items-center p-2 border-b last:border-none">
                {editingChatId === chat.id ? (
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onBlur={() => handleTitleSubmit(chat.id)}
                    onKeyPress={(e) => e.key === "Enter" && handleTitleSubmit(chat.id)}
                    className="flex-grow p-2 text-xs md:text-base rounded-sm bg-[#734a8d] text-white"
                    autoFocus
                  />
                ) : (
                  <span
                    onClick={() => handleChatClick(chat)}
                    className={`flex-grow cursor-pointer p-2 text-xs md:text-[14px] rounded-sm ${
                      chat.id === selectedId
                        ? "bg-[#734a8d] text-white font-medium"
                        : "hover:bg-[#5a2c78] hover:text-white"
                    }`}
                  >
                    {chat.title || "Untitled Chat"}
                  </span>
                )}

                {/* Three Dots Dropdown */}
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="m-1">
                    <BiDotsHorizontalRounded className="text-2xl" />
                  </div>
                  <ul tabIndex={0} className="dropdown-content menu bg-[#48225f] z-[50] w-32 shadow-sm">
                    <button onClick={() => handleEditClick(chat.id, chat.title)} className="flex items-center px-2 py-1 hover:bg-[#734a8d] rounded-sm">
                      <FaRegEdit className="text-lg text-white" />
                      <span className="ml-2 text-sm font-medium">Edit</span>
                    </button>
                    <button onClick={() => handleChatDelete(chat.id)} className="flex items-center px-2 py-1 hover:bg-[#734a8d] rounded-sm">
                      <FaTrashAlt className="text-lg text-red-500" />
                      <span className="ml-2 text-sm font-medium">Delete</span>
                    </button>
                    <button onClick={() => handleResumeChat(chat.id)} className="flex items-center px-2 py-1 hover:bg-[#734a8d] rounded-sm">
                      <AiTwotoneDiff className="text-xl text-green-500" />
                      <span className="ml-2 text-sm font-medium">Resume</span>
                    </button>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No chat history available.</p>
        )}

        {/* Delete History Button */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <button onClick={() => setIsDeleteModalOpen(true)} className="w-[200px] py-2 bg-red-500 hover:bg-[#ee5d5d] flex items-center justify-center gap-2 text-white rounded-full shadow-md">
            Delete History
            <FaTrashAlt className="text-lg" />
          </button>
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-full md:w-3/4 h-screen">
        {chatID && <ChatSection chatID={chatID} />}
      </div>

      {/* Floating Button for Mobile */}
      <div className="fixed top-1 left-2 md:hidden z-100">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className=" p-2  text-white rounded-full shadow-md bg-gray-200 shadow-black/50"
        >
          <RiSidebarUnfoldFill className="text-2xl text-[#431D5A]" />
        </button>
      </div>

      {/* Floating Button for Home */}
      <div className="fixed top-1 right-4 md:right-44  z-50">
        <button
          onClick={() => navigate("/")}
          className="p-2 bg-[#431D5A] flex items-center text-white rounded-full shadow-lg"
        >
          <IoIosArrowBack className="md:text-xl" />
          <h1 className="uppercase text-[12px]">return</h1>
        </button>
      </div>

      {/* Delete All Chats Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Delete All Chats</h2>
            <p className="mb-6">Are you sure you want to delete all chats? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg">
                Cancel
              </button>
              <button onClick={handleAllChatsDelete} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatHistory;