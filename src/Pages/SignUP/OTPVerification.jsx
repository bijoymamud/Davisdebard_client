// import React, { useState } from "react";
// import { useForm, Controller } from "react-hook-form";

// const OTPVerification = () => {
//   const { control, handleSubmit, reset } = useForm();
//   const [otpSent, setOtpSent] = useState(false);

//   const onSubmit = (data) => {
//     console.log("OTP Submitted: ", data.otp.join(""));
//     reset();
//   };

//   const handleButtonClick = () => {
//     if (!otpSent) {
//       setOtpSent(true);
//       console.log("OTP Sent to Email");
//       alert("OTP Sent to your Email!");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-[#E1E4ED]">
//       <div className="w-full max-w-2xl p-6  rounded-lg ">
//         <div>
//         <h2 className="text-2xl font-semibold w-full ">Use the Best AI – New Account Verification</h2>
//         <p className="text-sm text-gray-600 mb-10 ">
//         Enter the code sent to <span className="text-[#431D5A] font-semibold ">Bill****@Example.com</span>
//         </p>
//         </div>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-2/3 mx-auto">
//           <div className="flex justify-between">
//             {[...Array(6)].map((_, index) => (
//               <Controller
//                 key={index}
//                 name={`otp[${index}]`}
//                 control={control}
//                 defaultValue=""
//                 rules={{
//                   required: "This field is required",
//                   pattern: {
//                     value: /^[0-9]$/,
//                     message: "Only numbers are allowed",
//                   },
//                 }}
//                 render={({ field }) => (
//                   <input
//                     {...field}
//                     type="number"
//                     maxLength="1"
//                     className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#431D5A] bg-[#431D5A1A]"
//                     onInput={(e) => {
//                       const value = e.target.value.replace(/[^0-9]/g, "");
//                       field.onChange(value);
//                     }}
//                   />
//                 )}
//               />
//             ))}
//           </div>
//           <div className="flex justify-center">
//             <button
//               type={otpSent ? "submit" : "button"}
//               onClick={!otpSent ? handleButtonClick : undefined}
//               className="w-full h-12 mt-5 text-white font-medium bg-[#431D5A] rounded-full hover:bg-[#2d103f] focus:outline-none focus:ring-2 focus:ring-purple-500"
//             >
//               {otpSent ? "Enter Site" : "Get OTP"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OTPVerification;


// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useVerifyOTPMutation } from "../redux/features/baseApi/baseApi";

// const OTPVerification = () => {
//   const { control, handleSubmit, reset } = useForm();
//   const [verifyOTP] = useVerifyOTPMutation();
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       const email = localStorage.getItem("email"); // Fetch the stored email
//       if (!email) {
//         alert("Email not found. Please restart the process.");
//         return;
//       }

//       const otp = Object.values(data).join(""); // Combine OTP digits into a single string
//       const response = await verifyOTP({ email, otp }).unwrap();
//       console.log("OTP Verification Response:", response);

//       // Redirect to reset password page on success
//       navigate("/reset-password");
//     } catch (error) {
//       console.error("OTP Verification Error:", error);
//       alert("OTP verification failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-[#E1E4ED]">
//       <div className="w-full max-w-2xl p-6 rounded-lg bg-white shadow">
//         <div>
//           <h2 className="text-2xl font-semibold w-full">
//             New Account Verification
//           </h2>
//           <p className="text-sm text-gray-600 mb-10">
//             Enter the code sent to your email.
//           </p>
//         </div>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-2/3 mx-auto">
//           <div className="flex justify-between">
//             {[...Array(6)].map((_, index) => (
//               <Controller
//                 key={index}
//                 name={`otp[${index}]`}
//                 control={control}
//                 defaultValue=""
//                 rules={{
//                   required: "This field is required",
//                   pattern: {
//                     value: /^[0-9]$/,
//                     message: "Only numbers are allowed",
//                   },
//                 }}
//                 render={({ field }) => (
//                   <input
//                     {...field}
//                     type="text"
//                     maxLength="1"
//                     className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#431D5A] bg-[#431D5A1A]"
//                     onInput={(e) => {
//                       const value = e.target.value.replace(/[^0-9]/g, "");
//                       field.onChange(value);
//                     }}
//                   />
//                 )}
//               />
//             ))}
//           </div>
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="w-full h-12 mt-5 text-white font-medium bg-[#431D5A] rounded-full hover:bg-[#2d103f] focus:outline-none focus:ring-2 focus:ring-purple-500"
//             >
//               Verify OTP
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default OTPVerification;




import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useVerifyOTPMutation } from "../redux/features/baseApi/baseApi";

const OTPVerification = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">OTP Verification</h2>
        <p className="mt-2 text-sm text-center text-gray-500">
          Enter the 4-digit code sent to your email.
        </p>
        {errorMessage && (
          <div className="mt-4 p-2 text-sm text-red-600 bg-red-100 border border-red-400 rounded">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
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
                className={`w-12 h-12 text-center text-gray-800 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[`otp${i + 1}`] ? "border-red-500" : "border-gray-300"
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
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Didn't receive the OTP?{" "}
          <button
            onClick={() => alert("Resend OTP functionality not implemented")}
            className="font-medium text-blue-600 hover:underline"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;

