import React from 'react';
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <React.Fragment>
      <Outlet/>
    </React.Fragment>
  )
};

export default Layout;
