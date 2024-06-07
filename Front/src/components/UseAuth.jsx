import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage if available
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();

  useEffect(() => {
    // Save user to localStorage whenever it changes
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  // Call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data); // Assume data contains the user information

    // Redirect based on the user's role or access
    if (!data.is_verified) {
      navigate("/SetNewPassword"); // Redirect to the SetNewPassword route
    } else {
      // Navigate based on user role
      if (data.access === 'Admin') {
        navigate("/Admin");
      } else if (data.role === 'Small') {
        navigate(`/SmallEntreprise/${data.id}`);
      } else if (data.role === 'Individual') {
        navigate(`/Individual/${data.id}`);
      } else {
        navigate("/"); // Redirect to the home page or another default page
      }}
  };

  // Call this function to sign out the logged-in user
  const logout = () => {
    const userId = user.id; // Replace with the correct reference to the user's ID

    axios.post(`http://127.0.0.1:5000/logout/${userId}`)
      .then(response => {
        console.log(response.data.message);
        setUser(null); // Clear user state
        localStorage.removeItem('user'); // Remove user from localStorage
        navigate("/", { replace: true });
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
