import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaRegCalendar, FaRegClipboard } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { Button } from "../common/button";
import { CiLogout } from "react-icons/ci";
import { LiaTasksSolid } from "react-icons/lia";
import { useSelector } from "react-redux";

function Sidebar() {
  const role = useSelector((state) => state.auth.user?.role);

  const sidebarNav = [
    {
      title: "Dashboard",
      icon: <IoHomeOutline />,
      link: "/dashboard",
      roles: ["admin", "employee"],
    },
    {
      title: "Employee",
      icon: <FiUser />,
      link: "/employee",
      roles: ["admin"],
    },
    {
      title: "Attendance",
      icon: <FaRegCalendar />,
      link: "/attendance",
      roles: ["admin", "employee"],
    },
    {
      title: "Tasks",
      icon: <LiaTasksSolid />,
      link: "/tasks",
      roles: ["admin", "employee"],
    },
    {
      title: "Leave",
      icon: <FaRegClipboard />,
      link: "/leave",
      roles: ["admin", "employee"],
    },
    {
      title: "Payslips",
      icon: <BsCurrencyDollar />,
      link: "/payroll",
      roles: ["admin", "employee"],
    },
    {
      title: "Settings",
      icon: <IoSettingsOutline />,
      link: "/settings",
      roles: ["admin", "employee"],
    },
  ];

  const filteredNav = sidebarNav.filter((item) => item.roles.includes(role));

  return (
    <div className="h-screen flex flex-col bg-linear-to-b from-[#1E1A4D] to-[#1E1A4D]/90 min-w-65">
      {/* Logo */}
      <div className="p-6 border-b flex items-center gap-2">
        <FiUser className="text-white text-2xl" />
        <div>
          <h1 className="text-white text-sm">Employee MS</h1>
          <p className="text-sm text-zinc-400">Management System</p>
        </div>
      </div>

      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 sidebar-scroll">
        {/* user info */}
        <div className="border rounded-sm w-full p-2 flex bg-[#171E31] items-center space-x-4">
          <div className="border px-3 py-1 rounded-md">
            <span className="text-zinc-300 text-xl">H</span>
          </div>
          <div>
            <h1 className="text-white text-sm">Hamza Hayat</h1>
            <p className="text-sm text-zinc-400">Admin</p>
          </div>
        </div>

        {/* Navigation */}
        <p className="text-sm text-zinc-400 font-bold">NAVIGATION</p>

        <div className="flex flex-col gap-2">
          {filteredNav.map((item, index) => (
            <NavLink
              to={item.link}
              key={index}
              className={({ isActive }) =>
                isActive
                  ? "bg-[linear-gradient(90deg,rgba(59,130,246,0.2)_0%,transparent_100%)] flex items-center gap-2 border-r-[3px] border-[#3b82f6] text-white px-3 py-3 rounded-md transition-all"
                  : "text-zinc-400 hover:text-white px-3 py-2 rounded-md transition-all flex items-center gap-2"
              }
            >
              {item.icon}
              {item.title}
            </NavLink>
          ))}
        </div>
      </div>

      <Button className=" bg-transparent hover:bg-red-500/60 border-t border-zinc-600 rounded-sm">
        <CiLogout />
        Log out
      </Button>
    </div>
  );
}

export default Sidebar;
