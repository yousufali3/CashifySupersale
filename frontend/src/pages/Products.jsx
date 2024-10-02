import React from "react";
import { CreditCard, Eye } from "lucide-react";

const ProductCard = ({ product }) => (
  <div className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-1 truncate">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-1 truncate">{product.brand}</p>
      <div className="text-xl font-bold text-teal-600 mb-4">
        ₹{product.price.toLocaleString()}
      </div>
      {/* Stack buttons vertically in a single column */}
      <div className="flex flex-col gap-2">
        <button className="flex items-center justify-center bg-teal-500 text-white py-2 px-3 rounded-md hover:bg-teal-600 transition duration-300">
          <CreditCard className="h-4 w-4 mr-2" />
          Buy Now
        </button>
        <button className="flex items-center justify-center bg-gray-200 text-gray-800 py-2 px-3 rounded-md hover:bg-gray-300 transition duration-300">
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </button>
      </div>
    </div>
  </div>
);

const Products = () => {
  const products = [
    {
      id: 1,
      name: "iPhone 12 Pro",
      brand: "Apple",
      price: 99900,
      image: "https://via.placeholder.com/300x200.png?text=iPhone+12+Pro",
    },
    {
      id: 2,
      name: "Samsung Galaxy S21",
      brand: "Samsung",
      price: 69999,
      image: "https://via.placeholder.com/300x200.png?text=Galaxy+S21",
    },
    {
      id: 3,
      name: "OnePlus 9 Pro",
      brand: "OnePlus",
      price: 64999,
      image: "https://via.placeholder.com/300x200.png?text=OnePlus+9+Pro",
    },
    {
      id: 4,
      name: "Google Pixel 5",
      brand: "Google",
      price: 59999,
      image: "https://via.placeholder.com/300x200.png?text=Pixel+5",
    },
    {
      id: 5,
      name: "Xiaomi Mi 11",
      brand: "Xiaomi",
      price: 49999,
      image: "https://via.placeholder.com/300x200.png?text=Mi+11",
    },
    {
      id: 6,
      name: "Realme 8 Pro",
      brand: "Realme",
      price: 17999,
      image: "https://via.placeholder.com/300x200.png?text=Realme+8+Pro",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        All Refurbished iPhones
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
