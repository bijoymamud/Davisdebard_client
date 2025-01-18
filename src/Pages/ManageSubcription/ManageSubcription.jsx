import { ChevronLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom"; // Correct import

const ManageSubscription = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="bg-[#e1e4ed]">
      <div className="pt-10">
        <button
          onClick={() => navigate(-1)} // Correct usage of navigate to go back
          className="flex text-[#431D5A] hover:bg-[#431D5A] hover:text-white border border-[#431D5A] px-2 py-2 rounded-md ms-10 mx-auto"
        >
          <ChevronLeft size={28} />
          <h2 className="uppercase text-lg font-medium pr-2">Return</h2>
        </button>
      </div>
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-screen w-full px-6">
        <div className="w-full max-w-3xl">
          <h1 className="text-[30px] text-black font-semibold py-5">
            Manage Subscription
          </h1>
          <input
            type="text"
            name=""
            id=""
            placeholder="Subscription pack name.."
            className="border py-2 px-4 rounded-md w-full mb-6"
          />
          <div className="bg-gray-50 p-6 rounded-md border border-gray-200">
            <h2 className="text-lg font-medium text-gray-700 mb-4 underline">
              Bill Info
            </h2>
            <p className="text-sm text-gray-600">
              <strong>Name:</strong> PAPPU
            </p>
            <p className="text-sm text-gray-600">
              <strong>Email:</strong> Pappyroy6393@gmail.com
            </p>
            <p className="text-sm text-gray-600">
              <strong>Purchase Date:</strong> 2.1.2025
            </p>
            <p className="text-sm text-gray-600">
              <strong>Expiry Date:</strong> 2.1.2026
            </p>
          </div>
          <button className="py-3 hover:bg-[#431D5A] hover:text-white border border-[#431D5A] mt-5 px-4 rounded-xl font-semibold">
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageSubscription;
