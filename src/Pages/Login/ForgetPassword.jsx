// Import necessary packages
import { Mail } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useForgetPasswordMutation } from '../redux/features/baseApi/baseApi';
import { useNavigate } from 'react-router-dom';

// Define the ForgotPassword component
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [forgetPassword, {isLoading}] = useForgetPasswordMutation();
  const navigate = useNavigate()
  const onSubmit = (data) => {
   try {
    const response = forgetPassword(data.email).unwrap();
    console.log(response);
    
    localStorage.setItem("email", data.email);
    navigate("/OTPVerification")

   } catch (error) {
    console.error("Forget Password Error", error)
   }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E1E4ED]">
      <div className=" p-8 rounded-md  max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 ">Forgot Password?</h2>
        <p className="font-medium mt-2 text-gray-700">
          Don't worry! It occurs, please enter the email address linked with your account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div className="space-y-2">
              <label className="text-base font-bold text-black">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-300">
                  <Mail size={20} />
                </span>
                <input
                  {...register("email", {
                    required: "Email is required",
                   
                  })}
                  type="email"
                  placeholder="user@email.com"
                  className="w-full px-10 py-3 rounded-lg bg-white/95 text-gray-900 text-base border-2 border-[#431D5A] focus:outline-none"
                />
              </div>
              <p className="text-red-500 text-sm">{errors.email && errors.email.message}</p>
            </div>

          <button
            type="submit"
            className="w-full font-medium bg-[#431D5A] hover:bg-[#2d103f]  text-white py-2.5 px-4 mt-4 rounded-full shadow-md focus:outline-none focus:ring focus:ring-indigo-300"
          >
            Send
          </button>
        </form>

        <p className="mt-4 text-base text-center font-medium text-gray-500">
          Remember Password?{' '}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
