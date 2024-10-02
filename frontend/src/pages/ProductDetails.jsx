import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../cartSlice";
const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1); // Default quantity set to 1
  const [selectedImage, setSelectedImage] = useState(0);
  const dispatch = useDispatch(); // Get dispatch function

  // Placeholder images
  const images = [
    "https://via.placeholder.com/300.png?text=Image+1",
    "https://via.placeholder.com/300.png?text=Image+2",
    "https://via.placeholder.com/300.png?text=Image+3",
    "https://via.placeholder.com/300.png?text=Image+4",
  ];

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change)); // Ensure quantity is at least 1
  };

  const handleAddToCart = () => {
    const product = {
      id: "product-id", // Replace with actual product ID
      title: "Fall Limited Edition Sneakers", // Replace with actual product name
      price: 125.0, // Replace with actual product price
      quantity: quantity,
      image: images[selectedImage], // Add the selected image
    };
    dispatch(addToCart(product));
  };

  return (
    <div className="container lg:px-80 p-8 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row gap-16">
        {/* Image Section */}
        <div className="w-full lg:px-10 md:w-1/2">
          <div className="rounded-lg overflow-hidden mb-4 shadow-md transition-transform transform hover:scale-105">
            <img
              src={images[selectedImage]}
              alt="Product"
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
          <div className="flex justify-start space-x-2">
            {images.map((img, index) => (
              <button
                key={index}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-transform transform hover:scale-110 ${
                  selectedImage === index
                    ? "ring-2 ring-orange-600"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-orange-600 font-bold uppercase mb-2">
            Sneaker Company
          </h2>
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Fall Limited Edition Sneakers
          </h1>
          <p className="text-gray-700 mb-6">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they'll withstand everything
            the weather can offer.
          </p>

          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold mr-4 text-gray-800">
              $125.00
            </span>
            <span className="bg-orange-200 text-orange-600 font-bold px-2 py-1 rounded">
              50% OFF
            </span>
          </div>
          <div className="text-gray-400 line-through mb-6">$250.00</div>

          {/* Quantity and Add to Cart Section */}
          <div className="flex items-center mb-6">
            <button
              className="bg-gray-300 text-orange-600 font-bold px-3 py-2 rounded-l hover:bg-gray-400 transition"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </button>
            <span className="bg-gray-300 px-4 py-2">{quantity}</span>
            <button
              className="bg-gray-300 text-orange-600 font-bold px-3 py-2 rounded-r hover:bg-gray-400 transition"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
            <button
              className="ml-4 bg-orange-600 text-white font-bold px-6 py-2 rounded flex items-center hover:bg-orange-500 transition"
              onClick={handleAddToCart} // Call handleAddToCart on click
            >
              Add to cart
            </button>
          </div>

          {/* Hardcoded Product Details */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-orange-600">
              Product Details
            </h2>
            <p className="text-gray-800">
              <strong>Model:</strong> Sneaker XYZ
            </p>
            <p className="text-gray-800">
              <strong>Storage:</strong> 256 GB
            </p>
            <p className="text-gray-800">
              <strong>Color:</strong> Black/White
            </p>
            <p className="text-gray-800">
              <strong>Condition:</strong> New
            </p>
            <p className="text-gray-800">
              <strong>Original Release Year:</strong> 2023
            </p>
            <p className="text-gray-800">
              <strong>Battery Health:</strong> 100%
            </p>
            <p className="text-gray-800">
              <strong>Unlocked:</strong> Yes
            </p>
            <p className="text-gray-800">
              <strong>Seller:</strong> Sneaker Store Inc.
            </p>
          </div>
        </div>
      </div>

      {/* Hardcoded Reviews Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-orange-600">Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-2">
              <img
                src="https://via.placeholder.com/40.png?text=JD"
                alt="Reviewer"
                className="rounded-full mr-2"
              />
              <div>
                <p className="text-gray-800 font-bold">John Doe</p>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              "These sneakers are amazing! Super comfortable and stylish."
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-2">
              <img
                src="https://via.placeholder.com/40.png?text=JS"
                alt="Reviewer"
                className="rounded-full mr-2"
              />
              <div>
                <p className="text-gray-800 font-bold">Jane Smith</p>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              "Great value for the price. I love the design!"
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center mb-2">
              <img
                src="https://via.placeholder.com/40.png?text=EJ"
                alt="Reviewer"
                className="rounded-full mr-2"
              />
              <div>
                <p className="text-gray-800 font-bold">Emily Johnson</p>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              "Best sneakers I've ever owned! Highly recommend."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
