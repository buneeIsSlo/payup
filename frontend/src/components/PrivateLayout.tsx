import { useAuthContext } from "@/hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

const PrivateLayout = () => {
  const { state } = useAuthContext();
  if (state.user === null || state.user === undefined) {
    return <Navigate to={"/login"} replace />;
  }

  return <DashboardLayout />;
};

export default PrivateLayout;
