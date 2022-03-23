import Header from 'components/header/header'
import React from 'react';
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <React.Fragment>
      <Header/>
      <Outlet/>
    </React.Fragment>
  )
};

export default Layout;
