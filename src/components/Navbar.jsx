import React from "react";
import { useNavigate } from "react-router";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="w-full flex flex-col md:flex-row justify-between items-center px-5 py-4 md:px-14 ">
      <div className="text-2xl font-bold tracking-wide">
        <span className="text-[#399efc]">HIRE</span>
        <span className="text-[#1f184a]">CONNECT</span>
      </div>

      <div className="flex gap-4 mt-3 md:mt-0 text-gray-600 font-medium text-sm md:text-base cursor-pointer">
        <p className="hover:text-[#399efc] transition">Features</p>
        <p className="hover:text-[#399efc] transition">Find a Job</p>
        <p className="hover:text-[#399efc] transition">About Us</p>
      </div>

      <div className="flex gap-3 mt-3 md:mt-0">
        <button
          onClick={() => navigate("/auth")}
          className="px-5 py-2 cursor-pointer text-sm font-semibold border border-[#399efc] text-[#399efc] rounded-lg hover:bg-[#399efc] hover:text-white transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/auth")}
          className="px-5 py-2 cursor-pointer text-sm font-semibold bg-[#399efc] text-white border border-[#399efc] rounded-lg hover:bg-transparent hover:text-[#399efc] transition"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
