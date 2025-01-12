"use client"

import { useForm } from "react-hook-form"
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useState } from "react"
import { Link } from "react-router-dom"

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    reset()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E1E4ED]">
      <div className="w-full max-w-2xl p-8 rounded-2xl py-32 ">
        <div className="space-y-6">
          <div className="space-y-2 text-start mb-10">
            <h1 className="text-3xl font-bold text-black ">Create account</h1>
            <p className="text-[#3C3C3C] font-medium">
            Enter the email address associated with your account. We'll send you an OTP to your email. 
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-base font-bold text-black">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-300">
                  <Mail size={20} />
                </span>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="user@email.com"
                  className="w-full px-10 py-3 rounded-lg bg-white/95 text-gray-900 text-base border-2 border-[#431D5A] focus:outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-base font-bold text-black">New Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-300">
                  <Lock size={20} />
                </span>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-10 py-3 rounded-lg bg-white/95 text-gray-900 text-base focus:outline-none pr-10 border-2 border-[#431D5A]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-[#431D5A]"/>
                  ) : (
                    <Eye size={20} className="text-[#431D5A]"/>
                  )}
                </button>
              </div>
            </div>

            {/* confirm password Field */}

     {/* Confirm Password Field */}
<div className="space-y-2">
  <label className="text-base font-bold text-black">Confirm Password</label>
  <div className="relative">
    <span className="absolute inset-y-0 left-3 flex items-center text-gray-300">
      <Lock size={20} />
    </span>
    <input
      {...register("confirmPassword")}
      type={showConfirmPassword ? "text" : "password"}
      placeholder="••••••••"
      className="w-full px-10 py-3 rounded-lg bg-white/95 text-gray-900 text-base focus:outline-none pr-10 border-2 border-[#431D5A]"
    />
    <button
      type="button"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
    >
      {showConfirmPassword ? (
        <EyeOff size={20} className="text-[#431D5A]"/>
      ) : (
        <Eye size={20} className="text-[#431D5A]"/>
      )}
    </button>
  </div>
</div>


            {/* Remember Password and Forgot Password */}
           

            {/* Submit Button */}
          <Link 
          className=""
          to="/OTPVerification">
          <button
              type="submit"
              className="mt-5 w-full border-none py-3 text-sm font-medium text-white bg-[#431D5A] rounded-full hover:bg-[#2d103f] transition-colors uppercase"
            >
             sign up
            </button>
          </Link>
          </form>

          <h1 className="font-medium text-center text-[#565656]">Already have an account ? <Link to="/login" className="text-blue-600 font-bold">LogIn</Link></h1>

        </div>
      </div>
    </div>
  )
}
