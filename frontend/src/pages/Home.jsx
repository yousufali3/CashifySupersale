import React from "react";
import Carousel from "../components/Carousel";
import "./Home.css";
import SellingFast from "../components/SellingFast";
import Viewall from "../components/Viewall";
const Home = () => {
  return (
    <div className="">
      {" "}
      {/* Add this class to your CSS for debugging */}
      <Carousel />
      <SellingFast />
      <Viewall />
    </div>
  );
};

export default Home;
