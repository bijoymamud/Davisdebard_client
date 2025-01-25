import React from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ChangePassSuccessFull = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#e1e4ed]">
      <div className="text-center space-y-6">
        {/* Success Icon */}
        <div className="h-32 w-32 mx-auto flex items-center justify-center bg-[#431D5A] rounded-full">
        <FaCheck className="text-6xl text-white" />


        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-800">Password Changed!</h1>
        <p className="text-gray-600">
          Your password has been changed successfully.
        </p>

        {/* Back to Login Button */}
        <button
          onClick={() => navigate("/login")}  
          className="mt-6 px-6 py-3 bg-[#431D5A] text-white rounded-full focus:outline-none"
        >
          Back to Login
        </button>
      </div>
    </section>
  );
};

export default ChangePassSuccessFull;
