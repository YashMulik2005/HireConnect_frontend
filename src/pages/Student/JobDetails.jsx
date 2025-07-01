import React, { useEffect, useState } from "react";
import StudentNavbar from "../../components/StudentNavbar";
import Footer from "../../components/Footer";
import { useNavigate, useParams } from "react-router";
import { getRequest } from "../../utils/apiConfig";
import moment from "moment";
import { IoShareSocialOutline, IoLocationSharp } from "react-icons/io5";
import authHook from "../../context/AuthContext";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function JobDetails() {
  const { id } = useParams();
  const [data, setdata] = useState();
  const [analytics, setanalytics] = useState();
  const { token } = authHook();

  const navigate = useNavigate();

  const getData = async () => {
    const result = await getRequest(`job/${id}`);
    console.log(result?.data);

    setdata(result?.data);
  };
  let scoreValue;
  const getAnalysis = async () => {
    const res = await getRequest(`job/analytic/${id}`, token);

    console.log(res.data);
    setanalytics(res?.data);
    scoreValue = parseInt(
      analytics?.application_readiness?.score?.replace("%", "") || "0"
    );
  };

  useEffect(() => {
    getData();
    getAnalysis();
  }, []);

  return (
    <div className=" w-full h-full bg-off-white overflow-y-auto">
      <div className=" w-full h-[8%] sticky top-0">
        <StudentNavbar />
      </div>
      <div className="w-full flex flex-col items-center">
        <div className=" px-24 w-full mt-5">
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
              <section className=" flex gap-3 items-center">
                <section className=" border-r-[1px] border-gray-300 p-3 cursor-pointer">
                  <IoShareSocialOutline size={25} />
                </section>
                <button
                  onClick={() => {
                    navigate(`/job/apply/${id}`);
                  }}
                  className=" cursor-pointer bg-main_blue text-white px-6 py-2 rounded font-semibold text-sm"
                >
                  Apply
                </button>
              </section>
            </div>
          </div>
        </div>

        <div className=" bg-white w-full flex p-7 rounded gap-6 mt-5">
          <div className=" w-[70%] flex flex-col gap-4">
            <div>
              <h1 className=" text-lg font-bold">Description</h1>
              <p className=" text-gray-500 text-sm mt-1">{data?.description}</p>
            </div>
            <div>
              <h1 className=" text-lg font-bold">About the job/internship</h1>
              <section className="text-gray-500 text-sm mt-1">
                {data?.responsibilities?.map((item, index) => {
                  return <li kay={index}>{item}</li>;
                })}
              </section>
            </div>
            <div>
              <h1 className=" text-lg font-bold">Number Of Openings</h1>
              <p className="text-gray-500 text-sm mt-1">
                {data?.numberOfOpenings}
              </p>
            </div>
            <div>
              <h1 className=" text-lg font-bold">Perks</h1>
              <div className=" text-gray-500 text-sm mt-2 flex gap-3 flex-wrap">
                {data?.perks?.map((item, index) => {
                  return (
                    <h1
                      key={index}
                      className=" rounded-3xl px-3 py-1 bg-gray-200 text-gray-700 font-semibold"
                    >
                      {item}
                    </h1>
                  );
                })}
              </div>
            </div>
            <div>
              <h1 className=" text-lg font-bold">About Company</h1>
              <p className=" text-gray-500 text-sm mt-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                beatae perferendis consequatur exercitationem, dolore libero,
                eligendi officia repudiandae et, inventore at dicta?Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Optio beatae
                perferendis consequatur exercitationem, dolore libero, eligendi
                officia repudiandae et, inventore at dicta?
              </p>
            </div>
            {/* <div className=" flex justify-center items-center">
              <button className=" bg-main_blue text-white w-40 px-3 py-2 rounded">
                Apply now
              </button>
            </div> */}
          </div>
          <div className=" w-[30%] border-l-[1px] border-gray-300 p-3">
            <section>
              <h1 className=" font-bold ">About this role</h1>
              <div className=" text-sm flex flex-col gap-3 border-b-[1px] border-gray-300 py-3 pb-5">
                <section className=" flex justify-between">
                  <h1 className=" text-gray-500 font-semibold">Apply Before</h1>
                  <p className=" font-semibold">
                    {moment(data?.reg_date).format("MMM Do YY")}
                  </p>
                </section>
                <section className=" flex justify-between">
                  <h1 className=" text-gray-500 font-semibold">Posted On</h1>
                  <p className=" font-semibold">
                    {moment(data?.createdAt).format("MMM Do YY")}
                  </p>
                </section>
                <section className=" flex justify-between">
                  <h1 className=" text-gray-500 font-semibold">Job Type</h1>
                  <p className=" font-semibold">{data?.job_type}</p>
                </section>
                <section className=" flex justify-between">
                  <h1 className=" text-gray-500 font-semibold">Apply Before</h1>
                  <p className=" font-semibold">{data?.salary} ₹</p>
                </section>
              </div>
            </section>
            <section className=" py-4 border-b-[1px] border-gray-300 ">
              <h1 className=" font-bold mb-2">Category</h1>
              <div className=" text-sm bg-light_blue rounded-3xl px-5 py-1.5 inline-block text-gray-600 font-semibold">
                {data?.category}
              </div>
            </section>
            <section className=" py-4 border-b-[1px] border-gray-300 ">
              <h1 className=" font-bold mb-2">Required Skills</h1>
              <div className=" flex flex-wrap gap-3 text-sm">
                {data?.required_skills?.map((item, index) => {
                  return (
                    <p
                      key={index}
                      className=" bg-gray-100 inline rounded-3xl px-4 font-semibold py-0.5 text-main_blue"
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
            </section>
            <section className=" py-4">
              <h1 className=" font-bold mb-2">Address</h1>
              <section className=" flex gap-1.5 items-start">
                <IoLocationSharp size={20} />
                <p className=" text-gray-500 font-semibold text-sm w-full">
                  {data?.company?.address?.flat_no},{" "}
                  {data?.company?.address?.building_name},{" "}
                  {data?.company?.address?.area}, {data?.company?.address?.city}
                  , {data?.company?.address?.pincode}
                </p>
              </section>
            </section>
          </div>
        </div>
        <div className="border-t-[1px] border-gray-300 w-full p-5 bg-white">
          <h1 className="font-bold text-lg mb-4">Analysis</h1>
          <section className=" grid grid-cols-4 gap-3">
            <div className=" bg-off-white rounded p-4 flex flex-col justify-center items-center">
              <h2 className="font-semibold text-gray-700 mb-1 text-left">
                Match as per profile
              </h2>
              <div className="w-20 h-20">
                <CircularProgressbar
                  value={
                    parseInt(
                      analytics?.application_readiness?.score?.replace(
                        "%",
                        ""
                      ) || "0"
                    ) || 0
                  }
                  text={`${analytics?.application_readiness?.score || 0}`}
                  styles={buildStyles({
                    textColor: "#399efc",
                    pathColor: "#399efc",
                    trailColor: "#d1d5db",
                    textSize: "16px",
                    textStyle: {
                      fontWeight: "bold",
                    },
                  })}
                />
              </div>
              <h1 className=" text-sm my-2 text-gray-500">
                {analytics?.application_readiness?.reason}
              </h1>
            </div>
            <div className="bg-off-white rounded p-4">
              <div className="mt-2">
                <p className="text-sm text-green-600 font-semibold">
                  Matched Skills:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {analytics?.skill_match_breakdown?.matched_skills?.map(
                    (skill, idx) => (
                      <p key={idx}>{skill}</p>
                    )
                  )}
                </ul>
                <p className="text-sm text-red-600 font-semibold mt-2">
                  Missing Skills:
                </p>
                <div className=" flex flex-wrap flex-col gap-2">
                  {analytics?.skill_match_breakdown?.missing_skills?.map(
                    (skill, idx) => (
                      <p
                        className=" text-xs bg-light_blue rounded-3xl px-3 py-1 text-gray-600 font-semibold"
                        key={idx}
                      >
                        {skill}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="bg-off-white rounded p-4">
              <h2 className="font-bold text-gray-700 mb-2">
                What you need to learn
              </h2>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {analytics?.skill_match_breakdown?.missing_skills?.length >
                0 ? (
                  analytics.skill_match_breakdown.missing_skills.map(
                    (skill, idx) => <li key={idx}>{skill}</li>
                  )
                ) : (
                  <li>You're all set!</li>
                )}
              </ul>
            </div>

            <div className="bg-off-white rounded p-4">
              <h2 className="font-bold text-gray-700 mb-2">Job Summary</h2>
              <p className="text-sm text-gray-500">
                {analytics?.job_summary || "No job summary available."}
              </p>
            </div>
          </section>
        </div>
      </div>
      <div className=" w-full ">
        <Footer />
      </div>
    </div>
  );
}

export default JobDetails;
