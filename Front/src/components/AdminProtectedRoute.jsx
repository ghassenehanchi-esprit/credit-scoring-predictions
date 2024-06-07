import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../components/UseAuth"; 
import { useEffect } from "react";

const AdminProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.access !== 'Admin') {
      // Set a short timeout to ensure the state is passed before redirecting
      const timer = setTimeout(() => {
        // Pass the error state to the home page
        navigate("/", { replace: true, state: { error: "403 - Forbidden: Access is denied." } });
      }, 50); // Redirect shortly after

      // Clear the timeout if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminProtectedRoute;
