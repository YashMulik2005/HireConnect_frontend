import React from "react";
import StudentNavbar from "../../components/StudentNavbar";
import Footer from "../../components/Footer";
import CompanyCard from "./CompanyCard";

function Companies() {
  return (
    <div className=" w-full h-full bg-off-white overflow-y-auto">
      <div className=" w-full h-[8%] sticky top-0">
        <StudentNavbar />
      </div>
      <div className="w-full px-24 flex flex-col items-center p-5 min-h-[90%] gap-3">
        <h1 className=" text-3xl font-bold text-gray-700">Top Companies</h1>
        <div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
          <CompanyCard />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Companies;
