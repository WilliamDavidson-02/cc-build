import { useUser } from "@/context/userContext";
import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute: FC = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!user) {
    return <Navigate to={"/sign-in"} />;
  }

  return <Outlet />;
};

export default AuthRoute;
