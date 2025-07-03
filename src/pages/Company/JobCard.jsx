import React from "react";
import moment from "moment";
import { useNavigate } from "react-router";

function JobCard({ data }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/company/jobApplicant/${data._id}`);
      }}
      className=" bg-white p-3 rounded cursor-pointer"
    >
      <section className="flex justify-between items-center">
        <h1 className=" font-semibold">{data?.title}</h1>
        <h1 className=" text-xs font-semibold text-gray-500">
          {moment(data?.createdAt).format("MMMM Do YYYY")}
        </h1>
      </section>
      <h1 className="text-xs bg-light_blue rounded-3xl inline px-2 py-1 text-gray-600 font-semibold">
        {data?.category}
      </h1>
      <p className=" text-xs my-2 line-clamp-3 text-gray-500">
        {data?.description}
      </p>
      <p className=" text-xs text-gray-500 font-semibold">
        Apply Till : {moment(data?.reg_date).format("MMMM Do YYYY")}
      </p>
    </div>
  );
}

export default JobCard;
