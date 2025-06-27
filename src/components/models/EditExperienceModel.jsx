import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import EditExperienceFieldsModel from "./EditExperienceFieldsModel";

function EditExperienceModel({ data }) {
  const [editExperienceData, seteditExperienceData] = useState();
  return (
    <dialog id="editExperienceModal" className="modal">
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
              <div key={index} className=" p-4 rounded bg-off-white">
                <section className=" flex justify-between">
                  <h1 className=" text-lg font-semibold">{item?.position}</h1>
                  <FaEdit
                    size={20}
                    color="#399efc"
                    className=" cursor-pointer"
                    onClick={() => {
                      seteditExperienceData(item);
                      document.getElementById("editExperienceModal").close();
                      document
                        .getElementById("editExperienceFields")
                        .showModal();
                    }}
                  />
                </section>
                <h1 className="">{item?.company}</h1>
                <h1 className=" text-gray-500">{item?.description}</h1>
              </div>
            );
          })}
        </div>
      </div>

      {/* <EditEducationFieldsModel data={editEducationData} /> */}
      <EditExperienceFieldsModel data={editExperienceData} />
    </dialog>
  );
}

export default EditExperienceModel;
