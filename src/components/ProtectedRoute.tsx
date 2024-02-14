import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  children?: ReactElement;
  isAuthenticated: boolean;
  adminRoute?: boolean;
  isAdmin?: boolean;
  redirect?: string;
};

const ProtectedRoute = ({
  children,
  isAuthenticated,
  adminRoute,
  isAdmin,
  redirect = "/",
}: ProtectedRouteProps) => {
  if (!isAuthenticated) return <Navigate to={redirect} />;

  if (adminRoute && !isAdmin) return <Navigate to={redirect} />;

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
