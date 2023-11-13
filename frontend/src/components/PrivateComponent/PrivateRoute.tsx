import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { User } from "../../context/authSlice";

export interface Auth {
  auth: {
    userInfo: User;
  };
}

const PrivateRoute = () => {
  const { userInfo } = useSelector((state: Auth) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="login" replace />;
};

export default PrivateRoute;
