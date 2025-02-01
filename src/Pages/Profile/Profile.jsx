

import {
  Camera,
  ChevronLeft,
  EyeOff,
  Eye,
  LockKeyhole,
  SquarePen,
} from "lucide-react";

import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePerticularUserQuery, useUpdateUserInfoMutation } from "../redux/features/baseApi/baseApi";
import useHandleUnauthorized from "../../Hooks/useHandleUnauthorized";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = usePerticularUserQuery();
  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [profileImage, setProfileImage] = useState(""); // State for image preview
  const [imageFile, setImageFile] = useState(null); // State for the actual file
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [editableName, setEditableName] = useState(false); // State to toggle name edit mode

  const fileInputRef = useRef(null); // Ref for file input

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  // Redirect unauthorized users
  useHandleUnauthorized(error);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  // Handle error state (non-401 errors)
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Error fetching user data. Please try again later.</p>
      </div>
    );
  }

  // Extract user data
  const user = data?.data
  console.log(user)

  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // Store the file for submission
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Update image preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  // const onSubmit = async (formData) => {
  //   try {
  //     // Validate image file
    

  //     // Remove password fields if not provided
  //     if (!formData.password?.length && !formData.confirmPassword?.length) {
  //       delete formData.password; // Remove password from formData
  //       delete formData.confirmPassword; // Remove confirmPassword from formData
  //     }

  //     // Prepare data for submission
  //     const formDataToSend = new FormData();
  //     formDataToSend.append("name", formData.name);
  //     formDataToSend.append("email", formData.email);
  //     if (formData.password) formDataToSend.append("password", formData.password);
  //     if (imageFile) formDataToSend.append("image", imageFile);

  //     // Send data to API
  //     const response = await updateUserInfo({ id: user.id, data: formDataToSend });
  //     refe

  //     if (response?.error) {
  //       toast.error("Failed to update profile. Please try again!", {
  //         position: "top-right",
  //       });
  //     } else {
  //       toast.success("Profile updated successfully!", {
  //         position: "top-right",
  //       });
  //     }

  //     reset()
  //   } catch (error) {
  //     console.error("Update error", error);
  //   }
  // };

  const onSubmit = async (formData) => {
    try {
      if (!formData.password?.length && !formData.confirmPassword?.length) {
        delete formData.password;
        delete formData.confirmPassword;
      }
  
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      if (formData.password) formDataToSend.append("password", formData.password);
      if (imageFile) formDataToSend.append("image", imageFile);
  
      const response = await updateUserInfo({ id: user.id, data: formDataToSend });
  
      if (response?.error) {
        toast.error("❌ Failed to update profile. Please try again!", {
          position: "top-right",
        });
      } else {
        toast.success("Profile updated successfully!", {
          position: "top-right",
        });
  
        refetch(); // Soft refresh: fetch updated user data
      }
  
      reset();
    } catch (error) {
      console.error("Update error", error);
     
    }
  };
  


  return (
    <section className="bg-[#e1e4ed]">
      <ToastContainer /> 
      <div className="pt-10">
        <button
          onClick={() => navigate(-1)}  page
          className="flex text-[#431D5A] hover:bg-[#431D5A] hover:text-white border border-[#431D5A] px-2 py-2 rounded-md md:ms-10 ms-5 mx-auto"
        >
          <ChevronLeft size={28} />
          <h2 className="uppercase text-lg font-medium pr-2">Return</h2>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen md:p-6">
        <div className="md:p-8 p-5 rounded-lg w-full xl:w-2/4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            <div className="flex flex-col items-start">
              {/* Profile Image Section */}
              <div className="relative mb-8">
                <img
                  src={
                    profileImage ||  user?.image || 
                    "https://img.freepik.com/premium-photo/photo-boy-cute-boy-character_911060-18951.jpg" 
                  }
                  alt="Profile"
                  className="w-40 h-40 rounded-full border-2 shadow-md shadow-gray-500 border-[#431D5A] cursor-pointer object-cover"
                />
                <button
                  type="button" 
                  className="absolute bottom-2 right-1 hover:bg-[#5b267c]  bg-[#431D5A] shadow-md shadow-gray-500 text-white border-2 p-2 rounded-full"
                  title="Upload Profile Picture"
                  onClick={() => fileInputRef.current.click()} // Trigger file input click
                >
                  <Camera size={20} />
                </button>
                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>

              {/* Name Field */}
              <div className="md:flex md:flex-wrap gap-6 w-full mb-3">
                <div className="flex flex-col w-full">
                  <div className="flex items-center rounded-md shadow p-2 border border-[#431D5A]">
                    <input
                      type="text"
                      defaultValue={user?.name || ""}
                      placeholder="Name"
                      {...register("name", { required: "Name is required" })}
                      className="flex-1 py-3 font-medium bg-transparent outline-none px-4 text-black text-base"
                      readOnly={!editableName} // Toggle read-only based on state
                    />
                    <button
                      type="button"
                      onClick={() => setEditableName(!editableName)} // Toggle edit mode
                      className="flex items-center justify-center w-10 h-10 text-[#431D5A] hover:bg-[#5b267c] hover:text-white rounded-full"
                      title={editableName ? "Lock Editing" : "Edit Name"}
                    >
                      <SquarePen size={20} />
                    </button>
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="md:grid grid-cols-2 w-full gap-4 mb-3">
                <div className="w-full">
                  <div className="flex flex-col">
                    <div className="flex items-center rounded-md shadow p-2 border border-[#431D5A]">
                      <input
                        type="text"
                        defaultValue={user?.email || ""}
                        placeholder="Email"
                        {...register("email")}
                        className="flex-1 font-medium bg-transparent outline-none px-4 text-black text-base py-3"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                {/* Package Name */}
                <div className="w-full mt-3 md:mt-0">
                  <div className="flex flex-col">
                    <div className="flex items-center rounded-md shadow p-2 border border-[#431D5A]">
                      <input
                        type="text"
                        value="Free"
                        className="flex-1 font-medium bg-transparent outline-none px-4 text-black text-base py-3"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Fields */}
              <div className="md:grid grid-cols-2 gap-4 w-full">
                {/* Password */}
                <div className="flex flex-col w-full">
                  <div className="flex items-center rounded-md shadow p-2 border border-[#431D5A]">
                    <button className="flex items-center justify-center text-purple-600 ms-3">
                      <LockKeyhole size={20} className="text-[#431D5A]" />
                    </button>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="New Password"
                      {...register("password")}
                      className="flex-1 font-medium bg-[#e1e4ed] outline-none px-4 text-black text-base"
                    />
                    <button
                      className="flex items-center justify-center w-12 h-12 text-purple-600"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      {showPassword ? (
                        <Eye size={20} className="text-[#431D5A]" />
                      ) : (
                        <EyeOff size={20} className="text-[#431D5A]" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col w-full mt-3 md:mt-0">
                  <div className="flex items-center rounded-md shadow p-2 border border-[#431D5A]">
                    <button className="flex items-center justify-center text-[#431D5A] ms-3">
                      <LockKeyhole size={20} className="text-[#431D5A]" />
                    </button>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      {...register("confirmPassword", {
                        validate: (value) =>
                          value === password || "Passwords do not match.",
                      })}
                      className="flex-1 bg-[#e1e4ed] outline-none px-4 text-black text-base"
                    />
                    <button
                      className="flex items-center justify-center w-12 h-12 text-purple-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      type="button"
                    >
                      {showConfirmPassword ? (
                        <Eye size={20} className="text-[#431D5A]" />
                      ) : (
                        <EyeOff size={20} className="text-[#431D5A]" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Update Button */}
              <div className="mt-8 w-full flex justify-end">
                <button
                  type="submit"
                  className="px-10 py-2 bg-[#431D5A] text-white rounded-md text-base font-semibold shadow hover:bg-[#360F47]"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;

