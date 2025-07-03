import React from "react";
import CompanyNavbar from "../../components/CompanyNavbar";
import { Outlet } from "react-router";

function CompanyLayout() {
  return (
    <div className=" w-full h-full bg-off-white flex">
      <div className=" h-full w-[15%]">
        <CompanyNavbar />
      </div>
      <div className=" h-full w-[85%]">
        <Outlet />
      </div>
    </div>
  );
}

export default CompanyLayout;
