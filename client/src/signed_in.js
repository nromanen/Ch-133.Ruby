import React from 'react';
import jwt from 'jwt-decode';
import { Navigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
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
