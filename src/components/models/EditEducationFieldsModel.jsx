import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

function EditEducationFieldsModel({ data }) {
  console.log("data to edit", data);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (data) {
      setValue("institution", data.institution || "");
      setValue("degree", data.degree || "");
      setValue("field", data.field || "");
      setValue("startYear", data.startYear || "");
      setValue("endYear", data.endYear || "");
      setValue("grade", data.grade || "");
    }
  }, [data, setValue]);

  const onSubmit = (formData) => {
    console.log("Education Data:", formData);
    reset();
    document.getElementById("editEducationfields").close();
  };

  return (
    <dialog id="editEducationfields" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            type="button"
            onClick={() =>
              document.getElementById("editEducationfields").close()
            }
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-4">Edit Education</h3>

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
              className="w-full px-2 py-[6px] border text-sm rounded border-gray-300 focus:outline-none"
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
              className="w-full px-2 py-[6px] border text-sm rounded border-gray-300 focus:outline-none"
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
              className="w-full px-2 py-[6px] border text-sm rounded border-gray-300 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 w-full">
            <div className="w-1/2">
              <label className="block font-semibold text-sm text-gray-500">
                Start Year
              </label>
              <select
                {...register("startYear", {
                  required: "Start year is required",
                })}
                className="w-full px-2 py-[6px] border text-sm rounded border-gray-300 focus:outline-none"
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
                className="w-full px-2 py-[6px] border text-sm rounded border-gray-300 focus:outline-none"
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
              className="w-full px-2 py-[6px] border text-sm rounded border-gray-300 focus:outline-none"
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

export default EditEducationFieldsModel;
