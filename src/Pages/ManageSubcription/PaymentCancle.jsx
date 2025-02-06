import React from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { HiOutlineXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const PaymentCancle = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Navigate to the homepage or desired route
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className=" rounded-lg text-center p-10 max-w-lg w-full">
        {/* Icon Section with Layered Background */}
        <div className="relative w-40 h-40 mx-auto mb-6">
          {/* Green Outer Circle */}
          <div className="absolute inset-0 bg-red-200 opacity-90 rounded-full"></div>
          {/* White Inner Circle */}
          <div className="absolute inset-6 bg-white shadow-xl rounded-full"></div>
          {/* Check Mark Icon */}
          <div className="flex items-center justify-center w-full h-full relative">
            <HiOutlineXMark className="text-red-600 w-20 h-20" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">
          Payment Canceled
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-8">
          Your payment has been successfully Canceled. 
        </p>
        <p className="text-gray-600 mb-8">
          Please email support with any questions.
        </p>

        {/* Button */}
        <button
          onClick={handleGoHome}
          className="px-6 py-3 w-full md:w-auto bg-[#53296d] text-white font-semibold rounded-lg shadow-md hover:bg-[#45215B] transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentCancle;






