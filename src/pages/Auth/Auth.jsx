import React from "react";
import { Outlet } from "react-router";
import loginImg from "../../assets/auth_img.png";

function Auth() {
  return (
    <div className=" w-full h-full flex justify-center items-center">
      <div className=" w-1/2 bg-light_blue h-full flex flex-col justify-center items-center">
        <div className="carousel w-full h-full">
          <div id="item1" className="carousel-item w-full">
            <img src={loginImg} className="w-full h-full" />
          </div>
          <div id="item1" className="carousel-item w-full">
            <img src={loginImg} className="w-full h-full" />
          </div>
          <div id="item1" className="carousel-item w-full">
            <img src={loginImg} className="w-full h-full" />
          </div>
        </div>
        <div className="flex w-full justify-center gap-2 py-2">
          <a href="#item1" className="btn btn-xs">
            1
          </a>
          <a href="#item2" className="btn btn-xs">
            2
          </a>
          <a href="#item3" className="btn btn-xs">
            3
          </a>
        </div>
      </div>
      <div className=" w-1/2">
        <Outlet />
      </div>
    </div>
  );
}

export default Auth;
