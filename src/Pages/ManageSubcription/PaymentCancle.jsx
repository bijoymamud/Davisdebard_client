import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCancle = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Redirect to the homepage or another route
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        🎉 Payment Successful! 🎉
      </h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Thank you for your payment! Your transaction was completed successfully.
      </p>
      <button
        onClick={handleGoHome}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default PaymentCancle;
