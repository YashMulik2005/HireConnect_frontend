import React, { useState } from "react";
import StudentNavbar from "../../components/StudentNavbar";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import JobCard from "./JobCard";
import { useEffect } from "react";
import axios from "axios";
import { getRequest } from "../../utils/apiConfig";
import Loader from "../../components/Loader";

function HomePage() {
  const jobTypes = ["Remote", "Hybrid", "Offline"];
  const jobCategories = [
    "Design",
    "Development",
    "Marketing",
    "Sales",
    "Management",
    "Finance",
  ];
  const experienceOptions = [
    "Less than 1 Years",
    "1 - 2 Years",
    "3 - 5 Years",
    "5 Years +",
  ];

  const jobModes = [
    "Full-time",
    "Part-time",
    "Internship",
    "Freelance",
    "Contract",
  ];

  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(10000);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [selectedModes, setSelectedModes] = useState([]);
  const [loader, setloader] = useState(true);
  const [jobData, setJobData] = useState([]);

  const handleCheckboxChangeJobType = (type) => {
    const lowerType = type.toLowerCase();
    setSelectedTypes((prev) =>
      prev.includes(lowerType)
        ? prev.filter((t) => t !== lowerType)
        : [...prev, lowerType]
    );
  };

  const handleCheckboxChangeCategory = (category) => {
    const lowerCategory = category.toLowerCase();
    setSelectedCategories((prev) =>
      prev.includes(lowerCategory)
        ? prev.filter((item) => item !== lowerCategory)
        : [...prev, lowerCategory]
    );
  };

  const handleCheckboxChangeExperience = (exp) => {
    const lowerExp = exp.toLowerCase();
    setSelectedExperience((prev) =>
      prev.includes(lowerExp)
        ? prev.filter((item) => item !== lowerExp)
        : [...prev, lowerExp]
    );
  };

  const handleCheckboxChangeJobMode = (mode) => {
    const lowerMode = mode.toLowerCase();
    setSelectedModes((prev) =>
      prev.includes(lowerMode)
        ? prev.filter((item) => item !== lowerMode)
        : [...prev, lowerMode]
    );
  };

  const getData = async () => {
    setloader(true);

    const queryParams = new URLSearchParams();

    if (selectedTypes.length > 0) {
      queryParams.append("job_type", selectedTypes.join(","));
    }

    if (selectedCategories.length > 0) {
      queryParams.append("categories", selectedCategories.join(","));
    }

    if (selectedExperience.length > 0) {
      queryParams.append("experience", selectedExperience.join(","));
    }

    if (selectedModes.length > 0) {
      queryParams.append("job_modes", selectedModes.join(","));
    }

    if (minSalary !== 0) {
      queryParams.append("min_salary", minSalary);
    }

    if (maxSalary !== 10000) {
      queryParams.append("max_salary", maxSalary);
    }

    try {
      const result = await getRequest(`job?${queryParams.toString()}`);
      setJobData(result?.data || []);
    } catch (err) {
      console.error("Error fetching filtered jobs:", err);
      setJobData([]);
    }

    setloader(false);
  };

  useEffect(() => {
    getData();
  }, [
    selectedTypes,
    selectedCategories,
    selectedExperience,
    selectedModes,
    minSalary,
    maxSalary,
  ]);

  return (
    <div className=" w-full h-full bg-off-white">
      <div className=" h-[8%] w-full">
        <StudentNavbar />
      </div>
      <div className=" h-[92%] w-full px-24 flex flex-col items-center gap-7 overflow-y-auto">
        {/* //top search section */}
        <div className=" bg-white flex w-full px-4 py-2 rounded gap-2 mt-5">
          <section className="w-full border-r-[1px] border-gray-200 flex justify-center items-center">
            <FaBriefcase className=" text-gray-300" size={23} />
            <input
              className="py-2 px-3 w-full focus:outline-none font-semibold text-gray-600"
              placeholder="Job Type"
            />
          </section>
          <section className=" w-full border-r-[1px] border-gray-200 flex justify-center items-center">
            <FaBriefcase className=" text-gray-300" size={23} />
            <input
              className=" py-2 px-2 w-full focus:outline-none font-semibold text-gray-600"
              placeholder="Job Mode"
            />
          </section>
          <section className=" w-full border-r-[1px] border-gray-200 flex justify-center items-center">
            <FaMapMarkerAlt className=" text-gray-300" size={23} />
            <input
              className=" py-2 px-2 w-full focus:outline-none font-semibold text-gray-600"
              placeholder="Location"
            />
          </section>
          <button className=" bg-main_blue px-4 py-2 text-white font-semibold rounded cursor-pointer">
            Search
          </button>
        </div>
        {/* <section className=" w-full font-inter my-3">
          <h1 className=" text-dark_blue text-xl font-bold text-left">
            24 Jobs found
          </h1>
        </section> */}
        {/* search results */}
        <div className=" w-full h-[100%] flex gap-5 overflow-y-auto">
          <div className=" w-[25%] h-full overflow-y-auto bg-white rounded flex flex-col p-2">
            <section className=" text-sm border-b-[1px] border-gray-200 p-2">
              <h1 className=" font-extrabold mb-2">Job Type</h1>
              {jobTypes.map((type) => (
                <main key={type} className="flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type.toLowerCase())}
                    onChange={() => handleCheckboxChangeJobType(type)}
                    className="w-4 h-4 accent-[#399efc] text-white rounded"
                  />
                  <label className="capitalize text-gray-600 font-semibold">
                    {type}
                  </label>
                </main>
              ))}
            </section>

            <section className=" text-sm border-b-[1px] border-gray-200 p-2">
              <h1 className=" font-extrabold mb-2">Categories</h1>
              {jobCategories.map((type) => (
                <main key={type} className="flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(type.toLowerCase())}
                    onChange={() => handleCheckboxChangeCategory(type)}
                    className="w-4 h-4 accent-[#399efc] text-white rounded"
                  />
                  <label className="capitalize text-gray-600 font-semibold">
                    {type}
                  </label>
                </main>
              ))}
            </section>
            <section className=" text-sm border-b-[1px] border-gray-200 p-2">
              <h1 className="font-extrabold  mb-2">Salary</h1>

              <div className="flex justify-between text-gray-700 font-medium mb-2">
                <span>₹{minSalary}</span>
                <span>₹{maxSalary}</span>
              </div>

              <input
                type="range"
                min={0}
                max={5000}
                value={minSalary}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setMinSalary(value);
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  accentColor: "#399efc",
                }}
              />

              <input
                type="range"
                min={0}
                max={5000}
                value={maxSalary}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setMaxSalary(value);
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  accentColor: "#399efc",
                }}
              />
            </section>
            <section className=" text-sm border-b-[1px] border-gray-200 p-2">
              <h1 className="font-extrabold mb-4">Experience</h1>
              {experienceOptions.map((exp) => (
                <main key={exp} className="flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    checked={selectedExperience.includes(exp)}
                    onChange={() => handleCheckboxChangeExperience(exp)}
                    className="w-4 h-4 accent-[#399efc] text-white rounded"
                  />
                  <label className="capitalize text-gray-600 font-semibold">
                    {exp}
                  </label>
                </main>
              ))}
            </section>
            <section className=" text-sm p-2">
              <h1 className="font-extrabold mb-4">Job Modes</h1>
              {jobModes.map((exp) => (
                <main key={exp} className="flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    checked={selectedModes.includes(exp.toLowerCase())}
                    onChange={() => handleCheckboxChangeJobMode(exp)}
                    className="w-4 h-4 accent-[#399efc] text-white rounded"
                  />
                  <label className="capitalize text-gray-600 font-semibold">
                    {exp}
                  </label>
                </main>
              ))}
            </section>
          </div>
          <div className=" w-[75%] h-full overflow-y-auto flex flex-col gap-3">
            {loader ? (
              <>
                <Loader />
                <Loader />
                <Loader />
                <Loader />
              </>
            ) : (
              jobData?.map((item, index) => {
                return <JobCard data={item} key={index} />;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
