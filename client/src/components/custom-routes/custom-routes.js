import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../../pages/Layout";
import SingIn from "../../pages/SingIn/SingIn";
import NoPage from "../../pages/NoPage/NoPage";
import SignUp from "../../pages/SignUp/SignUp";
import Home from "../../pages/Home/Home";
import UserInfo from "../../pages/UserInfo/UserInfo";
import CategoryNew from "../../pages/Category/CategoryNew";
import Categories from "../../pages/Category/Categories";
import RequireAuth from '../../auth.js'

const CustomRoutes = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories/new" element={
              <RequireAuth>
                <CategoryNew/>
              </RequireAuth>
            } 
          />
          <Route path="/categories" element={<Categories />} />
          <Route path="/sign_in" element={<SingIn />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/users/:userId/user_infos" element={
              <RequireAuth>
                <UserInfo/>
              </RequireAuth>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
