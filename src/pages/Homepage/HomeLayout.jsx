import React from "react";
import Homepage from "./Homepage";
import homeBack from "../../assets/home_back_02.jpg";

function HomeLayout() {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center overflow-x-hidden shadow-lg"
      style={{ backgroundImage: `url(${homeBack})` }}
    >
      <Homepage />
    </div>
  );
}

export default HomeLayout;
