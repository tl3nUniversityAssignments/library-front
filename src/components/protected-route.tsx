import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useLocation, useNavigate } from "@tanstack/react-router";
import React from "react";
import { useEffect, useState } from "react";
import { isLibrarian } from "@/lib/utils";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireLibrarian?: boolean;
}

export function ProtectedRoute({
  children,
  requireLibrarian = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth0();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (requireLibrarian && !isLibrarian()) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
