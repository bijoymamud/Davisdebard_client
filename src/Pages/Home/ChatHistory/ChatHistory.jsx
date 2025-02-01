

import React, { useState, useEffect, useRef } from "react";
import { useChatHistoryQuery, usePerticularChatDeleteMutation, useDeleteAllChatsMutation } from "../../redux/features/baseApi/baseApi";
import { Link, useSearchParams } from "react-router-dom";
import ChatSection from "./ChatSection";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaTrashAlt, FaBars } from "react-icons/fa";
import { TbArrowBackUpDouble } from "react-icons/tb";

function ChatHistory() {
  const { data, isLoading, error, refetch } = useChatHistoryQuery();
  const [perticularChatDelete] = usePerticularChatDeleteMutation();
  const [deleteAllChats] = useDeleteAllChatsMutation();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("id");
  const [chatID, setChatId] = useState(undefined);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
  const sidebarRef = useRef(null); // Ref for the sidebar

  //  Automatically select the latest chat when history is available
  useEffect(() => {
    if (data?.data?.length > 0 && !selectedId) {
      const latestChat = data.data[data.data.length - 1];
      setChatId(latestChat.id);
      setSearchParams({ id: latestChat.id });
    }
  }, [data, selectedId, setSearchParams]);

  //  Close sidebar when clicking outside of it on mobile
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

  const handleClick = (chat) => {
    setSearchParams({ id: chat.id });
    setChatId(chat.id);
    // Close sidebar on mobile after selecting a chat
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

  return (
    <div className="min-h-screen bg-[#e1e4ed] flex">
      {/*  Sidebar (Drawer on Mobile, Fixed on Desktop) */}
      <div
        ref={sidebarRef}
        className={`fixed md:relative top-0 left-0 w-3/5 md:w-1/4 h-screen bg-[#431D5A] text-white p-4 shadow-md z-50 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ overflowY: "auto" }} // Ensures sidebar scrolls, not the page
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-5 md:mb-10">
          <h2 className="text-2xl font-semibold mb-2">Chat History</h2>
          <Link to="/"  className="">
            <TbArrowBackUpDouble className="text-3xl text-red-500 hover:bg-[#551d77] rounded-md" />
          </Link>
        </div>

        {/* Chat List */}
        {data?.data?.length > 0 ? (
          <ul className="overflow-y-auto md:overflow-visible" style={{ maxHeight: "75vh" }}>
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
                  {chat.title || "Untitled Chat"}
                </span>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="m-1">
                    <BiDotsHorizontalRounded className="text-2xl" />
                  </div>
                  <ul tabIndex={0} className="dropdown-content border-none menu bg-black z-[50] w-28 shadow">
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

        {/*  Fixed Delete Button at Bottom */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleAllDelete}
            className="w-full py-2 bg-red-500 hover:bg-[#ee5d5d] flex items-center justify-center gap-2 border-2 text-white rounded-full shadow-md text-base font-semibold transition-all duration-200"
          >
            Delete History
            <FaTrashAlt className="text-lg text-white cursor-pointer" />
          </button>
        </div>
      </div>

      {/*  Chat Section (Full Width on Mobile, 3/4 Width on Desktop) */}
      <div className="w-full md:w-3/4 h-screen">
        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden fixed top-4 left-4 z-40 p-2 bg-[#431D5A] text-white rounded-md shadow-md"
        >
          <FaBars className="text-2xl" />
        </button>

        {chatID && <ChatSection chatID={chatID} />}
      </div>
    </div>
  );
}

export default ChatHistory;  