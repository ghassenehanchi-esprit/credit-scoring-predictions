import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from './UseAuth';

const UserProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const params = useParams();

  if (!user) {
    // User is not authenticated
    return <Navigate to="/login" />;
  }

  // Check if the user role matches the route parameter
  const userHasAccess = (user.role === 'Small' && params.user_id === user.id.toString()) ||
                        (user.role === 'Individual' && params.user_id === user.id.toString())||(user.role === 'Large' && params.user_id === user.id.toString());

  if (!userHasAccess) {
    // User does not have access to this dashboard
    return <Navigate to="/" state={{ error: "403 - Forbidden" }} />;
  }

  // User is authenticated and has access to this dashboard
  return children;
};

export default UserProtectedRoute;
