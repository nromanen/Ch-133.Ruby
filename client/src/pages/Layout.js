import { Outlet } from "react-router-dom";
import Header from '../components/header/header'

const Layout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
};

export default Layout;
