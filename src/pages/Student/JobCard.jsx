import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import moment from "moment";

function JobCard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/job/${data?._id}`)}
      className=" bg-white rounded p-5 w-full flex flex-col gap-2 cursor-pointer"
    >
      <div className=" flex flex-row w-full gap-3">
        <section className=" w-[5%] flex justify-center items-center">
          <div className=" w-full h-full">
            <img
              src={
                data?.company?.logo_url ||
                "https://www.market-research-companies.in//images/default.jpg"
              }
              alt="company logo"
              className=" w-full h-full"
            />
          </div>
        </section>
        <section className=" w-[85%]">
          <h1 className=" font-bold text-md">{data?.title}</h1>
          <sectioon className=" flex items-center justify-start text-xs gap-2 text-gray-500">
            <h1>{data?.company?.name}</h1>
            <section className=" flex items-center gap-0.5">
              <FaMapMarkerAlt size={11} color="#6a7282" />
              <h1>
                {data?.company?.address?.area}, {data?.company?.address?.city}
              </h1>
            </section>
          </sectioon>
        </section>
        <section className=" w-[10%] text-sm font-bold ">
          <h1>{data?.salary} ₹</h1>
        </section>
      </div>
      <div>
        <p className=" text-sm text-gray-500 line-clamp-3">
          {data?.description}
        </p>
      </div>
      <div className=" flex items-center justify-between">
        <section className=" flex items-center-safe text-xs gap-2">
          {data?.required_skills?.map((item, index) => {
            return (
              <h1
                key={index}
                className=" rounded-xl px-3 py-[2px] bg-light_blue text-gray-600 font-bold"
              >
                {item}
              </h1>
            );
          })}
        </section>
        <section>
          <h1 className=" text-xs text-gray-500">
            {moment(data?.reg_date).format("MMMM Do YYYY")}
          </h1>
        </section>
      </div>
    </div>
  );
}

export default JobCard;
