import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div
        className="main"
        style={{
          height: "calc(100vh - 69px)",
        }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
