import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const token = sessionStorage.getItem("token");
  return token != null ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;