import React from 'react';
import jwt from 'jwt-decode';
import { Navigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('user-info');
const loginPath = '/sign_in'

const Role = {
  User: 'User',
  Admin: 'Admin',
  Unauthorized: null
}

const getRole = () => {
  let role = null
  if (token) {
    let decoded = jwt(token);
    role = decoded["role"];
  }
  return role
}

export default function RequireAuth({ children }) {
  const role = getRole()
  return role === Role.User ? children : <Navigate to={loginPath} replace />;
}

function RequireAdmin({ children }) {
  const role = getRole()
  return role === Role.Admin ? children : <Navigate to={loginPath} replace />;
}
