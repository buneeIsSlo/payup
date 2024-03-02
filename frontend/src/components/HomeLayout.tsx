import { useAuthContext } from "@/hooks/useAuthContext";
import { Navigate, Outlet } from "react-router-dom";

const HomeLayout = () => {
  const { state } = useAuthContext();

  if (state.user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default HomeLayout;
