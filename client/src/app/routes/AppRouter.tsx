import { Navigate, Route, Routes } from "react-router-dom";
import AppRoutes, { type IRoute } from "./routes";
import React, { Suspense } from "react";
import Loading from "../../../common/Loading";

const getRouteElement = (route: IRoute) => {
  if (!route.Component) return <Navigate to="/" replace />;
  return route.requiresAuth ? <route.Component /> : <route.Component />;
};

const renderRoutes = (routes: IRoute[]) => {
  return routes.map((route) => {
    if (route.children) {
      return (
        <Route
          key={route.path || "index"}
          path={route.path}
          element={getRouteElement(route)}
        >
          {renderRoutes(route.children)}
        </Route>
      );
    }
    return (
      <Route
        index={!!route.index}
        key={route.path || "index"}
        path={route.path}
        element={getRouteElement(route)}
      />
    );
  });
};

export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {renderRoutes(AppRoutes)}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
