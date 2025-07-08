import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import toast from "react-hot-toast";
import { postRequest } from "../../utils/apiConfig";
import authHook from "../../context/AuthContext";
import { useNavigate } from "react-router";

const jobTypeOptions = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "offline", label: "Offline" },
];

const jobModeOptions = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "internship", label: "Internship" },
  { value: "freelance", label: "Freelance" },
  { value: "contract", label: "Contract" },
];

function CreateJob() {
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedFile, setselectedFile] = useState();
  const [Loader, setLoader] = useState(false);
  const { token } = authHook();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: { taskSubmitted: true },
  });

  const onSubmit = async (data) => {
    setLoader(true); // Optional: add loader control

    // Process comma-separated fields
    data.required_skills = data.required_skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    data.perks = data.perks
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    data.responsibilities = data.responsibilities
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    // Construct address
    data.address = {
      building_name: data.building_name,
      area: data.area || "",
      flat_no: data.flat_no,
      city: data.city,
      pincode: data.pincode,
    };

    // Submission Form fields → array of strings
    if (data.submissionFields) {
      data.submissionForm = data.submissionFields
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((field) => ({ [field]: "string" }));
    } else {
      data.submissionForm = [];
    }
    delete data.submissionFields;

    const file = selectedFile;
    if (
      file &&
      file.type !== "application/pdf" &&
      file.type !== "application/msword" &&
      file.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      toast.error("Task must be a PDF or Word file.");
      setLoader(false);
      return;
    }

    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "HireConnectResumePDF");

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/raw/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadData = await res.json();
        data.task = uploadData?.secure_url || "";
      } else {
        data.task = "";
      }

      data.job_type = data.job_type.value;
      data.job_mode = data.job_mode.value;

      const result = await postRequest("job/createJob", data, token);
      if (result?.status) {
        toast.success(result?.message || "Job created successfully!");
        reset();
        setSelectedFileName("");
        navigate("/company/jobs");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create job");
    } finally {
      setLoader(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setselectedFile(file);
    setSelectedFileName(file ? file.name : "");
  };

  return (
    <div className="p-4 flex flex-col overflow-y-auto gap-4 h-full">
      <h1 className=" text-xl font-bold text-gray-700">Applicant Details</h1>
      <div className="w-full p-4">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Job Details */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Job Title
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              className="w-full px-4 bg-white py-2 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              placeholder="Describe the job role, expectations, etc."
              className="w-full px-4 bg-white py-2 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Required Skills
              </label>
              <input
                type="text"
                placeholder="e.g. React, Node.js, CSS"
                className="w-full px-4 bg-white py-2 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                {...register("required_skills", {
                  required: "Required skills are required",
                })}
              />
              {errors.required_skills && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.required_skills.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Required Experience
              </label>
              <input
                type="text"
                placeholder="e.g. 2+ years"
                className="w-full px-4 bg-white py-2 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                {...register("required_experience", {
                  required: "Required experience is required",
                })}
              />
              {errors.required_experience && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.required_experience.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Job Type
              </label>
              <Controller
                name="job_type"
                control={control}
                rules={{ required: "Job type is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={jobTypeOptions}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                )}
              />
              {errors.job_type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.job_type.message}
                </p>
              )}
            </div>

            {/* Job Mode using react-select */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Job Mode
              </label>
              <Controller
                name="job_mode"
                control={control}
                rules={{ required: "Job mode is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={jobModeOptions}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                )}
              />
              {errors.job_mode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.job_mode.message}
                </p>
              )}
            </div>
          </div>

          {/* Address Section */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Address
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <input
                type="text"
                placeholder="Building name"
                className="w-full px-4 py-2 bg-white border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                {...register("building_name", {
                  required: "Building name is required",
                })}
              />
              <input
                type="text"
                placeholder="Streat name"
                className="w-full px-4 bg-white py-2 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                {...register("area")}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Flat No"
                className="w-full px-4 bg-white py-2 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                {...register("flat_no", {
                  required: "Flat no is required",
                })}
              />
              <input
                type="text"
                placeholder="City"
                className="w-full px-4 bg-white py-2 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                {...register("city", { required: "City is required" })}
              />
              <input
                type="text"
                placeholder="Zip"
                className="w-full px-4 bg-white py-2 border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                {...register("pincode", { required: "Pincode is required" })}
              />
            </div>
            {(errors.area ||
              errors.flat_no ||
              errors.city ||
              errors.pincode) && (
              <p className="text-red-500 text-sm mt-1">
                Please fill all required address fields.
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Registration Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 bg-white border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                {...register("reg_date", {
                  required: "Registration date is required",
                })}
              />
              {errors.reg_date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.reg_date.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Category
              </label>
              <input
                type="text"
                placeholder="e.g. Software"
                className="w-full px-4 py-2 bg-white border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                {...register("category", { required: "Category is required" })}
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Salary
              </label>
              <input
                type="number"
                placeholder="e.g. 50000"
                className="w-full px-4 py-2 bg-white border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                {...register("salary", {
                  required: "Salary is required",
                  min: { value: 0, message: "Salary must be positive" },
                })}
              />
              {errors.salary && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.salary.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Perks
              </label>
              <input
                type="text"
                placeholder="e.g. Health, Snacks"
                className="w-full px-4 py-2 bg-white border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                {...register("perks", { required: "Perks are required" })}
              />
              {errors.perks && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.perks.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Openings
              </label>
              <input
                type="number"
                placeholder="e.g. 3"
                className="w-full px-4 py-2 bg-white border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                {...register("numberOfOpenings", {
                  required: "Number of openings is required",
                  min: { value: 1, message: "Must be at least 1" },
                })}
              />
              {errors.numberOfOpenings && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.numberOfOpenings.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Responsibilities
              </label>
              <input
                type="text"
                placeholder="e.g. Coding, Testing"
                className="w-full px-4 py-2 bg-white border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                {...register("responsibilities", {
                  required: "Responsibilities are required",
                })}
              />
              {errors.responsibilities && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.responsibilities.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-600 font-medium">
              Upload a PDF or Word file
            </label>
            <div className="relative w-fit">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                id="taskFile"
                {...register("task")}
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="taskFile"
                className="cursor-pointer border bg-white border-gray-100 rounded px-6 py-2 text-main_blue
                 font-medium hover:border-blue-200 transition"
              >
                Browse files
              </label>
            </div>

            {selectedFileName && (
              <p className="text-sm text-gray-500">
                Selected file: {selectedFileName}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Submission Form Fields (comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g. name, email, phone"
              className="w-full px-4 py-2 bg-white border border-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              {...register("submissionFields")}
            />
          </div>
          <input type="hidden" {...register("taskSubmitted")} value={true} />
          <button
            type="submit"
            className=" bg-main_blue inline w-28 hover:bg-blue-500 cursor-pointer text-white font-semibold py-2 rounded-md mt-2 transition"
          >
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateJob;
