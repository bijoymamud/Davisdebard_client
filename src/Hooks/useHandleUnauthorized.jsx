// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const useHandleUnauthorized = (error) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check for tokens in localStorage
//     const accessToken = localStorage.getItem("access_token");
//     const refreshToken = localStorage.getItem("refresh_token");

//     // Redirect if unauthorized or tokens are missing
//     if (error?.status === 401 || !accessToken || !refreshToken) {
//       navigate("/login"); // Redirect to login page
//     }
//   }, [error, navigate]);
// };

// export default useHandleUnauthorized;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useHandleUnauthorized = (error) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for tokens in localStorage
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    // Function to check if token is expired
    const isTokenExpired = (token) => {
      if (!token) return true; // If there's no token, it's expired
      
      // Decode the token (base64url decoded)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = JSON.parse(atob(base64));
      
      // Check if the token is expired
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decoded.exp < currentTime; // Token is expired if exp < currentTime
    };

    // Redirect if unauthorized, tokens are missing, or token is expired
    if (error?.status === 401 || !accessToken || !refreshToken || isTokenExpired(accessToken)) {
      navigate("/login"); // Redirect to login page
    }
  }, [error, navigate]);
};

export default useHandleUnauthorized;
