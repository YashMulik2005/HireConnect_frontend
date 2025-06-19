import React from "react";
import { useForm } from "react-hook-form";
import { Typewriter } from "react-simple-typewriter";
import { FaSpaceAwesome } from "react-icons/fa6";

function CompanyLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    // Handle login logic here
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 py-10">
      <section className="flex flex-col justify-between items-center">
        <div className="flex justify-center items-center gap-3">
          <FaSpaceAwesome size={30} color="#399efc" />
          <h1 className="text-[35px] font-semibold text-gray-700 font-serif">
            Hire<span className="text-main_blue">Connect</span>
          </h1>
        </div>
        <h1 className="text-gray-500">
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
      </section>

      <form
        className="w-[60%] flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h1 className="text-gray-500 mb-1 font-semibold">Email:</h1>
          <input
            type="email"
            className="px-4 py-2 border border-gray-400 rounded w-full focus:outline-gray-400"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <h1 className="text-gray-500 mb-1 font-semibold">Password:</h1>
          <input
            type="password"
            className="px-4 py-2 border border-gray-400 rounded w-full focus:outline-gray-400"
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
          Login
        </button>
      </form>

      <section className="flex w-[70%] justify-center items-center gap-3">
        <div className="border-b-2 border-gray-500 w-20"></div>
        <p className="text-gray-600">or</p>
        <div className="border-b-2 border-gray-500 w-20"></div>
      </section>

      <h1>
        Are you new?{" "}
        <span className="underline text-blue-500 cursor-pointer">
          Create a new account
        </span>
      </h1>
    </div>
  );
}

export default CompanyLogin;
