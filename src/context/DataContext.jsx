import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [studentData, setstudentData] = useState([]);

  const value = {
    studentData,
    setstudentData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

const dataHook = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("authHook must be used within AuthProvider");
  }
  return context;
};

export default dataHook;
