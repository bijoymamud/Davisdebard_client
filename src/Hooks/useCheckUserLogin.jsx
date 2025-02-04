
const useCheckUserLogin = () => {
  // Function to decode JWT and check expiration
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the JWT (base64)
      const expiry = decoded.exp * 1000; // Expiry time in milliseconds
      return Date.now() >= expiry; // Check if the current time is past expiry time
    } catch (e) {
      return true;
    }
  };

  // Get tokens from localStorage
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  // Check if either token is missing or expired
  const isTokenValid = accessToken && refreshToken && !isTokenExpired(accessToken) && !isTokenExpired(refreshToken);

  // If the token is invalid or expired, return false
//   if (!isTokenValid) return { isLoading: false, user: null, error: null, isAuthenticated: false };


  return { isUser: isTokenValid};
};

export default useCheckUserLogin;
