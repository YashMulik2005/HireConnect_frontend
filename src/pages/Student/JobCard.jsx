import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

function JobCard() {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/job/1")}
      className=" bg-white rounded p-5 w-full flex flex-col gap-2 cursor-pointer"
    >
      <div className=" flex flex-row w-full gap-3">
        <section className=" w-[5%] flex justify-center items-center">
          <div className=" w-full h-full">
            <img
              src="https://img.freepik.com/premium-vector/beautiful-unique-logo-design-ecommerce-retail-company_1287271-14561.jpg?semt=ais_hybrid&w=740"
              alt="company logo"
              className=" w-full h-full"
            />
          </div>
        </section>
        <section className=" w-[85%]">
          <h1 className=" font-bold text-md">Software Developer</h1>
          <sectioon className=" flex items-center justify-start text-xs gap-2 text-gray-500">
            <h1>Microsoft company</h1>
            <section className=" flex items-center gap-0.5">
              <FaMapMarkerAlt size={11} color="#6a7282" />
              <h1>Pawai, Mumbai</h1>
            </section>
          </sectioon>
        </section>
        <section className=" w-[10%] text-md font-bold ">
          <h1>10,000 ₹</h1>
        </section>
      </div>
      <div>
        <p className=" text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
          corrupti eum suscipit at quibusdam, laborum deleniti aliquam debitis
          eaque. Tenetur autem voluptas asperiores non distinctio quaerat
          voluptatibus amet libero voluptatum!
        </p>
      </div>
      <div className=" flex items-center justify-between">
        <section className=" flex items-center-safe text-xs gap-2">
          <h1 className=" rounded-xl px-3 py-[1px] bg-gray-200 text-gray-700 font-bold">
            HTML
          </h1>
          <h1 className=" rounded-xl px-3 py-[1px] bg-gray-200 text-gray-700 font-bold">
            Javascript
          </h1>
        </section>
        <section>
          <h1 className=" text-xs text-gray-500">21 March 2025</h1>
        </section>
      </div>
    </div>
  );
}

export default JobCard;
