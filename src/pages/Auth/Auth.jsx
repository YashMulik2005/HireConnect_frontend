import React from "react";
import { Outlet } from "react-router";
import loginImg from "../../assets/Auth_img.jpg";

function Auth() {
  return (
    <div className=" w-full h-full flex justify-center items-center">
      <div className=" w-[50%] bg-light_blue h-full flex flex-col justify-center items-center">
        <div className="carousel w-full h-full">
          <img src={loginImg} className="w-full h-full" />
        </div>
      </div>
      <div className=" w-[50%]">
        <Outlet />
      </div>
    </div>
  );
}

export default Auth;
