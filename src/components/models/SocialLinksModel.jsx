import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import authHook from "../../context/AuthContext";
import dataHook from "../../context/DataContext";
import { postRequest } from "../../utils/apiConfig";

function SocialLinksModel({ data }) {
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
      setValue("github_url", data.github_url);
      setValue("linkedin_url", data.linkedin_url);
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    try {
      const res = await postRequest(
        `student/addSocialLinks`,
        {
          github_url: formData?.github_url,
          linkedin_url: formData?.linkedin_url,
        },
        token
      );

      if (res?.status) {
        setstudentData((prev) => ({
          ...prev,
          github_url: formData.github_url,
          linkedin_url: formData.linkedin_url,
        }));

        toast.success("Social links updated!");
        reset();
        document.getElementById("socialLinksModel").close();
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating social links.");
    }
  };

  return (
    <dialog id="socialLinksModel" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            type="button"
            onClick={() => document.getElementById("socialLinksModel").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-4">Edit Social Links</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* GitHub Link */}
          <div>
            <label className="block font-semibold text-sm text-gray-500">
              GitHub Link
            </label>
            <input
              type="url"
              {...register("github_url", {
                required: "GitHub link is required",
                pattern: {
                  value: /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+$/,
                  message: "Enter a valid GitHub profile URL",
                },
              })}
              className="w-full px-2 py-[6px] border text-sm border-gray-300 rounded"
              placeholder="https://github.com/username"
            />
            {errors.github_url && (
              <p className="text-red-500 text-sm">
                {errors.github_url.message}
              </p>
            )}
          </div>

          {/* LinkedIn Link */}
          <div>
            <label className="block font-semibold text-sm text-gray-500">
              LinkedIn Link
            </label>
            <input
              type="url"
              {...register("linkedin_url", {
                required: "LinkedIn link is required",
                pattern: {
                  value: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/,
                  message: "Enter a valid LinkedIn profile URL",
                },
              })}
              className="w-full px-2 py-[6px] border text-sm border-gray-300 rounded"
              placeholder="https://linkedin.com/in/username"
            />
            {errors.linkedin_url && (
              <p className="text-red-500 text-sm">
                {errors.linkedin_url.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className=" bg-main_blue text-white px-4 py-[6px] rounded text-sm"
          >
            Update Links
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default SocialLinksModel;
