import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main style file
import "react-date-range/dist/theme/default.css"; // Theme CSS file
import StudentNavbar from "../../components/StudentNavbar";
import authHook from "../../context/AuthContext";
import { getRequest } from "../../utils/apiConfig";

function YourApplications() {
  const [showPicker, setShowPicker] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const { token } = authHook();
  const [applicationData, setapplicationData] = useState();

  const getData = async () => {
    const res = await getRequest("application", token);
    console.log(res?.data);
    setapplicationData(res?.data);
  };

  useEffect(() => {
    getData();
  }, [token]);

  return (
    <div className="w-full h-full bg-off-white overflow-y-auto">
      <div className="w-full h-[8%] sticky top-0">
        <StudentNavbar />
      </div>

      <div className="w-full flex flex-col items-center p-5 gap-6">
        <div className="flex justify-between items-center w-full p-3 bg-white">
          <section>
            <p className="font-bold text-lg">Keep it up</p>
            <p className="text-sm text-gray-400">Here is your applications</p>
          </section>
          <section className="relative">
            <input
              readOnly
              value={`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
              onClick={() => setShowPicker(!showPicker)}
              className="border-[1px] border-gray-300 text-gray-500 px-2 focus:outline-none py-1 cursor-pointer rounded"
            />
            {showPicker && (
              <div className="absolute top-12 right-0 z-10 bg-white shadow-lg rounded">
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDateRange([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                />
              </div>
            )}
          </section>
        </div>
        <div className=" w-full h-7 flex items-center gap-5 text-gray-500 text-sm font-semibold border-b border-gray-300">
          <p className=" hover:text-main_blue hover:border-main_blue hover:border-b-2 h-full cursor-pointer">
            All
          </p>
          <p className=" hover:text-main_blue hover:border-main_blue hover:border-b-2 h-full cursor-pointer">
            Under Review
          </p>
          <p className=" hover:text-main_blue hover:border-main_blue hover:border-b-2 h-full cursor-pointer">
            Shortlisted{" "}
          </p>
          <p className=" hover:text-main_blue hover:border-main_blue hover:border-b-2 h-full cursor-pointer">
            Interview Scheduled
          </p>
          <p className=" hover:text-main_blue hover:border-main_blue hover:border-b-2 h-full cursor-pointer">
            Selected{" "}
          </p>
          <p className=" hover:text-main_blue hover:border-main_blue hover:border-b-2 h-full cursor-pointer">
            Rejected
          </p>
        </div>
        <div className=" w-full bg-white p-3">
          <section className=" w-full flex justify-between items-center">
            <p className="font-semibold text-xl">Application History</p>
            <input
              type="text"
              className=" rounded border-[1px] border-gray-400 px-3 py-[6px] focus:outline-none text-sm font-semibold"
              placeholder="Search"
            />
          </section>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Company Name</th>
                  <th>Role</th>
                  <th>Data Applied</th>
                  <th>Status</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {applicationData?.map((item, index) => {
                  return (
                    <tr>
                      <th>1</th>
                      <td>{item?.job_id?.company?.name}</td>
                      <td>{item?.job_id?.title}</td>
                      <td>{item?.createdAt || "2-5-20205"}</td>
                      <td>{item?.status}</td>
                      <td>{item?.job_id?.job_mode}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourApplications;
