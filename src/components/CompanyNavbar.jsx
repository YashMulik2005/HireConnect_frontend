import React from "react";
import { FaSpaceAwesome } from "react-icons/fa6";
import { useNavigate, useLocation } from "react-router";
import authHook from "../context/AuthContext";
import default_profile from "../assets/default_profile.png";
import { RiHome2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineWorkOutline } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";

function CompanyNavbar() {
  const { userdata } = authHook();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(userdata);

  return (
    <div
      className="flex flex-col px-4 py-4 w-full h-full bg-white"
      //   style={{ boxShadow: "0 0 20px 5px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex  gap-2 full">
        <FaSpaceAwesome size={22} color="#399efc" />
        <h1 className=" text-lg font-bold text-gray-700 ">
          Hire<span className="text-main_blue">Connect</span>
        </h1>
      </div>
      <div className="h-full text-gray-700 text-sm flex flex-col gap-2 my-3">
        <p
          className={`text-gray-500 flex gap-2 items-center hover:bg-light_blue hover:text-main_blue hover:font-semibold cursor-pointer py-1 hover:border-l-2 hover:border-main_blue px-2 ${
            currentPath === "/company/dashboard"
              ? "bg-light_blue text-main_blue font-semibold border-l-2 border-main_blue"
              : ""
          }`}
        >
          <RiHome2Line size={17} />
          Dashboard
        </p>
        <p
          onClick={() => navigate("/company/jobs")}
          className={`text-gray-500 flex gap-2 items-center hover:bg-light_blue hover:text-main_blue hover:font-semibold cursor-pointer py-1 hover:border-l-2 hover:border-main_blue px-2 ${
            currentPath === "/company/jobs"
              ? "bg-light_blue text-main_blue font-semibold border-l-2 border-main_blue"
              : ""
          }`}
        >
          <MdOutlineWorkOutline size={17} />
          Your Jobs
        </p>
        <p className=" text-gray-500 flex gap-2 items-center hover:bg-light_blue hover:text-main_blue hover:font-semibold cursor-pointer py-1 hover:border-l-2 hover:border-main_blue px-2">
          <IoMdAddCircleOutline size={17} />
          Create Job
        </p>
        <p
          className={`text-gray-500 flex gap-2 items-center hover:bg-light_blue hover:text-main_blue hover:font-semibold cursor-pointer py-1 hover:border-l-2 hover:border-main_blue px-2 ${
            currentPath === "/company/rpofile"
              ? "bg-light_blue text-main_blue font-semibold border-l-2 border-main_blue"
              : ""
          }`}
        >
          <FaRegUser size={15} />
          Profile
        </p>
      </div>
      <div
        onClick={() => {
          navigate("/profile");
        }}
        className=" flex gap-1 items-center cursor-pointer"
      >
        <div className=" w-8 h-8 rounded-full">
          <img src={userdata?.profile_img || default_profile} />
        </div>
        <h1 className=" text-gray-600 font-semibold text-sm">
          {userdata?.name}
        </h1>
      </div>
    </div>
  );
}

export default CompanyNavbar;
