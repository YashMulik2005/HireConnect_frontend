import React from "react";
import { FaSpaceAwesome } from "react-icons/fa6";

function StudentNavbar() {
  return (
    <div
      className="flex justify-between items-center px-8 w-full h-full bg-white"
      style={{ boxShadow: "0 0 20px 5px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex justify-center items-center gap-3 full">
        <FaSpaceAwesome size={25} color="#399efc" />
        <h1 className=" text-xl font-semibold text-gray-700 font-serif">
          Hire<span className="text-main_blue">Connect</span>
        </h1>
      </div>
      <div className="flex gap-10 h-full text-gray-700 items-center text-sm">
        <p className=" px-1 h-full flex items-center hover:border-b-4 hover:border-b-main_blue hover:font-bold cursor-pointer">
          Job Search
        </p>
        <p className="px-1 h-full flex items-center hover:border-b-4 hover:border-b-main_blue hover:font-bold cursor-pointer">
          Top Companies
        </p>
        <p className="px-1 h-full flex items-center hover:border-b-4 hover:border-b-main_blue hover:font-bold cursor-pointer">
          Your Applications
        </p>
      </div>
      <div>
        <div className=" w-8 h-8 rounded-full bg-main_blue"></div>
      </div>
    </div>
  );
}

export default StudentNavbar;
