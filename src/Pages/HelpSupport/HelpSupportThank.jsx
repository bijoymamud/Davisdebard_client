import React from "react";
import { useNavigate } from "react-router-dom";

export default function HelpSupportThank() {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/"); // Navigate to the previous page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e1e4ed]">
      <div className=" p-8  text-center max-w-xl">
        <h1 className="text-3xl font-bold text-[#431D5A] mb-6">Thank You</h1>
        <p className="text-black/70 mb-8 leading-relaxed font-medium">
          Thank you for submitting an issue or comment to us. Please allow one
          business day for a response. In the meantime, be sure to look at our
          Frequently Asked Questions (FAQ) page here.
        </p>
        <button
          onClick={handleReturn}
          className="px-10 py-3 text-white hover:bg-[#431D5A] rounded-lg bg-purple-900 transition-colors"
        >
          Return
        </button>
      </div>
    </div>
  );
}
