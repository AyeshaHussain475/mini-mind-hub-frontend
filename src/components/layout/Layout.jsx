import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div style={{ marginTop: 8, padding: 24 }}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
