import React, { useEffect, useState } from "react";
import { getRequest } from "../../utils/apiConfig";
import { useNavigate, useParams } from "react-router";
import authHook from "../../context/AuthContext";
import moment from "moment";

function JobApplicants() {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [applicationData, setapplicationData] = useState([]);
  const { id } = useParams();
  const { token } = authHook();

  const getJobData = async () => {
    const res = await getRequest(`job/getOneJobForCompany/${id}`, token);
    setdata(res?.data);
  };

  const getData = async () => {
    const res = await getRequest(`application/byJob/${id}`, token);
    console.log(res?.data);
    setapplicationData(res?.data);
  };

  useEffect(() => {
    getJobData();
    getData();
  }, [token]);

  return (
    <div className=" p-4 flex flex-col overflow-y-auto gap-4">
      <h1 className=" text-xl font-bold text-gray-700">Job Applicants</h1>
      <div className=" w-full lg:px-16 p-3 md:px-12">
        <div className=" bg-white w-full p-3 rounded flex justify-between items-center">
          <section>
            <h1 className=" font-semibold text-lg">{data?.title}</h1>
            <h1 className=" text-gray-500 text-sm">
              {" "}
              <span className=" font-semibold">Category: </span>
              {data?.category}
            </h1>
            <h1 className=" text-sm text-gray-500">
              {" "}
              <span className=" font-semibold">Created At: </span>
              {moment(data?.createdAt).format("MMMM Do YYYY")}
            </h1>
          </section>
          <section className=" flex flex-col items-end">
            <p className="text-gray-500 text-sm my-2">
              {" "}
              <span className=" font-semibold">Apply Till: </span>
              {moment(data?.reg_date).format("MMMM Do YYYY")}
            </p>
            <p className=" text-white bg-main_blue px-3 py-1.5 rounded inline text-sm font-semibold">
              25 Applicents
            </p>
          </section>
        </div>
      </div>

      <div className=" w-full h-7 flex items-center gap-5 text-gray-500 text-sm font-semibold border-b border-gray-300">
        <p className=" hover:text-main_blue hover:border-main_blue hover:border-b-2 h-full cursor-pointer">
          Active
        </p>
        <p className=" hover:text-main_blue hover:border-main_blue hover:border-b-2 h-full cursor-pointer">
          All
        </p>
        <p className=" hover:text-main_blue hover:border-main_blue hover:border-b-2 h-full cursor-pointer">
          Under Review
        </p>
        <p className=" hover:text-main_blue hover:border-main_blue hover:border-b-2 h-full cursor-pointer">
          Shortlisted{" "}
        </p>
        <p className=" hover:text-main_blue hover:border-main_blue hover:border-b-2 h-full cursor-pointer">
          Interview Scheduled
        </p>
        <p className=" hover:text-main_blue hover:border-main_blue hover:border-b-2 h-full cursor-pointer">
          Selected{" "}
        </p>
        <p className=" hover:text-main_blue hover:border-main_blue hover:border-b-2 h-full cursor-pointer">
          Rejected
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left  border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 ">Name</th>
              <th className="px-4 py-2 ">Email</th>
              <th className="px-4 py-2 ">Resume</th>
              <th className="px-4 py-2 ">Status</th>
              <th className="px-4 py-2 ">LinkedIn</th>
            </tr>
          </thead>
          <tbody>
            {applicationData?.map((item, index) => (
              <tr
                key={index}
                onClick={() => {
                  navigate(`/company/ApplicantDetails/${item?._id}`);
                }}
                className="cursor-pointer hover:bg-white"
              >
                <td className="px-4 py-2">{item?.name}</td>
                <td className="px-4 py-2">{item?.mail}</td>
                <td className="px-4 py-2">
                  <a
                    href={item?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="bg-main_blue text-white inline rounded px-2 py-1 capitalize"
                  >
                    Resume
                  </a>
                </td>
                <td className="px-4 py-2">{item?.status}</td>
                <td className="px-4 py-2">
                  <a
                    href={item?.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-blue-600 underline"
                  >
                    Profile
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default JobApplicants;
