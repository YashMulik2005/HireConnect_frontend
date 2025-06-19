import React from "react";
import person from "../../assets/home_person.png";
import Navbar from "../../components/Navbar";
import HomeCard from "./HomeCard";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "motion/react";

function Homepage() {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className=" h-[10%]">
        <Navbar />
      </div>
      <div className=" h-[90%] w-full bg-cover bg-center flex flex-col justify-end items-center">
        <div className="">
          <p className="text-gray-600 capitalize mb-2 font-semibold">
            Find Talent.{" "}
            <span className=" text-dark_blue">Find Opportunity</span>.
          </p>
          <h1 className="text-3xl font-bold w-[500px] whitespace-nowrap overflow-hidden">
            <Typewriter
              words={[
                "Linking Companies & Candidates.",
                "Bridging Jobs and Aspirations.",
                "Empowering Careers & Teams.",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </h1>
        </div>
        <div className=" h-[80%] relative rounded-tl-full rounded-tr-full border-gray-300 pt-20">
          {/* <motion.div
            className=" absolute top-1/3 -left-1/5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <HomeCard
              title="For Candidates"
              des="Find jobs that fit your skills and goals."
            />
          </motion.div>
          <motion.div
            className="absolute top-1/3 -right-1/5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <HomeCard
              title="For Employers"
              des="Post jobs effortlessly and connect with top-tier talent."
            />
          </motion.div> */}
          <img src={person} className=" w-full h-full" />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
