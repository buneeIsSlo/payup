import { useAuthContext } from "@/hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import { TChildren } from "@/lib/types";

const PrivateRoute = ({ children }: TChildren) => {
  const { state } = useAuthContext();
  if (state.user === null || state.user === undefined) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default PrivateRoute;
