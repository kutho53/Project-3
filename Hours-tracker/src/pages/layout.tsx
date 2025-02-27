//this page is for creating the react router layout
import Header from '../components/header.tsx';
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
    <header>
        <Header />
    </header>
    <body>
        <Outlet />
    </body>
      
    </>
  )
};

export default Layout;