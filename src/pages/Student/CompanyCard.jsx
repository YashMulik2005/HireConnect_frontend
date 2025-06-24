import React from "react";
import { FaRegShareSquare } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function CompanyCard() {
  return (
    <div className=" bg-white rounded w-full h-full p-4 flex flex-col gap-2 shadow">
      <div className=" flex justify-between items-center">
        <div className=" w-10 h-10">
          <img
            src="https://img.freepik.com/premium-vector/beautiful-unique-logo-design-ecommerce-retail-company_1287271-14561.jpg?semt=ais_hybrid&w=740"
            alt="company logo"
            className=" w-full h-full"
          />
        </div>
        <div className=" flex items-center gap-1 bg-gray-100 rounded py-[5px] px-2">
          <p className=" text-xs text-black font-semibold">Share</p>
          <FaRegShareSquare color="black" size={13} />
        </div>
      </div>
      <section>
        <h1 className="text-xl font-semibold text-gray-700">
          Microsoft Company
        </h1>{" "}
        <h1 className="text-gray-400 text-sm">Flat No. 12B</h1>
        <h1 className="text-gray-400 text-sm">Tech Valley Towers</h1>
        <h1 className="text-gray-400 text-sm">
          Whitefield, Bangalore - 560066
        </h1>
      </section>
      <section className=" flex gap-2">
        <div className=" bg-off-white rounded-full p-2 cursor-pointer">
          <FaLink color=" gray" size={17} />
        </div>
        <div className=" bg-off-white rounded-full p-2 cursor-pointer">
          <FaLinkedin color=" gray" size={17} />
        </div>
      </section>
      <div className=" flex justify-end items-center border-t-[1px] border-gray-200 pt-2">
        <button className=" text-xs bg-main_blue rounded text-white py-[6px] px-2">
          Vist Jobs
        </button>
      </div>
    </div>
  );
}

export default CompanyCard;
