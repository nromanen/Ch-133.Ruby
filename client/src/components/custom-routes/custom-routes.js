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
import CreateAdvertisement from "../../pages/Advertisement/CreateAdvertisement";
import Adverts from "../../pages/Advertisement/Adverts";
import UpdateAdvertisement from "../../pages/Advertisement/UpdateAdvertisement";
import RequireAuth from '../../auth.js'
import ShowAdvertisement from "../../pages/Advertisement/ShowAdvertisement/ShowAdvertisement";
import CreateComment from "../../pages/Advertisement/ShowAdvertisement/Comment/CreateComment";
import ResetPasswordEmail from "../../pages/ResetPassword/ResetPasswordEmail";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";

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
          <Route path="/users/:userId/user_infos" element={<UserInfo />} />
          <Route path="/adverts/:advertId" element={<ShowAdvertisement />} />
          <Route path="/adverts/:advertId/comments" element={<CreateComment />} />
          <Route path="/create_advert" element={<CreateAdvertisement/>}/>
          <Route path="/adverts" element={<Adverts/>}/>
          <Route path="/adverts/:advertId/edit" element={<UpdateAdvertisement/>}/>
          <Route path="/send_email" element={<ResetPasswordEmail />} />
          <Route path="/password/:resetPasswordToken" element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
