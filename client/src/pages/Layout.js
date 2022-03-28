import { Outlet, Link } from "react-router-dom";
import React, { Component }  from 'react';
import Header from '../components/header/header';

const Layout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
};

export default Layout;
