import React, { useEffect, useState } from "react";
import StudentNavbar from "../../components/StudentNavbar";
import { getRequest } from "../../utils/apiConfig";
import authHook from "../../context/AuthContext";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { CiMobile1 } from "react-icons/ci";
import { FaGithub, FaLinkedin, FaEdit } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import AddEducationModel from "../../components/models/AddEducationModel";
import EditEducationModel from "../../components/models/EditEducationModel";

function Profile() {
  const [studentData, setstudentData] = useState([]);
  const [editEducationData, seteditEducationData] = useState();

  const { token } = authHook();
  const getData = async () => {
    const res = await getRequest("student", token);
    console.log(res?.data);
    setstudentData(res?.data);
  };

  useEffect(() => {
    getData();
  }, [token]);

  return (
    <div className=" w-full h-full bg-off-white overflow-y-auto flex flex-col gap-5">
      <div className=" w-full h-[8%] sticky top-0">
        <StudentNavbar />
      </div>
      <div className=" flex gap-4 p-5 h-[92%] overflow-y-auto">
        <div className=" w-[65%] flex flex-col gap-3 h-full overflow-y-auto">
          <section className=" flex gap-5 items-center bg-white rounded p-5">
            <div className=" rounded-full bg-main_blue w-20 h-20"></div>
            <div className=" flex flex-col gap-1">
              <h1 className=" text-2xl text-gray-700 font-bold">
                {studentData?.name}
              </h1>
              <section className=" flex gap-1">
                <p className=" text-gray-500">
                  <FaMapMarkerAlt size={20} />
                </p>
                <p className=" text-gray-500">
                  {studentData?.address?.flat_no},
                  {studentData?.address?.building_name},
                  {studentData?.address?.area},
                  <br />
                  {studentData?.address?.city}
                  {studentData?.address?.pincode}
                </p>
              </section>
              <p className=" text-sm text-gray-500">
                <span className=" text-gray-500 font-semibold">
                  Active from:
                </span>{" "}
                1 year
              </p>
            </div>
          </section>
          <section className=" bg-white p-5 rounded">
            <div className=" flex flex-col gap-1">
              <section className=" flex justify-between items-center">
                <h1 className="font-semibold">Skills</h1>
                <div className=" flex gap-2">
                  <IoAddCircleOutline
                    size={25}
                    color="#399efc"
                    className=" cursor-pointer"
                  />
                  <FaEdit
                    size={22}
                    color="#399efc"
                    className=" cursor-pointer"
                  />
                </div>
              </section>
              <div className=" flex flex-wrap gap-3 text-sm text-gray-700">
                {studentData?.skills?.map((item, index) => {
                  return (
                    <h1
                      key={index}
                      className=" bg-light_blue px-3 py-1 rounded-3xl"
                    >
                      {item}
                    </h1>
                  );
                })}
              </div>
            </div>
          </section>
          <section className=" bg-white p-5 rounded">
            <div className=" flex flex-col gap-2">
              <section className=" flex justify-between items-center">
                <h1 className="font-semibold">Education</h1>
                <div className=" flex gap-2">
                  <IoAddCircleOutline
                    size={25}
                    color="#399efc"
                    className=" cursor-pointer"
                    onClick={() => {
                      document.getElementById("addEducationModel").showModal();
                    }}
                  />
                  <FaEdit
                    size={22}
                    color="#399efc"
                    className=" cursor-pointer"
                    onClick={() => {
                      document.getElementById("editEducationModal").showModal();
                    }}
                  />
                </div>
              </section>
              <div className=" flex flex-col gap-3 text-sm text-gray-700">
                {studentData?.education?.map((item, index) => {
                  return (
                    <div key={index} className=" p-4 rounded-md bg-off-white">
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
            </div>
          </section>
          <section className=" bg-white p-5 rounded">
            <div className=" flex flex-col gap-2">
              <section className=" flex justify-between items-center">
                <h1 className="font-semibold">Experience</h1>
                <div className=" flex gap-2">
                  <IoAddCircleOutline
                    size={25}
                    color="#399efc"
                    className=" cursor-pointer"
                  />
                  <FaEdit
                    size={22}
                    color="#399efc"
                    className=" cursor-pointer"
                  />
                </div>
              </section>
              <div className=" flex flex-col gap-3 text-sm text-gray-700">
                {studentData?.experience?.map((item, index) => {
                  return (
                    <div key={index} className=" p-4 rounded bg-off-white">
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
            </div>
          </section>
          <section className=" bg-white p-5 rounded">
            <div className=" flex flex-col gap-2">
              <section className=" flex justify-between items-center">
                <h1 className="font-semibold">Projects</h1>
                <div className=" flex gap-2">
                  <IoAddCircleOutline
                    size={25}
                    color="#399efc"
                    className=" cursor-pointer"
                  />
                  <FaEdit
                    size={22}
                    color="#399efc"
                    className=" cursor-pointer"
                  />
                </div>
              </section>
              <div className=" flex flex-col gap-3 text-sm text-gray-700">
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
            </div>
          </section>
        </div>
        <div className=" w-[35%] flex flex-col gap-4">
          <section className=" flex flex-col gap-2 bg-white rounded p-4">
            <h1 className=" font-bold">Contact Details</h1>
            <div className=" text-sm">
              <section className=" flex gap-1 items-center">
                <MdMailOutline size={15} color=" gray" />
                <p className=" text-gray-500 font-semibold">Email</p>
              </section>
              <section className=" flex items-center">
                <div className=" w-[5%]"></div>
                <p>{studentData?.mail}</p>
              </section>
            </div>
            <div className=" text-sm">
              <section className=" flex gap-1 items-center">
                <CiMobile1 size={15} color=" gray" />
                <p className=" text-gray-500 font-semibold">Mobile No.</p>
              </section>
              <section className=" flex items-center">
                <div className=" w-[5%]"></div>
                <p>{studentData?.mail}</p>
              </section>
            </div>
          </section>

          <section className=" flex flex-col gap-2 bg-white rounded p-4">
            <h1 className=" font-bold">Social Links</h1>
            <div className=" text-sm">
              <section className=" flex gap-1 items-center">
                <FaGithub size={15} color=" gray" />
                <p className=" text-gray-500 font-semibold">Github</p>
              </section>
              <section className=" flex items-center">
                <div className=" w-[5%]"></div>
                <p>{studentData?.github_url}</p>
              </section>
            </div>
            <div className=" text-sm">
              <section className=" flex gap-1 items-center">
                <FaLinkedin size={15} color=" gray" />
                <p className=" text-gray-500 font-semibold">LinkedIn</p>
              </section>
              <section className=" flex items-center">
                <div className=" w-[5%]"></div>
                <p>{studentData?.linkedin_url}</p>
              </section>
            </div>
          </section>
        </div>
      </div>

      <AddEducationModel />
      <EditEducationModel data={studentData?.education} />
    </div>
  );
}

export default Profile;
