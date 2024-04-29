import * as React from "react";

// import lazy components
const Home = React.lazy(() => import("../pages/HomePage"));
const MovieDetail = React.lazy(() => import("../pages/MovieDetail"));
const AllContent = React.lazy(() => import("../pages/AllContent"));

export const dashboardRoute = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/movies/:id",
    element: <MovieDetail />,
  },
  {
    path: "/AllContent",
    element: <AllContent />,
  },
];
