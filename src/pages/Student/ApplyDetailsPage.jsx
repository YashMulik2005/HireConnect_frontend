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
  const [selectedFile, setSelectedFile] = useState(null);
  const [coverLetter, setcoverLetter] = useState();

  const getData = async () => {
    const res = await getRequest("student", token);
    // console.log(res?.data);
    setstudentData(res?.data);
  };

  const getJobData = async () => {
    const result = await getRequest(`job/${id}`);
    setjobData(result?.data);
  };

  const submitApplication = async () => {
    const data = {
      job_id: id,
      resume: "",
      cover_letter: coverLetter,
      skills: studentData?.skills,
      education: studentData?.education,
      projects: studentData?.projects,
      github_url: studentData?.github_url,
      linkedin_url: studentData?.linkedin_url,
      experience: studentData?.experience,
      name: studentData?.name,
      mail: studentData?.mail,
      mobile_no: studentData?.mobile_no,
    };

    console.log(data);
  };

  useEffect(() => {
    getData();
    getJobData();
  }, [token]);

  return (
    <div className=" w-full h-full bg-off-white overflow-y-auto relative">
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

          {(studentData?.github_url || studentData?.linkedin_url) && (
            <section className=" flex flex-col gap-2 w-full">
              <h1 className=" text-md font-semibold">External links</h1>
              <p>
                <span className=" font-semibold">Github Link:</span>{" "}
                {studentData?.github_url}
              </p>
              <p>
                <span className=" font-semibold">LinkedIn Link:</span>{" "}
                {studentData?.linkedin_url}
              </p>
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

          <dialog id="my_modal_3" className="modal rounded-md modal-middle">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Attachaments</h3>
              <div className="text-sm my-2 flex flex-col gap-3">
                <section>
                  <p className="text-gray-600 font-semibold mb-2">
                    Cover letter:
                  </p>
                  <textarea
                    onChange={(e) => {
                      setcoverLetter(e.target.value);
                    }}
                    value={coverLetter}
                    className="w-full h-28 text-sm p-2 border border-gray-400 text-gray-600 rounded focus:outline-none"
                  />
                </section>

                <section className="flex flex-col gap-2">
                  <div>
                    <label className="text-gray-600 font-semibold">
                      Resume:
                    </label>
                    <p className="text-xs text-gray-500">
                      Upload a PDF or Word file
                    </p>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer w-fit border border-gray-300 px-3 py-2 rounded text-blue-600 hover:bg-blue-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0 0l-4-4m4 4l4-4m-4-4v4"
                      />
                    </svg>
                    <span>Browse files</span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) setSelectedFile(file);
                      }}
                    />
                  </label>

                  {selectedFile && (
                    <div className="flex items-center justify-between bg-gray-100 border border-gray-300 rounded px-3 py-2 text-gray-700">
                      <span className="truncate">{selectedFile.name}</span>
                      <span className="text-xs ml-2">
                        {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                      </span>
                      <button
                        className="ml-3 text-gray-500 hover:text-red-500"
                        onClick={() => setSelectedFile(null)}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </section>
                <div className=" flex justify-end items-center">
                  <button
                    onClick={submitApplication}
                    className=" cursor-pointer rounded bg-main_blue text-white px-4 py-[6px] font-semibold"
                  >
                    Apply
                  </button>
                </div>
              </div>
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
