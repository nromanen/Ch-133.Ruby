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
import CategoryEdit from "../../pages/Category/CategoryEdit";
import CreateAdvertisement from "../../pages/Advertisement/CreateAdvertisement";
import RequireAuth from '../../auth.js'

const CustomRoutes = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories/new" element={<CategoryNew />} />
          <Route path="/categories/edit/:id" element={<CategoryEdit />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/sign_in" element={<SingIn />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/create_advert" element={<CreateAdvertisement/>}/>
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
