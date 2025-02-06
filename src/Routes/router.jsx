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
import PaymentSuccess from "../Pages/ManageSubcription/PaymentSuccess";
import PaymentCancle from "../Pages/ManageSubcription/PaymentCancle";
import BillingInfo from "../Pages/BillingInfo/BillingInfo";
import ChatInterface from "../Pages/Home/ChatInterface";
import Error from "../Pages/Error/Error";
import Terms from "../Pages/TermsCondition/Terms";
import Policy from "../Pages/Policy/Policy";
  
export const router = createBrowserRouter([
    {
      path: "/",
        element: <Main />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home/>
          },
            {
                path: '/chat/:id',
                element: <ChatInterface/>
          },
          {
            path: '/manageSubcription',
            element: <ManageSubcription/>
          },
          {
            path: "/paymentSuccess",
            element: <PaymentSuccess/>
          },
          {
            path: "/paymentCancel",
            element: <PaymentCancle/>
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
            path: '/terms',
            element: <Terms/>
          },
          {
            path: '/policy',
            element: <Policy/>
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
            path: '/chatHistory/:id',
            element: <ChatHistory/>
          }, 
          {
            path: "/helpSupportThank",
            element: <HelpSupportThank/>
          }, 
          {
            path: "/billingInfo",
            element: <BillingInfo/>
          }
         
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
    },
    {
      path: "*",
      element: <Error />, 
    },
  ]);

