import React from "react";
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
import { RequireAuth, RequireAdmin, RequireNoAuth } from "../../auth.js";
import CreateAdvertisement from "../../pages/Advertisement/CreateAdvertisement";
import Adverts from "../../pages/Advertisement/Adverts";
import ShowAdvertisement from "../../pages/Advertisement/ShowAdvertisement/ShowAdvertisement";
import CreateComment from "../../pages/Advertisement/ShowAdvertisement/Comment/CreateComment";
import ResetPasswordEmail from "../../pages/ResetPassword/ResetPasswordEmail";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import ChangeRole from "../../pages/Admin/ChangeRole/ChangeRole";

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories/new" element={<CategoryNew />} />
          <Route path="/categories/edit/:id" element={<CategoryEdit />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/sign_in"
            element={
              <RequireNoAuth>
                <SingIn />
              </RequireNoAuth>
            }
          />
          <Route
            path="/sign_up"
            element={
              <RequireNoAuth>
                <SignUp />
              </RequireNoAuth>
            }
          />
          <Route path="*" element={<NoPage />} />
          <Route path="/users/:userId/user_infos" element={<UserInfo />} />
          <Route path="/adverts/:advertId" element={<ShowAdvertisement />} />
          <Route path="/create_advert" element={<RequireAuth><CreateAdvertisement/></RequireAuth>}/>
          <Route path="/adverts/:advertId/edit" element={<RequireAuth><UpdateAdvertisement/></RequireAuth>}/>
          <Route
            path="/adverts/:advertId/comments"
            element={<CreateComment />}
          />
          <Route
            path="/admin/roles"
            element={
              <RequireAdmin>
                <ChangeRole />
              </RequireAdmin>
            }
          />
          <Route path="/adverts" element={<Adverts/>}/>
          {/*<Route path="/adverts/:advertId/edit" element={<UpdateAdvertisement/>}/>*/}
          <Route path="/send_email" element={<ResetPasswordEmail />} />
          <Route path="/password/:resetPasswordToken" element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
