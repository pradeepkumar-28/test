import { Outlet, Navigate } from "react-router-dom";
import { getLocalStorageData } from "../helper/helper";

const PrivateRoutes = () => {
  const userAuthData = getLocalStorageData("userAuth");

  return <Outlet />;
};

export default PrivateRoutes;
