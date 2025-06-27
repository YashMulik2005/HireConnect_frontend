import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import authHook from "../../context/AuthContext";
import toast from "react-hot-toast";
import dataHook from "../../context/DataContext";
import { putRequest } from "../../utils/apiConfig";

function EditProjectFieldsModel({ data }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const { token } = authHook();
  const { setstudentData } = dataHook();

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("description", data.description);
      setValue("startDate", data.startDate);
      setValue("endDate", data.endDate);
      setValue("githubLink", data.githubLink);
      setValue("liveLink", data.liveLink);
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    try {
      const res = await putRequest(
        `student/updateProject/${data._id}`,
        { project: formData },
        token
      );

      if (res?.status) {
        setstudentData((prev) => ({
          ...prev,
          projects: prev.projects.map((proj) =>
            proj._id === data._id ? { ...proj, ...formData } : proj
          ),
        }));

        toast.success(res?.message);
        reset();
        document.getElementById("editProjectFieldsModel").close();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while updating project.");
    }
  };

  return (
    <dialog id="editProjectFieldsModel" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            type="button"
            onClick={() =>
              document.getElementById("editProjectFieldsModel").close()
            }
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-4">Edit Project</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
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

          {/* Description */}
          <div>
            <label className="block font-semibold text-sm text-gray-500">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full px-2 py-[6px] border text-sm border-gray-300 rounded focus:outline-none"
            ></textarea>
          </div>

          {/* Start Date */}
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

          {/* End Date */}
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

          {/* GitHub Link */}
          <div>
            <label className="block font-semibold text-sm text-gray-500">
              GitHub Link
            </label>
            <input
              type="url"
              {...register("githubLink")}
              className="w-full px-2 py-[6px] border text-sm border-gray-300 rounded focus:outline-none"
              placeholder="https://github.com/..."
            />
          </div>

          {/* Live Link */}
          <div>
            <label className="block font-semibold text-sm text-gray-500">
              Live Link
            </label>
            <input
              type="url"
              {...register("liveLink")}
              className="w-full px-2 py-[6px] border text-sm border-gray-300 rounded focus:outline-none"
              placeholder="https://project-live.com"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-[6px] rounded text-sm"
          >
            Update
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default EditProjectFieldsModel;
