import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useHandleUnauthorized = (error) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for tokens in localStorage
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    // Redirect if unauthorized or tokens are missing
    if (error?.status === 401 || !accessToken || !refreshToken) {
      navigate("/login"); // Redirect to login page
    }
  }, [error, navigate]);
};

export default useHandleUnauthorized;
