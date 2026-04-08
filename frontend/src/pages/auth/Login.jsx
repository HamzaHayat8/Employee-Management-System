import { ShieldIcon } from "@hugeicons/core-free-icons";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Login() {
  const selectportal = [
    {
      id: 1,
      name: "Admin Portal",
      to: "/login/admin",
    },
    {
      id: 2,
      name: "Employee Portal",
      to: "/login/employee",
    },
  ];

  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl sm:text-3xl font-medium">Welcome Back</h1>
      <p className="text-sm text-zinc-500">
        Select your portal to securely access the system
      </p>

      <div className="grid grid-cols-1 gap-4 mt-6">
        {selectportal.map((item) => (
          <Link
            to={item.to}
            key={item.id}
            className="flex justify-between items-center p-4 rounded-xl border 
            hover:shadow-md hover:border-[#1E1A4D] transition-all duration-200"
          >
            <h2 className="text-base sm:text-lg font-medium">{item.name}</h2>
            <FaArrowRight />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Login;
