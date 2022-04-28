import React from 'react';
import { Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';
const loginPath = '/sign_in'

const Role = {
  User: 'User',
  Admin: 'Admin',
  Unauthorized: null
}

export function RequireAuth({ children }) {
  let role = localStorage.getItem('role')
  if (role == Role.Admin || role == Role.User) {
    return children;
  } else {
    return <Navigate to={loginPath} replace />
  }
}

export function RequireAdmin({ children }) {
  return localStorage.getItem('role') === Role.Admin ? children : <Navigate to={loginPath} replace />;
}

export function RequireNoAuth({ children }) {
  return localStorage.getItem('role') === Role.Unauthorized ? children : <Navigate to={"/"} replace />;
}