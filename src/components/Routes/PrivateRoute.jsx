import React, { use } from "react";

import { Navigate, useLocation } from "react-router";
import Loading from "../SharedComponent/Loading";
import { AuthContext } from "../context/AuthContext";


const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }
  if (user && user.email) {
    return children;
  }

  return <Navigate state={location.pathname} to="/logIn"></Navigate>;
};

export default PrivateRoute;
