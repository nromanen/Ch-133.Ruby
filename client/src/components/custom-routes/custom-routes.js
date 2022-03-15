import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../../pages/Layout";
import SingIn from "../../pages/SingIn/SingIn";
import NoPage from "../../pages/NoPage/NoPage";
import SignUp from "../../pages/SignUp/SignUp";
import UserInfo from "../../pages/UserInfo/UserInfo";

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/sign_in" element={<SingIn />} />
            <Route path="/sign_up" element={<SignUp />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/users/:userId/user_infos" element={<UserInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
