import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import authHook from "../../context/AuthContext";
import toast from "react-hot-toast";
import dataHook from "../../context/DataContext";
import { putRequest } from "../../utils/apiConfig";

function EditExperienceFieldsModel({ data }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (data) {
      setValue("company", data.company);
      setValue("position", data.position);
      setValue("startDate", data.startDate);
      setValue("endDate", data.endDate);
      setValue("description", data.description);
    }
  }, [data, setValue]);

  const { token } = authHook();
  const { setstudentData } = dataHook();

  const onSubmit = async (formData) => {
    try {
      const res = await putRequest(
        `student/updateExperience/${data._id}`,
        { experience: formData },
        token
      );

      if (res?.status) {
        setstudentData((prev) => ({
          ...prev,
          experience: prev.experience.map((exp) =>
            exp._id === data._id ? { ...exp, ...formData } : exp
          ),
        }));

        toast.success(res?.message);
        reset();
        document.getElementById("editExperienceFields").close();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while updating Experience.");
    }
  };

  return (
    <dialog id="editExperienceFields" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            type="button"
            onClick={() =>
              document.getElementById("editExperienceFields").close()
            }
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-4">Edit Experience</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold text-sm text-gray-500">
              Company
            </label>
            <input
              type="text"
              {...register("company", { required: "Company is required" })}
              className="w-full px-2 py-[6px] border text-sm border-gray-300 rounded focus:outline-none"
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
              className="w-full px-2 py-[6px] border text-sm border-gray-300 rounded focus:outline-none"
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
              Description
            </label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full px-2 py-[6px] border text-sm border-gray-300 rounded focus:outline-none"
              placeholder="What did you do in this role?"
            ></textarea>
          </div>

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

export default EditExperienceFieldsModel;
