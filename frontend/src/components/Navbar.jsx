import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, ShoppingCart } from "lucide-react";
import products from "./data";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchInputRef = useRef(null); // Create a ref for the search input

  const handleAuthClick = () => {
    console.log(localStorage.getItem("username"));
    console.log(localStorage.getItem("token"));
    navigate("/login");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      // Focus the input after search is toggled
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  };

  const handleSearchChange = (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 0) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/products/${product.id}`);
    setQuery("");
    setFilteredProducts([]);
  };

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev); // Toggle dropdown visibility
    console.log(isDropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <img
              className="h-8 w-auto sm:h-10"
              src="/src/assets/logoc.png"
              alt="Cashify"
            />
          </Link>

          <div className="hidden md:flex flex-1 justify-center px-2">
            <div className="w-full max-w-lg relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  value={query}
                  onChange={handleSearchChange}
                  className="block w-full bg-gray-100 border border-gray-300 rounded-lg py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  type="text"
                  placeholder="Search for mobiles, accessories & More"
                />
              </div>

              {filteredProducts.length > 0 && (
                <ul className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <li
                      key={product.name}
                      onClick={() => handleProductClick(product)}
                      className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-sm text-gray-700"
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center">
              <MapPin className="h-5 w-5 text-gray-400" />
              <select className="ml-1 bg-transparent border-none outline-none text-gray-600 text-sm">
                <option>Kolkata</option>
                <option>Gurgaon</option>
                <option>Delhi</option>
                <option>Mumbai</option>
                <option>Bangalore</option>
                <option>Hyderabad</option>
                <option>Chennai</option>
                <option>Pune</option>
                <option>Jaipur</option>
              </select>
            </div>

            <button
              onClick={toggleSearch}
              className="md:hidden bg-gray-100 p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              onClick={handleCartClick}
              className="relative bg-gray-100 p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
            </button>

            {!username || !token ? (
              <button
                onClick={handleAuthClick}
                className="bg-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-600 transition duration-150 ease-in-out"
              >
                Login
              </button>
            ) : (
              <div className="relative z-20">
                <img
                  src="src/assets/person-icon-flat-design-template-isolated-avatar-sign-vector-illustration_109161-1676.avif"
                  alt="User"
                  className="h-14 w-14 rounded-full cursor-pointer"
                  onClick={toggleDropdown} // Toggle dropdown on click
                />
                {isDropdownVisible && ( // Conditional rendering of dropdown
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                    <div className="flex justify-between items-center px-4 py-2 bg-orange-400 text-white rounded-lg shadow-lg">
                      <span>{username}</span>
                      <button
                        onClick={toggleDropdown}
                        className="text-white text-lg"
                      >
                        {" "}
                        {/* Increased font size */}
                        &times; {/* Close icon */}
                      </button>
                    </div>

                    <Link
                      to="/my-orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {isSearchVisible && (
        <div className="mt-4 md:hidden px-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref={searchInputRef} // Attach the ref to the mobile search input
              value={query}
              onChange={handleSearchChange}
              className="block w-full bg-gray-100 border border-gray-300 rounded-lg py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              type="text"
              placeholder="Search for mobiles, accessories & More"
            />
          </div>

          {filteredProducts.length > 0 && (
            <ul className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredProducts.map((product) => (
                <li
                  key={product.name}
                  onClick={() => handleProductClick(product)}
                  className="cursor-pointer hover:bg-gray-100 px-4 py-2 text-sm text-gray-700"
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
