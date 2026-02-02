import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRouteAlt = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

  // Still checking auth (getCurrentUser running)
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  // Not logged in
  if (user.username) {
    return <Navigate to="/" replace />;
  }

  // Logged in → allow route
  return <Outlet />;
};

export default ProtectedRouteAlt;
