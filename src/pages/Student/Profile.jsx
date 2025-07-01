import React, { useEffect, useState } from "react";
import StudentNavbar from "../../components/StudentNavbar";
import { getRequest, postRequest } from "../../utils/apiConfig";
import authHook from "../../context/AuthContext";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { CiMobile1 } from "react-icons/ci";
import { FaGithub, FaLinkedin, FaEdit } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiCamera } from "react-icons/fi";
import AddEducationModel from "../../components/models/AddEducationModel";
import EditEducationModel from "../../components/models/EditEducationModel";
import AddExperienceModel from "../../components/models/AddExperienceModel";
import EditExperienceModel from "../../components/models/EditExperienceModel";
import AddProject from "../../components/models/AddProject";
import EditProjectModel from "../../components/models/EditProjectModel";
import SkillsModel from "../../components/models/SkillsModel";
import dataHook from "../../context/DataContext";
import ContactDetailsModel from "../../components/models/ContactDeatilsModel";
import SocialLinksModel from "../../components/models/SocialLinksModel";
import toast from "react-hot-toast";
import default_profile from "../../assets/default_profile.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

function Profile() {
  const { studentData, setstudentData } = dataHook();
  const { token, setuserdata, settoken } = authHook();
  const [selectedFile, setselectedFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [loader, setloader] = useState(false);
  const [profileImage, setProfileImage] = useState(studentData?.profileUrl);
  const navigate = useNavigate();

  const handleFileUpload = async (file) => {
    setloader(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "HireConnectResumePDF");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/raw/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    console.log(data?.secure_url);
    setUploadedUrl(data?.secure_url);

    const result = await postRequest(
      "student/resume",
      { resume: data?.secure_url },
      token
    );

    const resumeData = result.data;
    setstudentData((prev) => ({
      ...prev,
      resume: data?.secure_url,
    }));
    setloader(false);
  };

  const getData = async () => {
    const res = await getRequest("student", token);
    console.log(res?.data);
    setstudentData(res?.data);
  };

  const handleImageChange = async (e) => {
    try {
      console.log("in api");

      const file = e.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "HireConnectProfileImages");
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();

        const result = await postRequest(
          "student/updateProfileImage",
          {
            profile_img: data?.secure_url,
          },
          token
        );

        if (result?.status) {
          toast.success("Profile Image Updated Sucessfully.");
          setstudentData((prev) => ({
            ...prev,
            profile_img: data?.profile_img,
          }));
        }
      }
    } catch (err) {
      console.error("Error:", err);
      const message =
        err?.response?.data?.message ||
        "Something went wrong. Please try again later.";

      toast.error(message);
    }
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
            <div className="relative w-20 h-20">
              <div className="w-full h-full rounded-full overflow-hidden ">
                <img
                  src={studentData?.profile_img || default_profile}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <label
                className="absolute -bottom-2 -right-2 bg-white border border-gray-300 p-2 rounded-full shadow-md cursor-pointer z-10"
                title="Update Profile Picture"
              >
                <FiCamera size={16} className="text-main_blue" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
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
                  {studentData?.address?.city},{studentData?.address?.pincode}
                </p>
              </section>
              <div
                onClick={() => {
                  document.getElementById("logout_model").showModal();
                }}
                className=" cursor-pointer text-sm text-white flex items-center justify-center w-18 rounded-3xl px-2 py-1 font-semibold bg-red-500"
              >
                {/* <span className=" text-gray-500 font-semibold">
                  Active from:
                </span>{" "}
                1 year */}
                <p>Logout</p>
              </div>
            </div>
            <dialog id="logout_model" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg text-gray-800">Log Out</h3>
                <p className="py-4 text-gray-600">
                  Are you sure you want to log out? You will need to sign in
                  again to access your account.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      settoken(null);
                      setuserdata(null);
                      Cookies.remove("student_token");
                      Cookies.remove("student_data");
                      navigate("/auth");
                    }}
                    className="cursor-pointer bg-red-500 text-sm font-semibold text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition"
                  >
                    Yes, Log Out
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById("logout_model").close();
                    }}
                    className="cursor-pointer text-sm font-semibold text-gray-800 px-4 py-1.5 rounded-lg bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </dialog>
          </section>
          <section className=" bg-white p-5 rounded">
            <div className=" flex flex-col gap-1">
              <section className=" flex justify-between items-center">
                <h1 className="font-semibold">Skills</h1>
                <div className=" flex gap-2">
                  {/* <IoAddCircleOutline
                    size={25}
                    color="#399efc"
                    className=" cursor-pointer"
                  /> */}
                  <FaEdit
                    size={22}
                    color="#399efc"
                    className=" cursor-pointer"
                    onClick={() => {
                      document.getElementById("SkillsModel").showModal();
                    }}
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
                      <h1 className=" text-gray-500">
                        <span className=" font-semibold">Grade: </span>
                        {item?.grade}
                      </h1>
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
                    onClick={() => {
                      document.getElementById("addExperienceModel").showModal();
                    }}
                  />
                  <FaEdit
                    size={22}
                    color="#399efc"
                    className=" cursor-pointer"
                    onClick={() => {
                      document
                        .getElementById("editExperienceModal")
                        .showModal();
                    }}
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
                    onClick={() => {
                      document.getElementById("addProjectModel").showModal();
                    }}
                  />
                  <FaEdit
                    size={22}
                    color="#399efc"
                    className=" cursor-pointer"
                    onClick={() => {
                      document.getElementById("editProjectModal").showModal();
                    }}
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
          <section className="bg-white p-5 rounded">
            <h1 className="font-semibold">Resume</h1>

            {loader ? (
              <h1>Loading</h1>
            ) : (
              <>
                {" "}
                {studentData?.resume && (
                  <div className="my-2">
                    <a
                      href={studentData?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-main_blue text-white inline rounded px-2 py-1 capitalize"
                    >
                      View Your Resume
                    </a>
                  </div>
                )}
                <section className="flex flex-col gap-2 mt-3">
                  <div>
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
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setselectedFile(file);
                          await handleFileUpload(file);
                        }
                      }}
                    />
                  </label>

                  {/* {selectedFile && (
                  <div className="flex items-center justify-between bg-gray-100 border border-gray-300 rounded px-3 py-2 text-gray-700">
                    <span className="truncate">{selectedFile.name}</span>
                    <span className="text-xs ml-2">
                      {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                    </span>
                    <button
                      className="ml-3 text-gray-500 hover:text-red-500"
                      onClick={() => {
                        setselectedFile(null);
                        setUploadedUrl("");
                      }}
                    >
                      ✕
                    </button>
                  </div>
                )} */}
                </section>
              </>
            )}

            {/* {studentData?.resume && (
              <div className="my-2">
                <a
                  href={studentData?.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-main_blue text-white inline rounded px-2 py-1 capitalize"
                >
                  View Your Resume
                </a>
              </div>
            )} */}

            {/* <section className="flex flex-col gap-2 mt-3">
              <div>
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
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setselectedFile(file);
                      await handleFileUpload(file);
                    }
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
                    onClick={() => {
                      setselectedFile(null);
                      setUploadedUrl("");
                    }}
                  >
                    ✕
                  </button>
                </div>
              )}
            </section> */}
          </section>
        </div>
        <div className=" w-[35%] flex flex-col gap-4">
          <section className=" flex flex-col gap-2 bg-white rounded p-4">
            <section className=" flex justify-between items-center">
              <h1 className=" font-bold">Contact Details</h1>
              <FaEdit
                size={17}
                color="#399efc"
                className=" cursor-pointer"
                onClick={() => {
                  document.getElementById("contactDetailsModel").showModal();
                }}
              />
            </section>
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
                <p>{studentData?.mobile_no}</p>
              </section>
            </div>
          </section>

          <section className=" flex flex-col gap-2 bg-white rounded p-4">
            <section className=" flex justify-between items-center">
              <h1 className=" font-bold">Social Links</h1>
              <FaEdit
                size={17}
                color="#399efc"
                className=" cursor-pointer"
                onClick={() => {
                  document.getElementById("socialLinksModel").showModal();
                }}
              />
            </section>
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
      <AddExperienceModel />
      <EditExperienceModel data={studentData?.experience} />
      <AddProject />
      <EditProjectModel data={studentData?.projects} />
      <SkillsModel data={studentData?.skills} />
      <ContactDetailsModel
        data={{
          mail: studentData?.mail,
          mobile_no: studentData?.mobile_no,
        }}
      />
      <SocialLinksModel
        data={{
          github_url: studentData?.github_url,
          linkedin_url: studentData?.linkedin_url,
        }}
      />
    </div>
  );
}

export default Profile;
