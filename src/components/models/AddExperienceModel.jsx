import React from "react";
import { useForm } from "react-hook-form";
import { postRequest } from "../../utils/apiConfig";
import authHook from "../../context/AuthContext";
import toast from "react-hot-toast";
import dataHook from "../../context/DataContext";

function AddExperienceModel() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { token } = authHook();
  const { setstudentData } = dataHook();

  const onSubmit = async (data) => {
    try {
      const res = await postRequest(
        "student/addExperience",
        { experience: data },
        token
      );
      if (res?.status) {
        setstudentData((prev) => ({
          ...prev,
          experience: [...(prev.experience || []), data],
        }));
        toast.success(res?.message);
        reset();
        document.getElementById("addExperienceModel").close();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while adding Experience.");
    }
  };

  return (
    <dialog id="addExperienceModel" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            type="button"
            onClick={() =>
              document.getElementById("addExperienceModel").close()
            }
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-4">Add Experience</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold text-sm text-gray-500">
              Company
            </label>
            <input
              type="text"
              {...register("company", { required: "Company is required" })}
              className="w-full px-2 py-[6px] border-[1px] text-sm border-gray-300 rounded focus:outline-none"
            />
            {errors.company && (
              <p className="text-red-500 text-sm">{errors.company.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-sm text-gray-500">
              Position
            </label>
            <input
              type="text"
              {...register("position", { required: "Position is required" })}
              className="w-full px-2 py-[6px] border-[1px] text-sm border-gray-300 rounded focus:outline-none"
            />
            {errors.position && (
              <p className="text-red-500 text-sm">{errors.position.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-sm text-gray-500">
              Start Date
            </label>
            <input
              type="month"
              {...register("startDate")}
              className="w-full px-2 py-[6px] border-[1px] text-sm border-gray-300 rounded focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm text-gray-500">
              End Date
            </label>
            <input
              type="month"
              {...register("endDate")}
              className="w-full px-2 py-[6px] border-[1px] text-sm border-gray-300 rounded focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm text-gray-500">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full px-2 py-[6px] border-[1px] text-sm border-gray-300 rounded focus:outline-none"
              placeholder="What did you do in this role?"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-main_blue text-white px-4 py-[6px] rounded text-sm"
          >
            Save
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default AddExperienceModel;
