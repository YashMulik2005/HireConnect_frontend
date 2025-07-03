import React from "react";
import CompanyNavbar from "../../components/CompanyNavbar";

function ComapayHomepage() {
  return (
    <div className=" w-full h-full bg-off-white flex">
      <div className=" h-full w-[15%]">
        <CompanyNavbar />
      </div>
      <div className=" h-full w-[85%]"></div>
    </div>
  );
}

export default ComapayHomepage;
