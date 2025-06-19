import React from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import HomeCard from "./HomeCard";
import { IoSearch } from "react-icons/io5";
import { TiDocumentText } from "react-icons/ti";
import { LuUpload } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { motion } from "framer-motion";

function StudentSection() {
  const steps = [
    {
      title: "Register your account",
      des: "To start the application process, you will need to create an account.",
      icon: <IoSearch color="white" size={25} />,
    },
    {
      title: "Upload Your Resume",
      des: "Fill and complete your profile and resume details.",
      icon: <TiDocumentText color="white" size={25} />,
    },
    {
      title: "Search your job",
      des: "Find the job you always wanted, and apply to job opportunities.",
      icon: <LuUpload color="white" size={20} />,
    },
    {
      title: "Apply for dream job",
      des: "Apply for latest job vacancies across top companies in India.",
      icon: <FaRegUser color="white" size={20} />,
    },
  ];

  return (
    <div className="w-full py-16 px-4 md:px-16 bg-off-white font-inter">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Text Section */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 font-serif">
            Steps to Follow
          </h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-blue-500 text-xl">
                <IoMdCheckmarkCircle color="#399efc" size={30} />
              </span>
              <p>
                We Work Remotely is the largest remote work community in the
                world.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 text-xl">
                <IoMdCheckmarkCircle color="#399efc" size={30} />
              </span>
              <p>
                With over 2M visitors, Jobey is number one destination to find
                and list incredible remote jobs.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 text-xl">
                <IoMdCheckmarkCircle color="#399efc" size={30} />
              </span>
              <p>Work remotely with top companies.</p>
            </li>
          </ul>
        </div>

        {/* Steps with Animated Cards */}
        <div className="md:w-1/2">
          <div className="flex flex-col gap-8">
            {steps.map((step, index) => (
              <motion.section
                key={index}
                className={`flex ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <HomeCard {...step} w={true} />
              </motion.section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentSection;
