// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useVerifyOTPMutation } from "../redux/features/baseApi/baseApi";

// const OTPVerification = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
//   const navigate = useNavigate();
//   const [errorMessage, setErrorMessage] = useState("");

//   const onSubmit = async (data) => {
//     const otp = Object.values(data).join(""); // Combine OTP digits
//     try {
//       const email = localStorage.getItem("email");
//       if (!email) {
//         setErrorMessage("Email not found. Please restart the process.");
//         return;
//       }

//       const response = await verifyOTP({ email, otp }).unwrap();
//       console.log("OTP Verification Response:", response);

//       // Redirect to reset password page
//       navigate("/resetPassword");
//     } catch (error) {
//       console.error("OTP Verification Error:", error);
//       setErrorMessage(error?.data?.message || "Invalid OTP. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-[#e1e4ed]">
//       <div className="w-full max-w-md p-6 rounded-lg">
//         <h2 className="text-2xl font-bold text-center text-gray-700">OTP Verification</h2>
//         <p className="mt-2 text-sm text-center text-gray-500">
//           Enter the 4-digit code sent to your email.
//         </p>
//         {errorMessage && (
//           <div className="mt-4 p-2 text-sm text-red-600 bg-red-100 border border-red-400 rounded">
//             {errorMessage}
//           </div>
//         )}
//         <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
//           <div className="flex justify-between">
//             {[...Array(6)].map((_, i) => (
//               <input
//                 key={i}
//                 type="text"
//                 maxLength="1"
//                 {...register(`otp${i + 1}`, {
//                   required: "This field is required",
//                   pattern: {
//                     value: /^[0-9]$/,
//                     message: "Only numbers are allowed",
//                   },
//                 })}
//                 className={`w-14 h-14 font-medium text-xl text-center bg-[#431D5A1A] text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#431D5A] ${
//                   errors[`otp${i + 1}`] ? "border-red-500" : "border-gray-00"
//                 }`}
//               />
//             ))}
//           </div>
//           <div>
//             {Object.keys(errors).length > 0 && (
//               <p className="text-sm text-red-500">All fields are required.</p>
//             )}
//           </div>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full py-3 text-white font-medium rounded-lg focus:outline-none ${
//               isLoading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-[#431D5A]"
//             }`}
//           >
//             {isLoading ? "Verifying..." : "Verify OTP"}
//           </button>
//         </form>
//         <p className="mt-4 text-sm text-center text-gray-600">
//           Didn't receive the OTP?{" "}
//           <button
//             onClick={() => alert("Resend OTP functionality not implemented")}
//             className="font-medium text-blue-600 hover:underline"
//           >
//             Resend
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default OTPVerification;




import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  useVerifyOTPMutation,
  useResendOTPMutation,
  usePerticularUserQuery,
} from "../redux/features/baseApi/baseApi";

const OTPVerification = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const [resendOTP, { isLoading: isResending }] = useResendOTPMutation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { data, error } = usePerticularUserQuery();

  const user = data?.data;

  const onSubmit = async (data) => {
    const otp = Object.values(data).join(""); // Combine OTP digits
    try {
      const email = localStorage.getItem("email");
      if (!email) {
        setErrorMessage("Email not found. Please restart the process.");
        return;
      }

      const response = await verifyOTP({ email, otp }).unwrap();
      console.log("OTP Verification Response:", response);

      // Redirect to reset password page
      navigate("/resetPassword");
    } catch (error) {
      console.error("OTP Verification Error:", error);
      setErrorMessage(error?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  const handleResendOTP = async () => {
    try {
      const email = localStorage.getItem("email");
      if (!email) {
        setErrorMessage("Email not found. Please restart the process.");
        return;
      }

      await resendOTP(email).unwrap();
      setSuccessMessage("OTP has been resent to your email.");
    } catch (error) {
      console.error("Resend OTP Error:", error);
      setErrorMessage(error?.data?.message || "Failed to resend OTP. Try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e1e4ed]">
      <div className="w-full  p-6 rounded-lg">
       <div className=" max-w-3xl text-start mx-auto">
       <h2 className="text-3xl font-bold text-start text-gray-700">Use the Best AI – New Account Verification</h2>
        <p className="mt-2 text-base text-start text-gray-500">
        Enter the code sent to <span className="text-[#431D5A] font-semibold">{user.email}</span></p>
       </div>
        
        {errorMessage && (
          <div className="mt-4 p-2 text-sm text-red-600 bg-red-100 border border-red-400 rounded">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mt-4 p-2 text-sm text-green-600 bg-green-100 border border-green-400 rounded">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4 max-w-md mx-auto">
          <div className="flex justify-between">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                {...register(`otp${i + 1}`, {
                  required: "This field is required",
                  pattern: {
                    value: /^[0-9]$/,
                    message: "Only numbers are allowed",
                  },
                })}
                className={`w-14 h-14 font-medium text-xl text-center bg-[#431D5A1A] text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#431D5A] ${
                  errors[`otp${i + 1}`] ? "border-red-500" : "border-gray-00"
                }`}
              />
            ))}
          </div>
          <div>
            {Object.keys(errors).length > 0 && (
              <p className="text-sm text-red-500">All fields are required.</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 text-white font-medium rounded-lg focus:outline-none ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#431D5A]"
            }`}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Didn't receive the OTP?{" "}
          <button
            onClick={handleResendOTP}
            disabled={isResending}
            className={`font-medium hover:underline ${
              isResending ? "text-gray-400 cursor-not-allowed" : "text-blue-600"
            }`}
          >
            {isResending ? "Resending..." : "Resend"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;

