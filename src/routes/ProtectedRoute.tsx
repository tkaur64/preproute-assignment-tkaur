import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { getToken } from "../utils/storage";

const ProtectedRoute = () => {
  const token = getToken();

  return token ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

export default ProtectedRoute;