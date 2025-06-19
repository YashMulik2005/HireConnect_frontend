import React from "react";

function HomeCard({ title, des, icon, w }) {
  return (
    <div
      className={`bg-white rounded-lg px-3 py-3 flex items-center gap-3 shadow-[0_8px_20px_rgba(0,0,0,0.25)] ${
        w ? "w-95" : "w-72"
      }`}
    >
      <div className="w-[13%]">
        <div className="relative -left-8 w-10 h-10 rounded-full p-2 flex justify-center items-center bg-[#399efc]">
          {icon}
        </div>
      </div>
      <div className="w-[87%] relative -left-8">
        <h1 className="text-lg font-bold">{title}</h1>
        <p className="break-words">{des}</p>
      </div>
    </div>
  );
}

export default HomeCard;
