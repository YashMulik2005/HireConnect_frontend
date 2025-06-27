import React from "react";
import { useForm } from "react-hook-form";
import { postRequest } from "../../utils/apiConfig";
import authHook from "../../context/AuthContext";
import toast from "react-hot-toast";
import dataHook from "../../context/DataContext";

function AddProject() {
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
        "student/addProject",
        { project: data },
        token
      );
      if (res?.status) {
        setstudentData((prev) => ({
          ...prev,
          projects: [...(prev.projects || []), data],
        }));
        toast.success(res?.message);
        reset();
        document.getElementById("addProjectModel").close();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while adding Project.");
    }
  };

  return (
    <dialog id="addProjectModel" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            type="button"
            onClick={() => document.getElementById("addProjectModel").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-4">Add Project</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <label className="block font-semibold text-sm text-gray-500">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full px-2 py-[6px] border text-sm border-gray-300 rounded focus:outline-none"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-sm text-gray-500">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full px-2 py-[6px] border text-sm border-gray-300 rounded focus:outline-none"
              placeholder="Brief about the project"
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold text-sm text-gray-500">
              Start Date
            </label>
            <input
              type="month"
              {...register("startDate")}
              className="w-full px-2 py-[6px] border text-sm border-gray-300 rounded focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm text-gray-500">
              End Date
            </label>
            <input
              type="month"
              {...register("endDate")}
              className="w-full px-2 py-[6px] border text-sm border-gray-300 rounded focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm text-gray-500">
              GitHub Link
            </label>
            <input
              type="url"
              {...register("githubLink")}
              placeholder="https://github.com/..."
              className="w-full px-2 py-[6px] border text-sm border-gray-300 rounded focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm text-gray-500">
              Live Link
            </label>
            <input
              type="url"
              {...register("liveLink")}
              placeholder="https://project-live-link.com"
              className="w-full px-2 py-[6px] border text-sm border-gray-300 rounded focus:outline-none"
            />
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

export default AddProject;
