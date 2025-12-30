// src/PublicRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "./auth";

const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    // Redirect based on role
    return getUserRole() === "ADMIN"
      ? <Navigate to="/admin" replace />
      : <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
