import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loading } from "../components";

const ProtectedRoute = () => {
  const { user, isLoading, authChecked } = useSelector((state) => state.auth);

  // Wait until we've actually checked auth at least once
  if (!authChecked || isLoading) {
    return <Loading/>;
  }

  if (!user?.username) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
