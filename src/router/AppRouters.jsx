import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoute";
import { EuiProgress } from "@elastic/eui";
import { dashboardRoute } from "./routerData";

const Login = lazy(() => import("../pages/auth/Index"));

const Sidebar = lazy(() => import("../layout/Sidebar"));

const AppRouters = () => {
  return (
    <Suspense fallback={<EuiProgress size="xs" color="accent" />}>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Sidebar />} path="/">
            {dashboardRoute.map(({ path, element }) => (
              <Route key={path} path={path} element={element} exact />
            ))}
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouters;
