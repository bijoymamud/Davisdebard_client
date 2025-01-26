// import { useForm } from "react-hook-form"
// import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
// import { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { useLoggedUserMutation } from "../redux/features/baseApi/baseApi"


// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false)
//   const { register, handleSubmit, reset } = useForm()
//   const [loggedUser, {isLoading}] = useLoggedUserMutation()
//   const navigate = useNavigate();


//   const onSubmit = async  (userData) => {
//     try {
//       const loginResponse = await  loggedUser(userData).unwrap();
//       console.log("logged in response", loginResponse);
  
//       //store loggedin user name
//       localStorage.setItem("userData", JSON.stringify(userData));
//       // Save the access_token in localStorage
//       localStorage.setItem("access_token", loginResponse.data.access_token);

//       localStorage.setItem("refresh_token", loginResponse.data.refresh_token);
  
//       // Display the token in the console
//       console.log("Access Token:", localStorage.getItem("access_token"));
  
//       // Navigate to the home page
//       navigate("/");
//     } catch (error) {
//       console.log("Login error", error);
//     }
//   };
  


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#E1E4ED]">
//       <div className="w-full max-w-2xl p-8 rounded-2xl py-32">
//         <div className="space-y-6">
//           <div className="space-y-2 text-center md:text-start mb-10">
//             <h1 className="text-3xl font-bold text-black">Use the Best AI</h1>
//             <p className="text-[#3C3C3C] font-medium">
//               Please Enter Your Details Below
//             </p>
//           </div>

//           {/* Form with react-hook-form */}
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             {/* Email Field */}
//             <div className="space-y-2">
//               <label className="text-base font-bold text-black">Your Email</label>
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-3 flex items-center text-gray-300">
//                   <Mail size={20} />
//                 </span>
//                 <input
//                   {...register("email", { required: "Email is required" })}
//                   type="email"
//                   placeholder="user@email.com"
//                   className="w-full px-10 py-3 rounded-lg bg-white/95 text-gray-900 text-base border-2 border-[#431D5A] focus:outline-none"
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div className="space-y-2">
//               <label className="text-base font-bold text-black">Password</label>
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-3 flex items-center text-gray-300">
//                   <Lock size={20} />
//                 </span>
//                 <input
//                   {...register("password", { required: "Password is required" })}
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   className="w-full px-10 py-3 rounded-lg bg-white/95 text-gray-900 text-base focus:outline-none pr-10 border-2 border-[#431D5A]"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
//                 >
//                   {showPassword ? (
//                     <EyeOff size={20} className="text-[#431D5A]" />
//                   ) : (
//                     <Eye size={20} className="text-[#431D5A]" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Remember Password and Forgot Password */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   {...register("rememberPassword")}
//                   type="checkbox"
//                   id="remember"
//                   className="appearance-none h-4 w-4 rounded-[5px] border border-[#431D5A] checked:bg-[#431D5A] focus:ring-[#431D5A] cursor-pointer"
//                 />
//                 <label
//                   htmlFor="remember"
//                   className="ml-2 text-sm text-black font-medium"
//                 >
//                   Remember Password
//                 </label>
//               </div>
//               <Link to="/forgetPassword" className="text-sm text-black font-medium">
//                 Forgot password?
//               </Link>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full border-none py-2.5 px-4 mt-3 text-sm font-medium text-white bg-[#431D5A] rounded-full hover:bg-[#2d103f] transition-colors"
//             >
//               LOG IN
//             </button>
//           </form>

//           <h1 className="font-medium text-center text-[#565656]">
//             Don't have an account?{" "}
//             <Link to="/signup" className="text-blue-600 font-bold">
//               Sign Up
//             </Link>
//           </h1>
//         </div>
//       </div>
//     </div>
//   )
// }




import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoggedUserMutation } from "../redux/features/baseApi/baseApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles for React Toastify

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [loggedUser, { isLoading }] = useLoggedUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (userData) => {
    try {
      const loginResponse = await loggedUser(userData).unwrap();
      console.log("Logged in response", loginResponse);

      // Store logged-in user data
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("access_token", loginResponse.data.access_token);
      localStorage.setItem("refresh_token", loginResponse.data.refresh_token);

      // Show success toast
      toast.success("Logged in successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Navigate to the home page after a slight delay to allow the toast to show
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log("Login error", error);

      // Show error toast
      toast.error("Login failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E1E4ED]">
      {/* Toast Container */}
      <ToastContainer />

      <div className="w-full max-w-2xl p-8 rounded-2xl py-32">
        <div className="space-y-6">
          <div className="space-y-2 text-center md:text-start mb-10">
            <h1 className="text-3xl font-bold text-black">Use the Best AI</h1>
            <p className="text-[#3C3C3C] font-medium">
              Please Enter Your Details Below
            </p>
          </div>

          {/* Form with react-hook-form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-base font-bold text-black">Your Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-300">
                  <Mail size={20} />
                </span>
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  placeholder="user@email.com"
                  className="w-full px-10 py-3 rounded-lg bg-white/95 text-gray-900 text-base border-2 border-[#431D5A] focus:outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-base font-bold text-black">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-300">
                  <Lock size={20} />
                </span>
                <input
                  {...register("password", { required: "Password is required" })}
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
                    <EyeOff size={20} className="text-[#431D5A]" />
                  ) : (
                    <Eye size={20} className="text-[#431D5A]" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Password and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  {...register("rememberPassword")}
                  type="checkbox"
                  id="remember"
                  className="appearance-none h-4 w-4 rounded-[5px] border border-[#431D5A] checked:bg-[#431D5A] focus:ring-[#431D5A] cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-black font-medium"
                >
                  Remember Password
                </label>
              </div>
              <Link
                to="/forgetPassword"
                className="text-sm text-black font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full border-none py-2.5 px-4 mt-3 text-sm font-medium text-white bg-[#431D5A] rounded-full hover:bg-[#2d103f] transition-colors"
            >
              Login
            </button>
          </form>

          <h1 className="font-medium text-center text-[#565656]">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-bold">
              Sign Up
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
}



