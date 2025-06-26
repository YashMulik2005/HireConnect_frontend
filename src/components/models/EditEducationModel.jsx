import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { getRequest } from "../../utils/apiConfig";
import authHook from "../../context/AuthContext";
import EditEducationFieldsModel from "./EditEducationFieldsModel";

function EditEducationModel({ data }) {
  const [editEducationData, seteditEducationData] = useState();
  return (
    <dialog id="editEducationModal" className="modal">
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
              <div key={index} className=" p-4 rounded-md bg-off-white">
                <section className=" flex justify-between">
                  <h1 className=" text-lg font-semibold">{item?.degree}</h1>
                  <FaEdit
                    size={20}
                    color="#399efc"
                    className=" cursor-pointer"
                    onClick={() => {
                      seteditEducationData(item);
                      document.getElementById("editEducationModal").close();
                      document
                        .getElementById("editEducationfields")
                        .showModal();
                    }}
                  />
                </section>
                <h1 className="">{item?.institution}</h1>
                <h1 className=" text-gray-500">{item?.grade}</h1>
              </div>
            );
          })}
        </div>
      </div>

      <EditEducationFieldsModel data={editEducationData} />
    </dialog>
  );
}

export default EditEducationModel;
