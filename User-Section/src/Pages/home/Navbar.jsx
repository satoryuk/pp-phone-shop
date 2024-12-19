import React, { useEffect } from "react";
import { logo, menu, buy } from "../Assets/image";
import { Link, NavLink } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import Popup from "reactjs-popup";
import NotificationCard from "./Notification_Card";
import { useState } from "react";

const Navbar = ({ token, onLogin, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      onLogin;
    }
  }, [token, onLogin]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="w-full  px-10 mx-auto">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Name */}
          <div className="flex items-center">
            <img src={logo} alt="Phone Shop Logo" className="h-10 w-10" />
            <span className="text-green-600 text-2xl font-bold ml-2">
              Phone Shop
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 mx-8">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-28 py-2 border border-gray-300 rounded-full focus:outline-none"
              style={{ borderRadius: "8px" }}
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-4 py-1 rounded"
              style={{ borderRadius: "4px" }}
            >
              SEARCH
            </button>
          </div>

          {/* Account Btn */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="relative">
              <span role="img" aria-label="cart">
                <img src={buy} alt="buy_cart" className="w-[30px] h-auto" />
              </span>
              <span className="absolute top-0 right-0 transform translate-x-[25%] bg-red-600 text-white text-xs rounded-full px-1">
                0
              </span>
            </button>

            {/* Conditional Rendering Based on Token */}
            {token ? (
              // Show Notification Pop-up and Logout Button if token exists
              <div className="flex items-center space-x-4">
                <Popup
                  trigger={
                    <div className="cursor-pointer">
                      <IoIosNotifications size={24} />
                    </div>
                  }
                  position="bottom center"
                  arrow={true}
                  closeOnDocumentClick
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

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              <span className="text-3xl">
                <img src={menu} alt="menu" className="w-[25px] h-auto" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="bg-white shadow-md md:hidden">
          <div className="flex flex-row items-center justify-center gap-8 pb-4">
            <button className="relative">
              <span role="img" aria-label="cart">
                <img src={buy} alt="buy_cart" className="w-[30px] h-auto" />
              </span>
              <span className="absolute top-0 right-0 transform translate-x-[25%] bg-red-600 text-white text-xs rounded-full px-1">
                0
              </span>
            </button>

            {token ? (
              <button
                onClick={onLogout}
                className="bg-green-600 text-white px-4 py-2 rounded-full mb-2"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link to="/auth/Login">
                  <button className="text-gray-800 mb-2">Log In</button>
                </Link>
                <NavLink to="/auth/Signup">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-full">
                    Sign Up
                  </button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div className="bg-green-600">
        <div className="flex justify-center space-x-6 py-3 text-white">
          <Link to="/">
            <span className="hover:text-gray-200">Home</span>
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
    </nav>
  );
};

export default Navbar;
