import React, { useEffect, useState } from "react";
import StudentNavbar from "../../components/StudentNavbar";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";
import Footer from "../../components/Footer";
import { useNavigate, useParams } from "react-router";
import { getRequest } from "../../utils/apiConfig";
import moment from "moment";

function JobDetails() {
  const { id } = useParams();
  const [data, setdata] = useState();

  const navigate = useNavigate();

  const getData = async () => {
    const result = await getRequest(`job/${id}`);
    console.log(result?.data);

    setdata(result?.data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" w-full h-full bg-off-white overflow-y-auto flex flex-col gap-4">
      <div className=" w-full h-[8%] sticky top-0">
        <StudentNavbar />
      </div>
      <div className=" w-full flex flex-col gap-3">
        <div className=" px-24">
          <div className="bg-white rounded flex  p-2">
            <div className=" w-20 h-20">
              <img src={data?.company?.logo_url} className=" w-full h-full" />
            </div>
            <div className=" w-[90%] flex justify-between items-center">
              <section>
                <h1 className=" text-xl font-semibold">{data?.title}</h1>
                <section className=" flex gap-2 text-sm text-gray-500">
                  <p>{data?.company?.name}</p>
                  <p>
                    {data?.company?.address?.area},{" "}
                    {data?.company?.address?.city}
                  </p>
                  <p>{data?.job_mode}</p>
                </section>
              </section>
              <section>
                <button className=" cursor-pointer bg-main_blue text-white px-4 py-1 rounded font-semibold text-sm">
                  Apply
                </button>
              </section>
            </div>
          </div>
        </div>
        <div className=" bg-white w-full h-full"></div>
      </div>
      {/* <div className="w-full px-24 flex flex-col items-center ">
        <div className=" bg-white w-full flex flex-col p-5 rounded gap-6 mt-5">
          <div className=" flex w-[100%] gap-5 border-b-[1px] border-gray-300">
            <section className=" w-[80%] justify-between">
              <h1 className=" text-2xl text-black font-bold">{data?.title}</h1>
              <p className=" text-md text-gray-500">{data?.company?.name}</p>
              <section className=" flex items-center gap-0.5">
                <FaMapMarkerAlt size={11} color="#6a7282" />
                <h1 className="text-md text-gray-500">
                  {data?.company?.address?.area}, {data?.company?.address?.city}
                </h1>
              </section>
              <p className="text-md text-gray-500">
                {moment(data?.createdAt, "YYYYMMDD").fromNow()}. 25 Applicants
              </p>
            </section>
            <section className=" w-[20%] md:p-5 flex flex-col gap-3">
              <div className=" flex gap-2 items-center w-full h-full">
                <button className="bg-gray-200 flex p-1 w-[50%] justify-center items-center rounded text-sm gap-1 text-gray-700">
                  <FaRegShareSquare size={17} />
                  Share
                </button>
                <button className="bg-gray-200 flex p-1 w-[50%] justify-center items-center rounded text-sm gap-1 text-gray-700">
                  <FaRegShareSquare size={17} />
                  Share
                </button>
              </div>
              <button
                onClick={() => {
                  navigate(`/job/apply/${id}`);
                }}
                className=" bg-main_blue text-white w-full px-3 py-2 rounded cursor-pointer"
              >
                Apply now
              </button>
            </section>
          </div>
          <div className=" grid grid-cols-4 gap-4">
            <section className=" font-semibold bg-gray-50 p-3 rounded">
              <h1 className=" text-gray-500">Experience</h1>
              <p className=" text-main_blue">3 years</p>
            </section>
            <section className=" font-semibold bg-gray-50 p-3 rounded">
              <h1 className=" text-gray-500">Job Type</h1>
              <p className=" text-main_blue">{data?.job_type}</p>
            </section>
            <section className=" font-semibold bg-gray-50 p-3 rounded">
              <h1 className=" text-gray-500">Job Mode</h1>
              <p className=" text-main_blue">{data?.job_mode}</p>
            </section>
            <section className=" font-semibold bg-gray-50 p-3 rounded">
              <h1 className=" text-gray-500">Salary</h1>
              <p className=" text-main_blue">{data?.salary}</p>
            </section>
          </div>
          <div>
            <h1 className=" text-xl font-semibold">Description</h1>
            <p className=" text-gray-500 text-sm mt-1">{data?.description}</p>
          </div>
          <div>
            <h1 className=" text-xl font-semibold">Requirements And Skills</h1>
            <div className=" text-gray-500 text-sm mt-2 flex gap-3 flex-wrap">
              {data?.required_skills?.map((items, index) => {
                return (
                  <h1
                    key={index}
                    className=" rounded-xl px-3 py-[2px] bg-gray-200 text-gray-700 font-semibold"
                  >
                    {items}
                  </h1>
                );
              })}
            </div>
          </div>
          <div>
            <h1 className=" text-xl font-semibold">Number Of Openings</h1>
            <p className="text-gray-500 text-sm mt-1">
              {data?.numberOfOpenings}
            </p>
          </div>
          <div>
            <h1 className=" text-xl font-semibold">Perks</h1>
            <div className=" text-gray-500 text-sm mt-2 flex gap-3 flex-wrap">
              {data?.perks?.map((item, index) => {
                return (
                  <h1
                    key={index}
                    className=" rounded-xl px-3 py-[2px] bg-gray-200 text-gray-700 font-semibold"
                  >
                    {item}
                  </h1>
                );
              })}
            </div>
          </div>
          <div>
            <h1 className=" text-xl font-semibold">About the job/internship</h1>
            <section className="text-gray-500 text-sm mt-1">
              {data?.responsibilities?.map((item, index) => {
                return <li kay={index}>{item}</li>;
              })}
            </section>
          </div>
          <div>
            <h1 className=" text-xl font-semibold">About Company</h1>
            <p className=" text-gray-500 text-sm mt-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              beatae perferendis consequatur exercitationem, dolore libero,
              eligendi officia repudiandae et, inventore at dicta?Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Optio beatae
              perferendis consequatur exercitationem, dolore libero, eligendi
              officia repudiandae et, inventore at dicta?
            </p>
          </div>
          <div className=" flex justify-center items-center">
            <button className=" bg-main_blue text-white w-40 px-3 py-2 rounded">
              Apply now
            </button>
          </div>
        </div>
      </div> */}
      <div className=" -px-24 mt-6 w-full ">
        <Footer />
      </div>
    </div>
  );
}

export default JobDetails;
