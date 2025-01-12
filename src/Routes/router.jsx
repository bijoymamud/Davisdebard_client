import {createBrowserRouter} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUP/SignUp";
import OTPVerification from "../Pages/SignUP/OTPVerification";
import ManageSubcription from "../Pages/ManageSubcription/ManageSubcription";
import Help_Support from "../Pages/HelpSupport/Help_Support";
import Profile from "../Pages/Profile/Profile"
  
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
            path: '/help&Support',
            element: <Help_Support/>
          },
        
          {
            path: '/userProfile',
            element: <Profile/>
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
    }
  ]);