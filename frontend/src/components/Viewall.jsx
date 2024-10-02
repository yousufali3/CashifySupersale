import React from "react";
import { ChevronRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Viewall = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    console.log("Navigated to the page");
    navigate("/products");
  };

  return (
    <div className="container mx-auto px-2 md:px-4 py-6 md:py-8">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <button onClick={handleNavigate}>
          <h2 className="text-xl md:text-3xl font-bold cursor-pointer  hover:text-teal-600 hover:underline text-gray-900">
            🔥 View All Iphones
          </h2>
        </button>
        <button
          onClick={handleNavigate}
          className="text-teal-500 font-semibold flex items-center transition-colors hover:text-teal-600 text-sm md:text-base"
        >
          View All
          <ChevronRight size={18} className="ml-1 md:ml-2 mr-2" />
        </button>
      </div>
    </div>
  );
};

export default Viewall;
