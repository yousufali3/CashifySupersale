import React from "react";
import { ChevronRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    name: "Apple iPhone 12 - Refurbished",
    image: "/src/assets/bf8ed21e-96c9.webp",
    id: "66f26b4ee0e904af66cf2053",
    rating: 4.5,
    reviews: 199,
    discount: 28600,
    price: 25899,
    originalPrice: 54499,
    effectivePrice: 24604,
  },
  {
    name: "Apple iPhone 11 - Refurbished",
    image: "src/assets/d8394bf8-e922.webp",
    rating: 4.5,
    reviews: 199,
    discount: 28600,
    price: 25899,
    originalPrice: 54499,
    effectivePrice: 24604,
  },
  {
    name: "Apple iPhone 11 - Refurbished",
    image: "src/assets/d8394bf8-e922.webp",
    rating: 4.5,
    reviews: 199,
    discount: 28600,
    price: 25899,
    originalPrice: 54499,
    effectivePrice: 24604,
  },
  {
    name: "Apple iPhone 11 - Refurbished",
    image: "src/assets/d8394bf8-e922.webp",
    rating: 4.5,
    reviews: 199,
    discount: 28600,
    price: 25899,
    originalPrice: 54499,
    effectivePrice: 24604,
  },
  {
    name: "Apple iPhone 11 - Refurbished",
    image: "src/assets/d8394bf8-e922.webp",
    rating: 4.5,
    reviews: 199,
    discount: 28600,
    price: 25899,
    originalPrice: 54499,
    effectivePrice: 24604,
  },
  // Add more products here...
];

const SellingFast = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    console.log("Navigated to the page");
    navigate("/products");
  };

  return (
    <div className="container mx-auto px-2 md:px-4 py-6 md:py-8">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900">
          🔥 Selling Fast
        </h2>
        <button
          onClick={handleNavigate}
          className="text-teal-500 font-semibold flex items-center transition-colors hover:text-teal-600 text-sm md:text-base"
        >
          View All
          <ChevronRight size={18} className="ml-1 md:ml-2" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // Moved inside ProductCard

  const handleNavigate = () => {
    navigate(`/products/${product.id}`); // Navigate to product ID
  };

  return (
    <div
      onClick={handleNavigate} // Added onClick to the card
      className="border cursor-pointer rounded-lg p-3 md:p-4 flex flex-col transition-transform transform hover:scale-105 hover:shadow-lg hover:border-teal-500"
    >
      <div className="bg-yellow-500 text-orange-700 font-bold py-1 px-2 rounded-full text-xs md:text-sm mb-2 self-start">
        ₹{product.discount} OFF
      </div>
      <div className="flex justify-center items-center mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-48 h-48 sm:w-56 sm:h-56 md:w-36 md:h-36 lg:w-48 lg:h-48 object-contain rounded-md" // Adjusted sizes here
        />
      </div>
      <h3 className="font-bold text-sm md:text-base mb-2 text-gray-900 text-center">
        {product.name}
      </h3>
      <div className="flex justify-center items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16} // Adjusted for better visibility
            fill={i < Math.floor(product.rating) ? "gold" : "none"}
            stroke="gold"
          />
        ))}
        <span className="text-gray-500 text-xs md:text-sm ml-2">
          ({product.reviews})
        </span>
      </div>
      <div className="bg-blue-500 text-white font-bold py-1 px-2 rounded-full text-xs md:text-sm mb-2 self-start">
        Apple Bumper Sale
      </div>
      <div className="flex justify-center items-center mb-1">
        <div className="text-black font-bold text-sm md:text-lg mr-2">
          -{Math.round((1 - product.price / product.originalPrice) * 100)}% ₹
          {product.price}
        </div>
        <div className="text-gray-500 line-through text-xs md:text-sm">
          ₹{product.originalPrice}
        </div>
      </div>

      <div className="text-xs font-semibold md:text-sm text-gray-700 text-center">
        Effective Price:{" "}
        <span className="font-bold" style={{ color: "rgba(66, 200, 183, 1)" }}>
          ₹{product.effectivePrice}
        </span>
      </div>
    </div>
  );
};

export default SellingFast;
