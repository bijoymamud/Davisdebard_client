// "use client";

// import { SendHorizontal } from "lucide-react";
// import { useState } from "react";

// export default function Frontpage() {
//   const [userMessage, setUserMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const apiUrl = "http://192.168.10.208:5050";

//   const handleSendMessage = async () => {
//     if (!userMessage.trim()) return; // Prevent sending empty messages

//     // Add user's message to chat history
//     setChatHistory((prev) => [...prev, { sender: "user", text: userMessage }]);

//     setIsLoading(true);

//     try {
//       const response = await fetch(`${apiUrl}/assistant/chat`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ user_input: userMessage }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("API Response:", data);

//       // Extract bot's reply from the `response` field
//       const botReply = data?.response ?? "No response from the bot.";

//       // Add bot's response to chat history
//       setChatHistory((prev) => [...prev, { sender: "bot", text: botReply }]);
//     } catch (error) {
//       console.error("Error communicating with ChatGPT API:", error);
//       setChatHistory((prev) => [
//         ...prev,
//         { sender: "bot", text: "An error occurred. Please try again." },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }

//     // Clear input field
//     setUserMessage("");
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50">
//       {/* Main container */}
//       <div className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-md">
//         {/* Header */}
//         <header className="flex justify-between items-center mb-8">
//           <div className="flex items-center gap-2">
//             <img
//               src="https://cdn.pixabay.com/photo/2017/10/24/00/39/bot-icon-2883144_1280.png"
//               alt="DummyApi logo"
//               className="w-12 h-12"
//             />
//             <span className="font-bold text-xl">DummyAI</span>
//           </div>
//           <button className="bg-black text-white px-4 py-2 rounded-full text-sm">
//             Dummy Profile Connection
//           </button>
//         </header>

//         {/* Chat Area */}
//         <div className="border rounded-lg p-4 min-h-[400px] max-h-[500px] overflow-y-auto mb-4">
//           {chatHistory.map((message, index) => (
//             <div
//               key={index}
//               className={`${
//                 message.sender === "user" ? "text-right" : "text-left"
//               } mb-2`}
//             >
//               <div
//                 className={`inline-block p-3 rounded-lg text-sm ${
//                   message.sender === "user"
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-100 text-gray-800"
//                 }`}
//               >
//                 {message.text}
//               </div>
//             </div>
//           ))}
//           {isLoading && (
//             <div className="text-left mb-2">
//               <div className="inline-block p-3 rounded-lg bg-gray-100 text-gray-800 text-sm">
//                 Typing...
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Input Area */}
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Chat with DummyApi"
//             className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
//             value={userMessage}
//             onChange={(e) => setUserMessage(e.target.value)}
//             disabled={isLoading}
//           />
//           <button
//             className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-[#252525] hover:bg-black rounded-full"
//             onClick={handleSendMessage}
//             disabled={isLoading}
//           >
//             <SendHorizontal size={28} className="text-white shadow-sm" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
