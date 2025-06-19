import React from "react";
import HomeLayout from "./HomeLayout";
import StudentSection from "./StudentSection";
import CompanySection from "./CompanySection";

function Layout() {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <HomeLayout />
      <StudentSection />
      <CompanySection />
    </div>
  );
}

export default Layout;
