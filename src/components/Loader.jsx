import React from "react";

function Loader() {
  return (
    <div className="bg-white rounded p-5 w-full flex flex-col gap-2 animate-pulse">
      <div className="flex flex-row w-full gap-3">
        <section className="w-[5%] flex justify-center items-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
        </section>

        <section className="w-[85%] flex flex-col gap-2">
          <div className="w-2/3 h-4 bg-gray-300 rounded" />
          <div className="flex items-center gap-2">
            <div className="w-20 h-3 bg-gray-300 rounded" />
            <div className="w-24 h-3 bg-gray-300 rounded" />
          </div>
        </section>

        <section className="w-[10%]">
          <div className="w-14 h-4 bg-gray-300 rounded" />
        </section>
      </div>

      <div className="space-y-1">
        <div className="w-full h-3 bg-gray-300 rounded" />
        <div className="w-11/12 h-3 bg-gray-300 rounded" />
        <div className="w-2/3 h-3 bg-gray-300 rounded" />
      </div>

      <div className="flex items-center justify-between mt-2">
        <section className="flex gap-2">
          {Array(3)
            .fill(0)
            .map((_, idx) => (
              <div key={idx} className="w-16 h-5 bg-gray-300 rounded-xl" />
            ))}
        </section>
        <div className="w-24 h-3 bg-gray-300 rounded" />
      </div>
    </div>
  );
}

export default Loader;
