// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useChangedPasswordMutation } from "../redux/features/baseApi/baseApi";


// const ResetPassword = () => {
//   const { register, handleSubmit, formState: { errors }, watch } = useForm();
//   const navigate = useNavigate();
//   const [errorMessage, setErrorMessage] = useState("");
//   const newPassword = watch("new_password"); // To validate confirm password
//     const [changedPassword, {isLoading}] = useChangedPasswordMutation()

    
//   const onSubmit = async (data) => {
//     try {
//       const email = localStorage.getItem("email");
//       console.log(email);

//       const response = await changedPassword({
//         email,
//         new_password: data.new_password,
//         confirm_password: data.confirm_password,
//       }).unwrap();

//       console.log("Password Reset Response:", response);

//       // Redirect to login page
//       navigate("/changePassSuccessfull");
//     } catch (error) {
//       console.error("Reset Password Error:", error);
//       setErrorMessage(error?.data?.message || "An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-[#e1e4ed]">
//       <div className="w-full max-w-md p-8  rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-start text-gray-700">Create New Password</h2>
//         <p className="mt-2 text-sm text-start text-gray-500">
//         Your new password must be unique from those previously used.
//         </p>
//         {errorMessage && (
//           <div className="mt-4 p-2 text-sm text-red-600 bg-red-100 border border-red-400 rounded">
//             {errorMessage}
//           </div>
//         )}
//         <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
//           {/* New Password Field */}
//           <div>
//             <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
//               New Password
//             </label>
//             <input
//               type="password"
//               id="new_password"
//               {...register("new_password", {
//                 required: "New password is required",
//                 minLength: {
//                   value: 8,
//                   message: "Password must be at least 8 characters long",
//                 },
//               })}
//               className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.new_password ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errors.new_password && (
//               <p className="mt-1 text-sm text-red-500">{errors.new_password.message}</p>
//             )}
//           </div>

//           {/* Confirm Password Field */}
//           <div>
//             <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirm_password"
//               {...register("confirm_password", {
//                 required: "Confirm password is required",
//                 validate: (value) =>
//                   value === newPassword || "Passwords do not match",
//               })}
//               className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.confirm_password ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errors.confirm_password && (
//               <p className="mt-1 text-sm text-red-500">{errors.confirm_password.message}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full py-3 text-white font-medium rounded-lg focus:outline-none ${
//               isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#431D5A] hover:bg-[#431D5A]"
//             }`}
//           >
//             {isLoading ? "Resetting..." : "Reset Password"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useChangedPasswordMutation } from "../redux/features/baseApi/baseApi";
import { Eye, EyeOff } from "lucide-react"; // Eye icons from lucide-react

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const newPassword = watch("new_password"); // To validate confirm password
  const [changedPassword, { isLoading }] = useChangedPasswordMutation();
  
  // State to manage password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to handle password visibility toggle
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = async (data) => {
    try {
      const email = localStorage.getItem("email");
      console.log(email);

      const response = await changedPassword({
        email,
        new_password: data.new_password,
        confirm_password: data.confirm_password,
      }).unwrap();

      console.log("Password Reset Response:", response);

      // Redirect to login page
      navigate("/changePassSuccessfull");
    } catch (error) {
      console.error("Reset Password Error:", error);
      setErrorMessage(error?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e1e4ed]">
      <div className="w-full max-w-2xl p-8 rounded-lg ">
        <h2 className="text-3xl font-bold text-start text-black">Create New Password</h2>
        <p className="mt-2 text-base font-medium text-start text-gray-600">
          Your new password must be unique from those previously used.
        </p>
        {errorMessage && (
          <div className="mt-4 p-2 text-sm text-red-600 bg-red-100 border border-red-400 rounded">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          {/* New Password Field */}
          <div>
            <label htmlFor="new_password" className="block text-base font-semibold text-gray-700">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="new_password"
                placeholder="New Password"
                {...register("new_password", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                className={`w-full px-4 py-2.5 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.new_password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.new_password && (
              <p className="mt-1 text-sm text-red-500">{errors.new_password.message}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirm_password" className="block text-base font-semibold text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm_password"
                placeholder="Confirm Password"
                {...register("confirm_password", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
                className={`w-full px-4 py-2.5 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirm_password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <span
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.confirm_password && (
              <p className="mt-1 text-sm text-red-500">{errors.confirm_password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-full text-white font-medium  focus:outline-none ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#431D5A] hover:bg-[#431D5A]"
            }`}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
