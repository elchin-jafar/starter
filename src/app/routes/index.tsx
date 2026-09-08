import { lazy } from "react";
import { useRoutes, type RouteObject } from "react-router";

const AllUsersPage = lazy(() => import("../../ui/pages/users"));
const UserPage = lazy(() => import("../../ui/pages/user"));

const AppRoutes = () => {
  const routesConfig: RouteObject[] = [
    {
      path: "/",
      element: <AllUsersPage />,
    },
    {
      path: "/user/:id",
      element: <UserPage />,
    },
    {
      path: "*",
      element: <>Not Found</>,
    },
  ];

  const routes = useRoutes(routesConfig);

  return routes;
};

export default AppRoutes;
