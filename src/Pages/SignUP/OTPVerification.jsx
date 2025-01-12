import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const OTPVerification = () => {
  const { control, handleSubmit, reset } = useForm();
  const [otpSent, setOtpSent] = useState(false);

  const onSubmit = (data) => {
    console.log("OTP Submitted: ", data.otp.join(""));
    reset();
  };

  const handleButtonClick = () => {
    if (!otpSent) {
      setOtpSent(true);
      console.log("OTP Sent to Email");
      alert("OTP Sent to your Email!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="w-full max-w-md p-6 bg-white rounded-lg ">
        <h2 className="text-[36px] font-semibold">OTP Verification</h2>
        <p className="text-[16px] text-gray-600 mb-10">
          Enter OTP Sent To <span className="text-[#431D5A] font-semibold">Bill****@Example.com</span>
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-between">
            {[...Array(5)].map((_, index) => (
              <Controller
                key={index}
                name={`otp[${index}]`}
                control={control}
                defaultValue=""
                rules={{
                  required: "This field is required",
                  pattern: {
                    value: /^[0-9]$/,
                    message: "Only numbers are allowed",
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    maxLength="1"
                    className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#431D5A] bg-[#431D5A1A]"
                    onInput={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      field.onChange(value);
                    }}
                  />
                )}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <button
              type={otpSent ? "submit" : "button"}
              onClick={!otpSent ? handleButtonClick : undefined}
              className="w-full h-12 mt-5 text-white font-medium bg-[#431D5A] rounded-full hover:bg-[#2d103f] focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {otpSent ? "Submit OTP" : "Get OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;


