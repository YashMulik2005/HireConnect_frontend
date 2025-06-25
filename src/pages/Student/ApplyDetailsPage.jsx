import React, { useEffect, useState } from "react";
import StudentNavbar from "../../components/StudentNavbar";
import { getRequest } from "../../utils/apiConfig";
import authHook from "../../context/AuthContext";
import { useParams } from "react-router";
import Footer from "../../components/Footer";

function ApplyDetailsPage() {
  const { id } = useParams();
  const [studentData, setstudentData] = useState([]);
  const [jobData, setjobData] = useState([]);
  const { token } = authHook();

  const getData = async () => {
    const res = await getRequest("student", token);
    console.log(res?.data);
    setstudentData(res?.data);
  };

  const getJobData = async () => {
    const result = await getRequest(`job/${id}`);
    setjobData(result?.data);
  };

  useEffect(() => {
    getData();
    getJobData();
  }, [token]);

  return (
    <div className=" w-full h-full bg-off-white overflow-y-auto">
      <div className=" w-full h-[8%] sticky top-0">
        <StudentNavbar />
      </div>
      <div className="w-full px-24 flex flex-col items-center ">
        <div className=" bg-white w-full flex p-5 rounded gap-6 mt-5 items-center">
          <div className=" w-[5%] ">
            <img className=" w-full h-full" src={jobData?.company?.logo_url} />
          </div>
          <div className=" w-[95%]">
            <h1 className=" text-xl font-bold">{jobData?.title}</h1>
            <section className=" flex gap-3 text-gray-500 text-sm">
              <p>{jobData?.company?.name},</p>
              <p>
                {jobData?.address?.area}, {jobData?.address?.city},
              </p>
              <p>{jobData?.job_type}</p>
            </section>
          </div>
        </div>
        <div className="bg-white w-full flex flex-col p-5 rounded gap-6 mt-5 items-center">
          <section className=" flex flex-col gap-2 w-full">
            <h1 className=" text-md font-semibold">Personal Details</h1>
            <div className=" flex gap-3 w-full">
              <div className=" flex flex-col gap-1 text-sm w-full">
                <p>Name:</p>
                <input
                  type="text"
                  placeholder="You can't touch this"
                  className="input bg-gray-200  px-3 py-[6px] rounded-md w-[100%]"
                  disabled
                  value={studentData?.name}
                />
              </div>
              <div className=" flex flex-col gap-1 text-sm w-full">
                <p>mail:</p>
                <input
                  type="text"
                  placeholder="You can't touch this"
                  className="input bg-gray-200 px-3 py-[6px] rounded-md w-[100%]"
                  disabled
                  value={studentData?.mail}
                />
              </div>
            </div>
            <div className=" flex flex-col gap-1 text-sm">
              <p>Mobile No:</p>
              <input
                type="text"
                placeholder="You can't touch this"
                className="input bg-gray-200 px-3 py-[6px] rounded-md w-[50%]"
                disabled
                value={studentData?.name}
              />
            </div>
          </section>
          <section className=" flex flex-col gap-2 w-full">
            <h1 className=" text-md font-semibold">Skills</h1>
            <div className=" flex gap-3">
              {studentData?.skills?.map((item, index) => {
                return (
                  <h1
                    key={index}
                    className=" rounded-xl px-4 py-[4px] bg-light_blue text-gray-600 font-bold"
                  >
                    {item}
                  </h1>
                );
              })}
            </div>
          </section>
          {studentData?.experience && (
            <section className=" flex flex-col gap-2 w-full">
              <h1 className=" text-md font-semibold">Experience</h1>
              <div className=" flex flex-col gap-3">
                {studentData?.experience?.map((item, index) => {
                  return (
                    <div className=" p-4 rounded bg-off-white">
                      <section className=" flex justify-between">
                        <h1 className=" text-lg font-semibold">
                          {item?.position}
                        </h1>
                        <h1 className=" text-sm">
                          {item?.startDate} - {item?.endDate}
                        </h1>
                      </section>
                      <h1 className="">{item?.company}</h1>
                      <h1 className=" text-gray-500">{item?.description}</h1>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
          {studentData?.education && (
            <section className=" flex flex-col gap-2 w-full">
              <h1 className=" text-md font-semibold">Education</h1>
              <div className=" flex flex-col gap-3">
                {studentData?.education?.map((item, index) => {
                  return (
                    <div className=" p-4 rounded bg-off-white">
                      <section className=" flex justify-between">
                        <h1 className=" text-lg font-semibold">
                          {item?.degree}
                        </h1>
                        <h1 className=" text-sm">
                          {item?.startYear} - {item?.endYear}
                        </h1>
                      </section>
                      <h1 className="">{item?.institution}</h1>
                      <h1 className=" text-gray-500">{item?.grade}</h1>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
          {studentData?.projects && (
            <section className=" flex flex-col gap-2 w-full">
              <h1 className=" text-md font-semibold">Projects</h1>
              <div className=" flex flex-col gap-3">
                {studentData?.projects?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className=" flex flex-col gap-1 p-4 rounded bg-off-white"
                    >
                      <section className=" flex justify-between">
                        <h1 className=" text-lg font-semibold">
                          {item?.title}
                        </h1>
                        <h1 className=" text-sm">
                          {item?.startDate} - {item?.endDate}
                        </h1>
                      </section>
                      <h1 className=" text-gray-500">{item?.description}</h1>
                      <h1 className="">
                        <span className=" font-semibold">Live link:</span>{" "}
                        {item?.liveLink}
                      </h1>
                      <h1 className=" ">
                        <span className=" font-semibold">GitHub link: </span>
                        {item?.githubLink}
                      </h1>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
          <div className=" flex justify-end w-full">
            <h1
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className=" text-right bg-main_blue text-white px-4 py-2 rounded cursor-pointer"
            >
              Next
            </h1>
          </div>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">
                Press ESC key or click on ✕ button to close
              </p>
            </div>
          </dialog>
        </div>
      </div>
      <div className=" mt-6">
        <Footer />
      </div>
    </div>
  );
}

export default ApplyDetailsPage;
