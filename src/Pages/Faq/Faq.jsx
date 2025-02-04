// import { ChevronLeft } from "lucide-react";
// import React from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const Faq = () => {
//   const navigate = useNavigate(); // Initialize navigate hook

//   return (
//     <section className="bg-[#e1e4ed]">
//       <div className="ms-10 mx-auto pt-12">
//         {/* Return Button */}
//         <button
//           onClick={() => navigate(-1)} // Navigate back to the previous page
//           className="flex text-[#431D5A] hover:bg-[#431D5A] hover:text-white border border-[#431D5A] px-2 py-2 rounded-md"
//         >
//           <ChevronLeft size={28} />
//           <h2 className="uppercase text-lg font-medium pr-2">Return</h2>
//         </button>
//       </div>

//       <div className="h-screen flex items-center justify-center">
//         <div className="max-w-screen-md w-full">
//           <h1 className="text-3xl font-medium md:mb-10">
//             FAQ Frequently Asked Questions
//           </h1>
//           <div className="collapse collapse-arrow bg-base-200 mb-4">
//             <input type="radio" name="my-accordion-2" defaultChecked />
//             <div className="collapse-title text-xl font-medium">
//             How do I use the Chat screen?
//             </div>
//             <div className="collapse-content">
//               <p>
//               Select a Chat tool, such as ChatGPT.  Type a question.  Click the airplane icon.
//               </p>
//             </div>
//           </div>
//           <div className="collapse collapse-arrow bg-base-200 mb-4">
//             <input type="radio" name="my-accordion-2" />
//             <div className="collapse-title text-xl font-medium">
//               What does the AI chatbot do?
//             </div>
//             <div className="collapse-content">
//               <p>
//                 In short, the AI chatbot is a software solution that serves as a
//                 digital assistant to:
//                 <br />
//                 - Provides information in the form of texts, photos, buttons for
//                 additional information and quick links, audio; it is a fast and
//                 easy self-service tool
//                 <br />
//                 - Is a two-way communication tool: the conversational AI
//                 simulates the conversation with a human, instantly identifying
//                 the meaning of the inquiry and providing a response from the
//                 built database.
//                 <br />
//                 - Collects feedback and inquiries: another important element is
//                 the forms that allow customers to contact the business quickly
//                 and easily, make an inquiry, or other.
//               </p>
//             </div>
//           </div>
//           <div className="collapse collapse-arrow bg-base-200 mb-4">
//             <input type="radio" name="my-accordion-2" />
//             <div className="collapse-title text-xl font-medium">
//               We are here to help?
//             </div>
//             <div className="collapse-content">
//               <p>Hello</p>
//             </div>
//           </div>
//           <div className="collapse collapse-arrow bg-base-200">
//             <input type="radio" name="my-accordion-2" />
//             <div className="collapse-title text-xl font-medium">
//               Allow up to one business day for us to get back to you?
//             </div>
//             <div className="collapse-content">
//               <p>Hello</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Faq;





import { ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

// General FAQ Data
const faqDataGeneral = [
  {
    question: "How do I use the Chat screen?",
    answer: "Select a Chat tool, such as ChatGPT. Type a question. Click the airplane icon."
  },
  {
    question: "How can I get a different tool to respond to the same question?",
    answer: "After having already entered with one tool, click another. It will answer the same question. It will know the history of this chat."
  },
  {
    question: "When I have a series of questions, will the other tools be brought up to date with the level of detail when I switch from one to another?",
    answer: "Yes."
  },
  {
    question: "A paid subscription to ChatGPT 4.0 will generate graphics. Why won’t this?",
    answer: "Graphics are available in a different subsystem. Currently, graphics are not supported, but we plan to offer this in future versions."
  },
  {
    question: "I want to use an AI tool that is not listed here. Can I?",
    answer: "Each tool needs to be programmed to work. In future versions, we may expand our offerings, based on your suggestions."
  },
  {
    question: "I made a query a long time ago, but don’t see it listed in my query history. Why?",
    answer: "Queries are retained for a 7-day period. In future versions, we may expand this for premium-level users."
  },
  {
    question: "I want to resume a query that I started previously. How can I do that?",
    answer: "Currently, query histories are view-only. You can copy questions and start a new chat with them."
  }
];

// Subscription FAQ Data
const faqDataSubscription = [
  {
    question: "Can I get a free version?",
    answer: "Both monthly and annual subscription methods are free for the first seven (7) days."
  },
  {
    question: "Can I cancel at any time?",
    answer: "Yes. Within the first seven days, you may cancel at no charge. After that, there are generally no refunds. Canceling will only stop auto-renew."
  },
  {
    question: "Can I get my money back?",
    answer: "After the first seven days, generally, no. Contact support if you have an issue."
  },
  {
    question: "How do I cancel my subscription?",
    answer: "Click the hamburger icon. Click Subscription. Click Unsubscribe. Your subscription will then not auto-renew."
  },
  {
    question: "Can I upgrade my plan from monthly to annual?",
    answer: "Yes. Click the hamburger icon. Click subscriptions. Click Upgrade to sign up for the annual plan."
  },
  {
    question: "Can I downgrade my plan from annual to monthly?",
    answer: "Yes. Click the hamburger icon. Click subscriptions. Click Downgrade to sign up for the monthly plan."
  }
];

const Faq = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  return (
    <section className="bg-[#e1e4ed] min-h-screen md:p-6 p-2">
      <div className=" mx-auto pt-6">
        {/* Return Button */}
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="flex text-[#431D5A] hover:bg-[#431D5A] hover:text-white border border-[#431D5A] px-3 py-2 rounded-md"
        >
          <ChevronLeft size={28} />
          <h2 className="uppercase text-lg font-medium md:pr-2">Return</h2>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-start mt-8">
        {/* General FAQs */}
        <div className="w-full md:w-1/2 rounded-lg md:p-6">
          <h1 className="md:text-xl font-semibold mb-4">General</h1>
          {faqDataGeneral.map((faq, index) => (
            <div key={index} className="collapse collapse-arrow bg-base-200 md:mb-4">
              <input type="radio" name="faq-accordion-1" />
              <div className="collapse-title  font-medium">
                {faq.question}
              </div>
              <div className="collapse-content  text-sm">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

<div className="shadow-lg p-2 h-[70vh]"></div>
        {/* Subscription FAQs */}
        <div className="w-full md:w-1/2 rounded-lg md:p-6 p-2">
          <h1 className="text-2xl font-semibold mb-4">Subscription</h1>
          {faqDataSubscription.map((faq, index) => (
            <div key={index} className="collapse collapse-arrow bg-base-200 mb-4">
              <input type="radio" name="faq-accordion-2" />
              <div className="collapse-title  font-medium">
                {faq.question}
              </div>
              <div className="collapse-content  text-sm">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
