import React from 'react';
import { Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';
const loginPath = '/sign_in'

const Role = {
  User: 'User',
  Admin: 'Admin',
  Unauthorized: null
}

export default function RequireAuth({ children }) {
  return localStorage.getItem('role') === Role.User ? children : <Navigate to={loginPath} replace />;
}

function RequireAdmin({ children }) {
  return localStorage.getItem('role') === Role.Admin ? children : <Navigate to={loginPath} replace />;
}
