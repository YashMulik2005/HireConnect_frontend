import React, { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../utils/apiConfig";
import { useNavigate, useParams } from "react-router";
import authHook from "../../context/AuthContext";
import moment from "moment";
import Select from "react-select";
import toast from "react-hot-toast";

function ApplicantsDetails() {
  const [studentData, setstudentData] = useState();
  const { id } = useParams();
  const { token } = authHook();
  const navigate = useNavigate();
  const statusOptions = [
    { value: "Under Review", label: "Under Review" },
    { value: "Shortlisted", label: "Shortlisted" },
    { value: "Interview Scheduled", label: "Interview Scheduled" },
    { value: "Selected", label: "Selected" },
    { value: "Rejected", label: "Rejected" },
  ];

  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleStatusChange = async (selectedOption) => {
    console.log("New Status:", selectedOption.value);
    // Optional: call API to update status
    const res = await postRequest(
      `application/statusUpdate/${id}`,
      { status: selectedOption.value },
      token
    );
    if (res.status) {
      setSelectedStatus(selectedOption);
      toast.success("Status updated successfully ");
    }
  };

  const getdata = async () => {
    const res = await getRequest(`application/${id}`, token);
    const data = res?.data;
    setstudentData(data);

    const matched = statusOptions.find(
      (option) => option.value === data?.status
    );
    setSelectedStatus(matched);
  };

  useEffect(() => {
    if (token && id) {
      getdata();
    }
  }, [token, id]);

  return (
    <div className=" p-4 flex flex-col overflow-y-auto gap-4 h-full">
      <h1 className=" text-xl font-bold text-gray-700">Applicant Details</h1>
      <div className=" w-full lg:px-16 p-3 md:px-12">
        <div className=" bg-white w-full p-3 rounded flex justify-between items-center">
          <section>
            <h1 className=" font-semibold text-lg">{studentData?.name}</h1>
            <p className=" text-sm text-main_blue underline">
              <a href={studentData?.resume} target="blank">
                Resume
              </a>
            </p>
          </section>
          <section className="w-52">
            <Select
              options={statusOptions}
              value={selectedStatus}
              onChange={handleStatusChange}
              className="text-sm"
            />
          </section>
        </div>
      </div>

      <div className="bg-white w-full flex flex-col p-5 rounded gap-6 items-center">
        <section className=" flex flex-col gap-2 w-full">
          <h1 className=" text-md font-semibold">Personal Details</h1>
          <div className=" flex gap-3 w-full">
            <div className=" flex flex-col gap-1 text-sm w-full">
              <p>Name:</p>
              <input
                type="text"
                placeholder=""
                className="input bg-gray-200  px-3 py-[6px] rounded-md w-[100%]"
                disabled
                value={studentData?.name}
              />
            </div>
            <div className=" flex flex-col gap-1 text-sm w-full">
              <p>mail:</p>
              <input
                type="text"
                placeholder=""
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
              placeholder=""
              className="input bg-gray-200 px-3 py-[6px] rounded-md w-[50%]"
              disabled
              value={studentData?.mobile_no}
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
                  className=" rounded-3xl text-sm px-4 py-[4px] bg-light_blue text-gray-600 font-bold"
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
                      <h1 className=" text-lg font-semibold">{item?.degree}</h1>
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
                      <h1 className=" text-lg font-semibold">{item?.title}</h1>
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
              <span className=" font-semibold text-gray-500 text-sm">
                Github Link:
              </span>{" "}
              <a
                href={studentData?.github_url}
                target="black"
                className=" text-sm"
              >
                {studentData?.github_url}
              </a>
            </p>
            <p>
              <span className=" font-semibold text-gray-500 text-sm">
                LinkedIn Link:
              </span>{" "}
              <a
                href={studentData?.linkedin_url}
                target="black"
                className="text-sm"
              >
                {studentData?.linkedin_url}
              </a>
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

export default ApplicantsDetails;
