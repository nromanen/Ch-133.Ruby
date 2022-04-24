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
/*
users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">
                    <CustomizedMenus/>
                    </TableCell>
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell align="right">{user.nick_name}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.role_id}</TableCell>
                  <TableCell align="right">{user.created_at}</TableCell>
                  <TableCell align="right">
                    <a href={`/users/${user.id}/user_infos`}>info_link</a>
                  </TableCell>
                </TableRow>
              ))
*/ 