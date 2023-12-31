import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component, authenticated, redirectTo, ...rest }) => {
  return (
    <Route
      {...rest}
      element={authenticated ? <Component {...rest} /> : <Navigate to={redirectTo} />}
    />
  );
};

export default PrivateRoute;
