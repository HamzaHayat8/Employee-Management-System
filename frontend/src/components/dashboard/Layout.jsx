import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className=" p-9 w-full overflow-y-scroll h-screen ">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
