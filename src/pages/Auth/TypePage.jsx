import React from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router";

function TypePage() {
  const navigate = useNavigate();
  return (
    <div className=" w-full h-full flex flex-col justify-between p-3">
      <Navbar />
      <div className=" flex flex-row justify-between items-center h-[70%] w-full ">
        <div className=" flex flex-col items-center justify-between h-full w-1/2 p-3">
          <section>
            <h1 className=" text-center text-3xl font-bold mb-2 font-serif">
              For Companies
            </h1>
            <p className=" text-center text-xl">
              Thousands of companies have embraced the new way to hire and
              upskill developers across roles and throughout their careers.
            </p>
          </section>
          <button
            onClick={() => navigate("/auth/companylogin")}
            className=" rounded bg-main_blue text-white py-3 px-6 font-semibold hover:bg-dark_blue cursor-pointer hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
          >
            Login
          </button>
          <section>
            <p className=" text-center">Don't have an account?</p>
            <p
              onClick={() => navigate("/auth/companysignup")}
              className=" text-center text-main_blue font-semibold cursor-pointer"
            >
              Sign up
            </p>
          </section>
        </div>
        <div className=" flex flex-col items-center justify-between h-full w-1/2 p-3 border-l-[1px] border-gray-200">
          <section>
            <h1 className=" text-center text-3xl font-bold mb-2 font-serif">
              For Students
            </h1>
            <p className=" text-center text-xl">
              Join over 26 million developers, practice coding skills, prepare
              for interviews, and get hired.
            </p>
          </section>
          <button
            onClick={() => navigate("/auth/studentlogin")}
            className=" rounded border-[1px] border-gray-400 py-3 px-6 font-semibold hover:bg-dark_blue cursor-pointer hover:text-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
          >
            Login
          </button>
          <section>
            <p className=" text-center">Don't have an account?</p>
            <p
              onClick={() => navigate("/auth/studentsignup")}
              className=" text-center text-main_blue font-semibold cursor-pointer"
            >
              Sign up
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TypePage;
