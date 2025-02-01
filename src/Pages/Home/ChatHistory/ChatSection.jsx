import React, { useEffect, useState, useRef, useCallback } from "react";
import { 
  useChatContinueMutation, 
  useChatCreateMutation, 
  useGetBotInfoQuery, 
  useRetrivedChatMutation 
} from "../../redux/features/baseApi/baseApi";

function ChatSection({ chatID }) {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [isThinking, setIsThinking] = useState(false);

  const { data } = useGetBotInfoQuery();
  const [chatContinue] = useChatContinueMutation();
  const [retrivedChat] = useRetrivedChatMutation();

  const chatContainerRef = useRef(null);
  const observer = useRef();
  const isFetchingRef = useRef(false);
  const hasFetchedInitialMessages = useRef(false);

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
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

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="h-screen bg-[#e1e4ed] flex items-center justify-center">
      <div className="md:w-full mx-auto h-screen">
        {/* Chat Box */}
        <div 
          ref={chatContainerRef} 
          className="h-[95vh] overflow-y-auto flex flex-col p-4 border border-gray-300 rounded-lg" 
        >
          <div ref={chatContainerObserver}></div> 

          {chatMessages.map((msg, index) => (
            <div key={index} className={`flex py-5 items-start ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "ai" && (
                <img src={msg.model.icon} alt="Bot Avatar" className="h-8 w-8 rounded-full object-cover mr-4" />
              )}
              <div className="flex flex-col">
                <div className={`px-4 py-2 space-y-2 rounded-lg shadow-sm ${msg.role === "user" ? "bg-blue-500 text-right text-white" : "bg-gray-100 text-left"}`}>
                  {msg.content}
                </div>
              </div>
              {msg.role === "user" && (
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User Avatar" className="h-8 w-8 rounded-full object-cover ml-4" />
              )}
            </div>
          ))}

        </div>
       
      </div>
    </div>
  );
}

export default ChatSection;
