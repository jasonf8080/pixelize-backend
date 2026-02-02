import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestRoute = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

  // Still checking auth
  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  // Already logged in → block auth pages
  if (user) {
    return <Navigate to={`/myprofile/${user.username}`} replace />;
  }

  // Not logged in → allow login/register
  return <Outlet />;
};

export default GuestRoute;
