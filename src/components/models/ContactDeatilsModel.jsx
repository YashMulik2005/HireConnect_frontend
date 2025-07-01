import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import authHook from "../../context/AuthContext";
import dataHook from "../../context/DataContext";
import { postRequest } from "../../utils/apiConfig";

function ContactDetailsModel({ data }) {
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
      setValue("mail", data.mail);
      setValue("mobile_no", data.mobile_no);
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    try {
      const res = await postRequest(
        `student/addContactDeatils`,
        { mail: formData?.mail, mobile_no: formData?.mobile_no },
        token
      );

      if (res?.status) {
        setstudentData((prev) => ({
          ...prev,
          mail: formData.mail,
          mobile_no: formData.mobile_no,
        }));

        toast.success("Contact details updated!");
        reset();
        document.getElementById("contactDetailsModel").close();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating contact details.");
    }
  };

  return (
    <dialog id="contactDetailsModel" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            type="button"
            onClick={() =>
              document.getElementById("contactDetailsModel").close()
            }
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-4">Edit Contact Details</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block font-semibold text-sm text-gray-500">
              Email
            </label>
            <input
              type="email"
              {...register("mail", { required: "Email is required" })}
              className="w-full px-2 py-[6px] border text-sm border-gray-300 rounded focus:outline-none"
              placeholder="example@mail.com"
            />
            {errors.mail && (
              <p className="text-red-500 text-sm">{errors.mail.message}</p>
            )}
          </div>

          {/* Mobile Field */}
          <div>
            <label className="block font-semibold text-sm text-gray-500">
              Mobile Number
            </label>
            <input
              type="tel"
              {...register("mobile_no", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid 10-digit Indian mobile number",
                },
              })}
              className="w-full px-2 py-[6px] border text-sm border-gray-300 rounded focus:outline-none"
              placeholder="9876543210"
            />
            {errors.mobile_no && (
              <p className="text-red-500 text-sm">{errors.mobile_no.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className=" bg-main_blue text-white px-4 py-[6px] rounded text-sm"
          >
            Update
          </button>
        </form>
      </div>
    </dialog>
  );
}

export default ContactDetailsModel;
