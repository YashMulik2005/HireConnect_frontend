import React from "react";
import { FaEdit } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { getRequest, postRequest } from "../../utils/apiConfig";
import authHook from "../../context/AuthContext";
import toast from "react-hot-toast";
import dataHook from "../../context/DataContext";

function AddEducationModel() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { token } = authHook();
  const { setstudentData } = dataHook();

  const onSubmit = async (data) => {
    // console.log("Education Data:", data);
    try {
      const res = await postRequest(
        "student/addEducation",
        { education: data },
        token
      );
      if (res?.status) {
        setstudentData((prev) => ({
          ...prev,
          education: [...(prev.education || []), data],
        }));
        toast.success(res?.message);
        reset();
        document.getElementById("addEducationModel").close();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while adding education.");
    }
  };

  return (
    <dialog id="addEducationModel" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            type="button"
            onClick={() => document.getElementById("addEducationModel").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-4">Add Education</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold text-sm text-gray-500">
              Institution
            </label>
            <input
              type="text"
              {...register("institution", {
                required: "Institution is required",
              })}
              className="w-full px-2 py-[6px] border-[1px] text-sm focus:outline-none border-gray-300 rounded"
            />
            {errors.institution && (
              <p className="text-red-500 text-sm">
                {errors.institution.message}
              </p>
            )}
          </div>
          <div>
            <label className="block font-semibold text-sm text-gray-500">
              Degree
            </label>
            <input
              type="text"
              {...register("degree", { required: "Degree is required" })}
              className="w-full px-2 py-[6px] border-[1px] text-sm focus:outline-none border-gray-300 rounded"
            />
            {errors.degree && (
              <p className="text-red-500 text-sm">{errors.degree.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-sm text-gray-500">
              Field of Study
            </label>
            <input
              type="text"
              {...register("field")}
              className="w-full px-2 py-[6px] border-[1px] text-sm focus:outline-none border-gray-300 rounded"
            />
          </div>

          <div className=" flex items-center gap-3 w-full">
            <div className="w-1/2">
              <label className="block font-semibold text-sm text-gray-500">
                Start Year
              </label>
              <select
                {...register("startYear", {
                  required: "Start year is required",
                })}
                className="w-full px-2 py-[6px] border text-sm focus:outline-none border-gray-300 rounded"
              >
                <option value="">Select Year</option>
                {Array.from({ length: 100 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              {errors.startYear && (
                <p className="text-red-500 text-sm">
                  {errors.startYear.message}
                </p>
              )}
            </div>

            <div className="w-1/2">
              <label className="block font-semibold text-sm text-gray-500">
                End Year
              </label>
              <select
                {...register("endYear", {
                  required: "End year is required",
                })}
                className="w-full px-2 py-[6px] border text-sm focus:outline-none border-gray-300 rounded"
              >
                <option value="" className=" text-gray-500">
                  Select Year
                </option>
                {Array.from({ length: 100 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
              {errors.endYear && (
                <p className="text-red-500 text-sm">{errors.endYear.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-sm text-gray-500">
              Grade
            </label>
            <input
              type="text"
              {...register("grade")}
              className="w-full px-2 py-[6px] border-[1px] text-sm focus:outline-none border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className=" bg-main_blue text-white px-4 py-[6px] rounded text-sm"
          >
            Save
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default AddEducationModel;
