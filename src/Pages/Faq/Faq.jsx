import { ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Faq = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  return (
    <section className="bg-[#e1e4ed]">
      <div className="ms-10 mx-auto pt-12">
        {/* Return Button */}
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="flex text-[#431D5A] hover:bg-[#431D5A] hover:text-white border border-[#431D5A] px-2 py-2 rounded-md"
        >
          <ChevronLeft size={28} />
          <h2 className="uppercase text-lg font-medium pr-2">Return</h2>
        </button>
      </div>

      <div className="h-screen flex items-center justify-center">
        <div className="max-w-screen-md w-full">
          <h1 className="text-3xl font-medium md:mb-10">
            FAQ Frequently Asked Questions
          </h1>
          <div className="collapse collapse-arrow bg-base-200 mb-4">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              How to Log In / Sign Up?
            </div>
            <div className="collapse-content">
              <p>
                Logging in or signing up to an application or website is a
                straightforward process designed to ensure secure access and
                user personalization. The "Log In" feature typically requires
                users to input their registered email address or username along
                with their password. In contrast, the "Sign Up" process involves
                creating a new account by providing details such as full name,
                email, and password, and sometimes agreeing to the platform’s
                terms and conditions.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200 mb-4">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              What does the AI chatbot do?
            </div>
            <div className="collapse-content">
              <p>
                In short, the AI chatbot is a software solution that serves as a
                digital assistant to:
                <br />
                - Provides information in the form of texts, photos, buttons for
                additional information and quick links, audio; it is a fast and
                easy self-service tool
                <br />
                - Is a two-way communication tool: the conversational AI
                simulates the conversation with a human, instantly identifying
                the meaning of the inquiry and providing a response from the
                built database.
                <br />
                - Collects feedback and inquiries: another important element is
                the forms that allow customers to contact the business quickly
                and easily, make an inquiry, or other.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200 mb-4">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              We are here to help?
            </div>
            <div className="collapse-content">
              <p>Hello</p>
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              Allow up to one business day for us to get back to you?
            </div>
            <div className="collapse-content">
              <p>Hello</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
