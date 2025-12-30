// src/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // If not logged in, redirect to login
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
