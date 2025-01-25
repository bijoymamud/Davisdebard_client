import {createBrowserRouter} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUP/SignUp";
import OTPVerification from "../Pages/SignUP/OTPVerification";
import ManageSubcription from "../Pages/ManageSubcription/ManageSubcription";
import Help_Support from "../Pages/HelpSupport/Help_Support";
import Profile from "../Pages/Profile/Profile"
import Faq from "../Pages/Faq/Faq";
import ChatHistory from "../Pages/Home/ChatHistory/ChatHistory";
import ForgotPassword from "../Pages/Login/ForgetPassword";
import ResetPassword from "../Pages/Login/ResetPassword";
import HelpSupportThank from "../Pages/HelpSupport/HelpSupportThank";
import ChangePassSuccessFull from '../Pages/Login/ChangePassSuccessfull'
  
export const router = createBrowserRouter([
    {
      path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home/>
          },
          {
            path: '/manageSubcription',
            element: <ManageSubcription/>
          },
          {
            path: '/Support',
            element: <Help_Support/>
          },
          {
            path: '/faq',
            element: <Faq/>
          },
        
          {
            path: '/userProfile',
            element: <Profile/>
          },
          {
            path: '/chatHistory',
            element: <ChatHistory/>
          }, 
          {
            path: "/helpSupportThank",
            element: <HelpSupportThank/>
          }, 
         
      ]
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/signup',
      element:<SignUp/> 
    }, 
    {
      path:'/OTPVerification',
      element: <OTPVerification/>
    }, 
    {
      path: '/forgetPassword',
      element: <ForgotPassword/>
    },
    {
      path: '/resetPassword',
      element: <ResetPassword/>
    },
    {
      path: "/changePassSuccessfull", 
      element: <ChangePassSuccessFull/>
    }
  ]);