import React, { Component }  from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../../pages/Layout";
import SingIn from "../../pages/SingIn/SingIn";
import NoPage from "../../pages/NoPage/NoPage";
import SignUp from "../../pages/SignUp/SignUp";
import Home from "../../pages/Home/Home";
import UserInfo from "../../pages/UserInfo/UserInfo";
import CategoryNew from "../../pages/Category/CategoryNew";
import Categories from "../../pages/Category/Categories";
import RequireAuth from '../../signed_in.js';
import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';
import LoggedContext from '../../context';
import { useContext } from 'react';

const UserRole = () => {
  const { logged, setLogged } = useContext(LoggedContext);
  const [role, setRole] = useState('');
  const cookies = new Cookies();

  useEffect(() => {
    let condion = localStorage.getItem('logged')
    if(logged) {
       let token = cookies.get('user-info');
       setRole(jwt(token)["role"]);
       localStorage.setItem('role', role);
    } else {
       localStorage.setItem('role', null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <></>
  );
}

const CustomRoutes = () => {
  return (
    <>
    <UserRole/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories/new" element={
            <RequireAuth>
              <CategoryNew/>
            </RequireAuth>
           } />
          <Route path="/categories" element={<Categories />} />
          <Route path="/sign_in" element={<SingIn />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/users/:userId/user_infos" element={
            <RequireAuth>
              <UserInfo/>
            </RequireAuth>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default CustomRoutes;
