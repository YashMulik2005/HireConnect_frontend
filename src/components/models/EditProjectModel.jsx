import React from "react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import EditProjectFieldsModel from "./EditProjectFieldsModel";

function EditProjectModel({ data }) {
  const [editProjectData, seteditProjectData] = useState();
  return (
    <dialog id="editProjectModal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-3">Education</h3>
        <div className=" flex flex-col gap-3 text-sm text-gray-700">
          {data?.map((item, index) => {
            return (
              <div
                key={index}
                className=" flex flex-col gap-1 p-4 rounded bg-off-white"
              >
                <section className=" flex justify-between">
                  <h1 className=" text-lg font-semibold">{item?.title}</h1>
                  <FaEdit
                    size={20}
                    color="#399efc"
                    className=" cursor-pointer"
                    onClick={() => {
                      seteditProjectData(item);
                      document.getElementById("editProjectModal").close();
                      document
                        .getElementById("editProjectFieldsModel")
                        .showModal();
                    }}
                  />
                </section>
                <h1 className=" text-gray-500">{item?.description}</h1>
                <h1 className="">
                  <span className=" font-semibold">Live link:</span>{" "}
                  {item?.liveLink}
                </h1>
                <h1 className=" ">
                  <span className=" font-semibold">GitHub link: </span>
                  {item?.githubLink}
                </h1>
              </div>
            );
          })}
        </div>
      </div>

      <EditProjectFieldsModel data={editProjectData} />
    </dialog>
  );
}

export default EditProjectModel;
