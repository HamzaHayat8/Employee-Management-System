import React from "react";
import { Outlet } from "react-router-dom";

function Auth() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* LEFT SIDE */}
      <div
        className="w-full lg:w-1/2 flex flex-col gap-5 text-white justify-center 
      px-6 sm:px-10 lg:px-20 py-10 
      bg-gradient-to-t from-[#1E1A4D] to-[#1E1A4D]/80"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight">
          Employee <br /> Management System
        </h1>

        <p className="text-sm sm:text-base text-zinc-200">
          Streamline your workforce operations, track attendance, manage payroll
          and empower your team securely.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div
        className="w-full lg:w-1/2 flex justify-center items-center 
      px-6 sm:px-10 lg:px-20 py-10"
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Auth;
