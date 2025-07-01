import React from "react";
import { useForm } from "react-hook-form";
import { Typewriter } from "react-simple-typewriter";
import { FaSpaceAwesome } from "react-icons/fa6";

function CompanySignup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Signup Data:", data);
    // Handle signup logic here
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <section className="flex flex-col justify-between items-start w-[70%]">
        <div className="flex justify-center items-center gap-3">
          <FaSpaceAwesome size={20} color="#399efc" />
          <h1 className="text-[30px] font-semibold text-gray-700 font-serif">
            Hire<span className="text-main_blue">Connect</span>
          </h1>
        </div>
        <h1 className="text-gray-500 text-xs">
          <Typewriter
            words={["Empower Your Career with HireConnect"]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={1500}
          />
        </h1>
        {/* <h1 className=" text-3xl font-bold capitalize text-gray-600 mt-2">
          Welcome Back
        </h1>
        <p className=" text-sm font-semibold text-gray-500">
          Login to land your dream job.
        </p> */}
      </section>

      <form
        className="w-[70%] flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h1 className="text-gray-500 mb-1 font-semibold text-sm">
            Company Name:
          </h1>
          <input
            type="text"
            className="px-4 py-2 border text-sm border-gray-400 rounded w-full focus:outline-gray-400"
            {...register("name", {
              required: "Company name is required",
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <h1 className="text-gray-500 mb-1 font-semibold text-sm">
            Website URL:
          </h1>
          <input
            type="url"
            className="px-4 py-2 border text-sm border-gray-400 rounded w-full focus:outline-gray-400"
            placeholder="https://example.com"
            {...register("link", {
              required: "Website URL is required",
              pattern: {
                value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*\/?$/,
                message: "Enter a valid URL",
              },
            })}
          />
          {errors.link && (
            <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>
          )}
        </div>

        <div>
          <h1 className="text-gray-500 mb-1 font-semibold text-sm">
            LinkedIn URL:
          </h1>
          <input
            type="url"
            className="px-4 py-2 border text-sm border-gray-400 rounded w-full focus:outline-gray-400"
            placeholder="https://linkedin.com/company/yourcompany"
            {...register("linkedin_link", {
              required: "LinkedIn URL is required",
              pattern: {
                value: /^https?:\/\/(www\.)?linkedin\.com\/.*$/,
                message: "Enter a valid LinkedIn URL",
              },
            })}
          />
          {errors.linkedin_link && (
            <p className="text-red-500 text-sm mt-1">
              {errors.linkedin_link.message}
            </p>
          )}
        </div>

        <div>
          <h1 className="text-gray-500 text-sm mb-1 font-semibold text-sm">
            Email:
          </h1>
          <input
            type="email"
            className="px-4 py-2 border text-sm border-gray-400 rounded w-full focus:outline-gray-400"
            {...register("mail", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.mail && (
            <p className="text-red-500 text-sm mt-1">{errors.mail.message}</p>
          )}
        </div>

        <div>
          <h1 className="text-gray-500 mb-1 font-semibold text-sm">
            Password:
          </h1>
          <input
            type="password"
            className="px-4 py-1.5 border text-sm border-gray-400 rounded w-full focus:outline-gray-400"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-dark_blue text-white w-full py-2 rounded cursor-pointer"
        >
          Sign Up
        </button>
      </form>

      <section className="flex w-[70%] justify-center items-center gap-3">
        <div className="border-b-2 border-gray-500 w-20"></div>
        <p className="text-gray-600">or</p>
        <div className="border-b-2 border-gray-500 w-20"></div>
      </section>

      <h1>
        Already have an account?{" "}
        <span className="underline text-sm text-blue-500 cursor-pointer">
          Login here
        </span>
      </h1>
    </div>
  );
}

export default CompanySignup;
