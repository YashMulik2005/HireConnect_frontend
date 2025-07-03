import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { getRequest } from "../../utils/apiConfig";
import authHook from "../../context/AuthContext";

function Jobs() {
  const [data, setdata] = useState();
  const { token } = authHook();

  const getData = async () => {
    const res = await getRequest("job/jobsOfCompany", token);
    console.log(res?.data);
    setdata(res?.data);
  };
  useEffect(() => {
    getData();
  }, [token]);

  return (
    <div className=" p-4 flex flex-col overflow-y-auto gap-4">
      <h1 className=" text-2xl font-bold text-gray-700">Your Jobs</h1>
      <section className=" flex w-full gap-2.5 justify-end">
        <input
          className="  border-gray-400 rounded px-3 py-1.5 focus:outline-none bg-white md:w-[60%]"
          placeholder="Job Title"
        />
        <button className=" bg-main_blue text-white font-semibold px-4 py-1.5 rounded">
          Search
        </button>
      </section>

      <div className=" grid grid-cols-3 gap-3">
        {data?.map((item, index) => {
          return <JobCard key={index} data={item} />;
        })}
      </div>
    </div>
  );
}

export default Jobs;
