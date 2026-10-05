import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const normalizeUser = (rawUser) => {
  if (!rawUser) return null;

  if (typeof rawUser === "string") {
    try {
      return JSON.parse(rawUser);
    } catch {
      return null;
    }
  }

  if (rawUser.user) return rawUser.user;
  if (rawUser.data) {
    if (rawUser.data.user) return rawUser.data.user;
    return rawUser.data;
  }

  return rawUser;
};

export const checkSessionValidity = () => {
  const token = localStorage.getItem("token");
  const localUser = localStorage.getItem("lokartUser");

  if (!token) {
    return { isValid: false, user: null };
  }

  let user = null;

  if (localUser) {
    try {
      user = normalizeUser(JSON.parse(localUser));
    } catch {
      localStorage.removeItem("lokartUser");
    }
  }

  return { isValid: true, user };
};

const isAdminUser = (user) => {
  const role = user?.role;
  return typeof role === "string" && role.toLowerCase() === "admin";
};

export function ProtectedRoute() {
  const location = useLocation();
  const { isValid } = checkSessionValidity();

  if (!isValid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export function AdminRoute() {
  const { isValid, user } = checkSessionValidity();

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdminUser(user)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export function PublicOnlyRoute() {
  const location = useLocation();
  const { isValid, user } = checkSessionValidity();

  if (isValid) {
    const from = location.state?.from;
    const requestedPath =
      typeof from === "string"
        ? from
        : from?.pathname
          ? `${from.pathname}${from.search || ""}${from.hash || ""}`
          : null;

    return (
      <Navigate
        to={requestedPath || (isAdminUser(user) ? "/admin" : "/dashboard")}
        replace
      />
    );
  }

  return <Outlet />;
}