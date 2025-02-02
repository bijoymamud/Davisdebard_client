import { usePerticularUserQuery } from "../Pages/redux/features/baseApi/baseApi";

const useUserInfo = () => {
    // Call the API query hook
    const { data, error, isLoading } = usePerticularUserQuery();

    // Handle different states
    if (isLoading) return { isLoading, user: null, error: null };
    if (error) return { isLoading: false, user: null, error };

    // Extract user data (assuming the API returns an array of users)
    const user = data?.data|| null;
    console.log(user) // Modify if API returns a single object

    return { isLoading: false, user, error: null };
};

export default useUserInfo;
