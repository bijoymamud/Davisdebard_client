import {
  Camera,
  ChevronLeft,
  EyeOff,
  Eye,
  LockKeyhole,
  SquarePen,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePerticularUserQuery } from "../redux/features/baseApi/baseApi";

const Profile = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = usePerticularUserQuery();

  // States
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Error fetching user data. Please try again later.</p>
      </div>
    );
  }

  // Extract user data
  const user = data?.data;

  const handleUpdatePassword = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Replace this with your actual password update API logic
    console.log("Updated Password:", password);

    alert("Password updated successfully!");
  };

  return (
    <section className="bg-[#e1e4ed]">
      <div className="pt-10">
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous page
          className="flex text-[#431D5A] hover:bg-[#431D5A] hover:text-white border border-[#431D5A] px-2 py-2 rounded-md ms-10 mx-auto"
        >
          <ChevronLeft size={28} />
          <h2 className="uppercase text-lg font-medium pr-2">Return</h2>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen md:p-6">
        <div className="md:p-8 p-5 rounded-lg w-full xl:w-2/4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile</h2>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-start">
              <div className="relative mb-8">
                <img
                  src={
                    user?.image ||
                    "https://img.freepik.com/premium-photo/photo-boy-cute-boy-character_911060-18951.jpg"
                  }
                  alt="Profile"
                  className="h-24 rounded-full border-2 border-[#431D5A] cursor-pointer"
                />
                <button
                  className="absolute bottom-0 right-0 bg-[#431D5A] shadow-md text-white p-2 rounded-full"
                  title="Upload Profile Picture"
                >
                  <Camera size={20} />
                </button>
              </div>

              {/* Input Fields */}
              <div className="md:flex md:flex-wrap gap-6 w-full">
                <div className="md:flex gap-4 w-full">
                  {/* Name Field */}
                  <div className="flex flex-1 items-center rounded-md shadow p-2 border border-[#431D5A]">
                    <input
                      type="text"
                      value={user?.name || ""}
                      placeholder="Name"
                      className="flex-1 bg-transparent outline-none px-4 text-black text-base"
                      readOnly
                    />
                    <button className="flex items-center justify-center w-12 h-12 text-purple-600">
                      <SquarePen size={20} className="text-[#431D5A]" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Email Field */}
           <div className="grid grid-cols-2  w-full gap-4">
           <div className="w-full md:mt-5">
                <div className="flex flex-1 items-center rounded-md shadow p-2 border border-[#431D5A]">
                  <input
                    type="text"
                    value={user?.email || ""}
                    placeholder="Email"
                    className="flex-1 bg-transparent outline-none px-4 text-black text-base py-3"
                    readOnly
                  />
                </div>
              </div>
              {/* //package name */}
              <div className="w-full md:mt-5">
                <div className="flex flex-1 items-center rounded-md shadow p-2 border border-[#431D5A]">
                  <input
                    type="text"
                    value={"Free"}
                    placeholder="Email"
                    className="flex-1 bg-transparent outline-none px-4 text-black text-base py-3"
                    readOnly
                  />
                </div>
              </div>
           </div>

              {/* Editable Password Fields */}
              <div className="md:grid grid-cols-2 gap-4 w-full md:mt-5">
                {/* Password */}
                <div className="flex flex-1 items-center rounded-md shadow p-2 border border-[#431D5A] mb-5 md:mb-0">
                  <button className="flex items-center justify-center text-purple-600 ms-3">
                    <LockKeyhole size={20} className="text-[#431D5A]" />
                  </button>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 bg-[#e1e4ed] outline-none px-4 text-black text-base"
                  />
                  <button
                    className="flex items-center justify-center w-12 h-12 text-purple-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye size={20} className="text-[#431D5A]"/> : <EyeOff size={20} className="text-[#431D5A]"/>}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-1 items-center rounded-md shadow p-2 border border-[#431D5A]">
                  <button className="flex items-center justify-center text-[#431D5A] ms-3">
                    <LockKeyhole size={20} className="text-[#431D5A]" />
                  </button>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="flex-1 bg-[#e1e4ed] outline-none px-4 text-black text-base"
                  />
                  <button
                    className="flex items-center justify-center w-12 h-12 text-purple-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <Eye size={20} className="text-[#431D5A]"/> : <EyeOff size={20} className="text-[#431D5A]" />}
                  </button>
                </div>
              </div>

              {/* Update Button */}
              <div className="mt-8 w-full flex justify-end">
                <button
                  onClick={handleUpdatePassword}
                  className="px-10 py-2 bg-[#431D5A] text-white rounded-md text-base font-semibold shadow hover:bg-[#360F47]"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

