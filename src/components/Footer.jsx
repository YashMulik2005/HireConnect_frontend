import React from "react";
import { FaSpaceAwesome } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <div className=" bg-gray-800 text-white flex flex-col justify-center items-center p-5 gap-7">
      <section>
        <div className="flex justify-center items-center gap-3 full">
          <FaSpaceAwesome size={25} color="#399efc" />
          <h1 className=" text-xl font-semibold text-white font-serif">
            Hire<span className=" text-main_blue">Connect</span>
          </h1>
        </div>
      </section>
      <section className=" flex gap-14 text-white text-sm">
        <h1>Home</h1>
        <h1>Contact us</h1>
        <h1>Services</h1>
        <h1>Privacy Policy</h1>
      </section>
      <section className=" flex gap-5 text-white text-sm">
        <FaGithub size={25} color="white" />
        <FaGithub size={25} color="white" />
        <FaGithub size={25} color="white" />
        <FaGithub size={25} color="white" />
      </section>
    </div>
  );
}

export default Footer;
