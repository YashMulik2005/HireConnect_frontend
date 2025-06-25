import React from "react";
import { FaSpaceAwesome } from "react-icons/fa6";
import { useNavigate } from "react-router";
import authHook from "../context/AuthContext";

function StudentNavbar() {
  const { userdata } = authHook();
  const naviagate = useNavigate();
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
        <p
          onClick={() => {
            naviagate("/");
          }}
          className=" px-1 h-full flex items-center hover:border-b-3 hover:border-b-main_blue hover:font-bold cursor-pointer"
        >
          Job Search
        </p>
        <p
          onClick={() => {
            naviagate("/companies");
          }}
          className="px-1 h-full flex items-center hover:border-b-3 hover:border-b-main_blue hover:font-bold cursor-pointer"
        >
          Top Companies
        </p>
        <p className="px-1 h-full flex items-center hover:border-b-3 hover:border-b-main_blue hover:font-bold cursor-pointer">
          Your Applications
        </p>
      </div>
      <div className=" flex gap-1 items-center">
        <div className=" w-8 h-8 rounded-full bg-main_blue"></div>
        <h1 className=" text-gray-600 font-semibold">{userdata?.name}</h1>
      </div>
    </div>
  );
}

export default StudentNavbar;
