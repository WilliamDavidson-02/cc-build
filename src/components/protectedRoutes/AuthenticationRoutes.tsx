import { useUser } from "@/context/userContext";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthenticationRoutes: FC = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (user) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};

export default AuthenticationRoutes;
