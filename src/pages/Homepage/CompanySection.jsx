import React from "react";
import HomeCard from "./HomeCard";
import { BsClipboard2Data, BsPostcard } from "react-icons/bs";
import { MdArtTrack } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { motion } from "framer-motion"; // ✅ use 'framer-motion'

function CompanySection() {
  return (
    <div className="bg-light_blue flex flex-col justify-center items-center md:p-10 p-3 gap-10">
      <h2 className="text-3xl font-bold text-dark_blue font-serif">
        Powerful Features for Companies
      </h2>

      <div className="flex gap-10 justify-between items-center flex-wrap">
        {[
          {
            title: "Post Jobs Easily",
            des: "Create and publish job listings quickly.",
            icon: <BsPostcard color="white" size={20} />,
          },
          {
            title: "View Candidate Profiles",
            des: "Access detailed student profiles and resumes.",
            icon: <BsClipboard2Data color="white" size={20} />,
          },
          {
            title: "Track Applications",
            des: "Monitor applicant progress and status updates.",
            icon: <MdArtTrack color="white" size={25} />,
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 + index * 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <HomeCard {...item} w={false} />
          </motion.div>
        ))}
      </div>

      <div className="flex gap-10 justify-center items-center flex-wrap">
        {[
          {
            title: "Filter by Skills",
            des: "Find top talent with precise skill filters.",
            icon: <GiSkills color="white" size={20} />,
          },
          {
            title: "Manage Profile",
            des: "Update your company info and presence anytime.",
            icon: <ImProfile color="white" size={20} />,
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 + index * 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <HomeCard {...item} w={false} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default CompanySection;
