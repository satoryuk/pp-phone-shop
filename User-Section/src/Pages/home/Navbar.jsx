import React, { useEffect } from "react";
import { logo } from "../Assets/image";
import { Link, NavLink } from "react-router-dom";

  return (
    <nav className="bg-white shadow-md">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src={logo} alt="Phone Shop Logo" className="h-10 w-10" />
            <span className="text-green-600 text-xl font-bold ml-2">
              Phone Shop
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-8 pr-20 py-2 border border-gray-300 focus:outline-none"
                style={{ borderRadius: "8px" }}
              />
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-4 py-1 rounded-full"
                style={{ borderRadius: "4px" }}
              >
                SEARCH
              </button>
            </div>
                >
                  {/* Popup Content */}
                  <NotificationCard />
                </Popup>
                <button
                  onClick={onLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-full"
                  style={{ borderRadius: "8px" }}
                >
                  Log Out
                </button>
              </div>
            ) : (
              // Show Login and Sign Up Buttons if no token exists
              <div className="space-x-2">
                <Link to="/auth/Login">
                  <button
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full"
                    style={{ borderRadius: "8px" }}
                  >
                    Log In
                  </button>
                </Link>
                <NavLink to="/auth/Signup">
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-full"
                    style={{ borderRadius: "8px" }}
                  >
                    Sign Up
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="bg-green-600">
          <div className="flex justify-center space-x-6 py-3 text-white">
            </Link>
            <a href="#" className="hover:text-gray-200">
              Accessories
            </a>
            <a href="#" className="hover:text-gray-200">
              Pre-Order
            </a>
            <a href="#" className="hover:text-gray-200">
              Contact Us
            </a>
            <a href="#" className="hover:text-gray-200">
              News
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
