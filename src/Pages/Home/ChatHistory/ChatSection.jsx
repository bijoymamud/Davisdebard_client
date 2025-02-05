


import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  useChatContinueMutation,
  useChatCreateMutation,
  useGetBotInfoQuery,
  useRetrivedChatMutation,
} from "../../redux/features/baseApi/baseApi";
import useUserInfo from "../../../Hooks/useUserInfo";
import { RichTextDisplay } from "../../RichText/RichTextDisplay";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import for navigation in React Router

function ChatSection({ chatID }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [retrivedChat] = useRetrivedChatMutation();
  const { isLoading: userLoading, user, error: userError } = useUserInfo();
  const navigate = useNavigate(); // Hook for navigation

  const chatContainerRef = useRef(null);
  const observer = useRef();
  const isFetchingRef = useRef(false);
  const hasFetchedInitialMessages = useRef(false);
  const userScrollRef = useRef(false);

  // Fetch chat messages when chatID changes
  useEffect(() => {
    setChatMessages([]); // Clear messages when switching chat
    hasFetchedInitialMessages.current = false;
    fetchMessages(false);
  }, [chatID]);

  const fetchMessages = async (loadMore = false) => {
    if (isFetchingRef.current) return; // Prevent multiple fetches
    isFetchingRef.current = true;

    try {
      const response = await retrivedChat(chatID).unwrap();
      const list = response?.data?.content ?? [];

      setChatMessages((prev) => {
        const messagesSet = new Set(prev.map((msg) => msg.content));
        const newMessages = list.filter((msg) => !messagesSet.has(msg.content));
        return loadMore ? [...newMessages, ...prev] : [...prev, ...newMessages];
      });

      hasFetchedInitialMessages.current = true;
    } catch (error) {
      console.error("Error fetching chat:", error);
    } finally {
      isFetchingRef.current = false;
    }
  };

  const initialProcessMessage = async (allmessages) => {
    const nArray = [];
    allmessages.forEach((element) => {
      if (element.role == "user") {
        const question = nArray
          .slice()
          .reverse()
          .find((e) => e.role == "user");
        if (!(question !== undefined && question.content === element.content)) {
          nArray.push(element);
        }
      } else {
        nArray.push(element);
      }
    });
    setChatMessages(nArray);
  };

  // Infinite Scroll - Load more messages when reaching top
  const chatContainerObserver = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasFetchedInitialMessages.current) {
          fetchMessages(true);
        }
      },
      { threshold: 1.0 }
    );
    if (node) observer.current.observe(node);
  }, []);

  // Track user's manual scrolling
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    userScrollRef.current = !(scrollTop + clientHeight >= scrollHeight - 50);
  };

  // Scroll behavior
  useEffect(() => {
    if (chatContainerRef.current) {
      if (!userScrollRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }
  }, [chatMessages]);

  return (
    <section>
      <div className="h-screen bg-[#e1e4ed] flex items-center">
        <div className="md:w-full mx-auto h-screen">
          {/* Return Button */}
          {/* <div className="flex justify-end mb-5 mt-2 ">
            <Link
              to="/" Navigate back
              className="flex items-center text-semibold text-sm text-center bg-[#431D5A] text-white rounded-lg md:px-5 px-2 py-2 shadow-md hover:bg-[#5A267A] transition-all"
            >
              <FaAngleLeft className="md:text-xl" />
              <span className="text-xs md:text-base">Return</span>
            </Link>
          </div> */}

          {/* Chat Box */}
          <div
            ref={chatContainerRef}
            className="md:h-screen h-screen overflow-y-auto flex flex-col md:p-4 p-2 rounded-lg custom-scrollbar"
            onScroll={handleScroll}
          >
            <div className="h-10  p-6">

            </div>
            <div ref={chatContainerObserver}></div>
            <div className="mt-10 md:mt-0">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex py-2 items-start ${
                    msg.role === "user" ? "justify-end" : ""
                  }`}
                >
                  {msg.role === "ai" && (
                    <img
                      src={msg.model.icon}
                      alt="Bot Avatar"
                      className="h-8 w-8 rounded-full object-cover mr-2"
                    />
                  )}

                  <div
                    className={`flex flex-col ${
                      msg.role !== "user" ? "pr-10" : "pl-12"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 text-sm md:text-xs rounded-lg shadow-sm ${
                        msg.role === "user"
                          ? "bg-gray-400 text-white text-left"
                          : "bg-gray-100 text-left"
                      } break-words`}
                    >
                      <RichTextDisplay content={msg.content} />
                    </div>
                  </div>

                  {msg.role === "user" &&
                    (userLoading || userError != null || !user.image ? (
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="User Avatar"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <img
                        src={user.image}
                        alt="User Avatar"
                        className="h-8 w-8 rounded-full object-cover ml-2"
                      />
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChatSection;

