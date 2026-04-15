import { Button } from "../../components/common/button";
import React from "react";
import { FaArrowLeftLong, FaEyeLowVision } from "react-icons/fa6";
import { IoIosEye } from "react-icons/io";
import { Link } from "react-router-dom";

function LoginForm({ role, title, subtitle }) {
  const [showPassword, setShowPassword] = React.useState(false);

  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <div className="w-full max-w-md flex flex-col gap-4">
      <Link className="text-gray-400 flex items-center gap-2 text-sm" to="/">
        <FaArrowLeftLong className="w-3 h-3" />
        Back to portal
      </Link>

      <h1 className="text-2xl sm:text-3xl font-semibold">{title}</h1>
      <p className="text-sm text-zinc-500">{subtitle}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-2">
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-600">Email</label>
          <input
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 
            focus:outline-none focus:ring-2 focus:ring-[#1E1A4D]
            transition-all duration-200"
          />
        </div>

        {/* Password */}
        <div className="relative flex flex-col gap-1">
          <label className="text-sm font-medium text-zinc-600">Password</label>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 
            focus:outline-none focus:ring-2 focus:ring-[#1E1A4D]
            transition-all duration-200"
          />

          <span
            className="absolute right-4 top-9 text-zinc-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoIosEye /> : <FaEyeLowVision />}
          </span>
        </div>

        {/* Button */}
        <Button
          type="submit"
          className="w-full py-5 rounded-lg bg-[#1E1A4D] text-white 
          hover:bg-[#2a2566] active:scale-[0.98] transition-all"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
