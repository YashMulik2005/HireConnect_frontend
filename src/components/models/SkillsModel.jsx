import React, { useState, useEffect } from "react";
import Creatable from "react-select/creatable";
import { postRequest } from "../../utils/apiConfig";
import authHook from "../../context/AuthContext";
import toast from "react-hot-toast";
import dataHook from "../../context/DataContext";

const predefinedSkills = [
  { value: "JavaScript", label: "JavaScript" },
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "Python", label: "Python" },
];

function SkillsModel({ data }) {
  const { studentData, setstudentData } = dataHook();
  const { token } = authHook();
  const [skills, setSkills] = useState([]);
  const [options, setOptions] = useState(predefinedSkills);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setSkills(data);

      const newOptions = data
        .filter(
          (s) =>
            !options.some((opt) => opt.value.toLowerCase() === s.toLowerCase())
        )
        .map((s) => ({ value: s, label: s }));

      setOptions((prev) => [...prev, ...newOptions]);
    }
  }, [data]);

  const handleChange = (selectedOption) => {
    if (!selectedOption) return;
    const skill = selectedOption.value;
    if (!skills.includes(skill)) {
      setSkills((prev) => [...prev, skill]);
    }
  };

  const handleCreateSkill = (newValue) => {
    const newSkill = newValue.trim();
    if (!newSkill) return;

    const alreadyExists = options.some(
      (opt) => opt.value.toLowerCase() === newSkill.toLowerCase()
    );

    if (!alreadyExists) {
      const newOption = { value: newSkill, label: newSkill };
      setOptions((prev) => [...prev, newOption]);
    }

    if (!skills.includes(newSkill)) {
      setSkills((prev) => [...prev, newSkill]);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills((prev) => prev.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = async () => {
    console.log("Final Skills:", skills);
    try {
      const res = await postRequest(
        "student/addskills",
        { skills: skills },
        token
      );

      if (res?.status) {
        setstudentData((prev) => ({
          ...prev,
          skills: skills,
        }));
        toast.success(res?.message);
        document.getElementById("SkillsModel").close();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while saving skills.");
    }
  };

  return (
    <dialog id="SkillsModel" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            onClick={() => document.getElementById("SkillsModel").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="button"
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-4">Skills</h3>

        <Creatable
          options={options}
          onChange={handleChange}
          onCreateOption={handleCreateSkill}
          placeholder="Select or type to create..."
          isClearable
          isSearchable
          formatCreateLabel={(inputValue) =>
            `+ Create "${inputValue}" as new skill`
          }
          noOptionsMessage={() => "Type to add a new skill or select existing"}
        />

        <div className="mt-6">
          <h4 className="font-medium text-sm mb-2">Your Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  className="text-red-500 font-bold"
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            className="bg-main_blue text-white px-4 py-2 rounded text-sm"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default SkillsModel;
