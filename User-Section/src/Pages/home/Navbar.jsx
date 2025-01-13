import React, { useEffect, useRef } from "react";
import { logo, menu, buy, favorite_packages, compare } from "../Assets/image";
import { Link, NavLink } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import Popup from "reactjs-popup";
import NotificationCard from "./Notification_Card";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import store from "../../store/store";
import { nav_icon } from "../../Constants";
import { toggleStatusTab } from "../../store/cart";

const Navbar = ({ token, onLogin, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [totalQuatity, setTotalQuantity] = useState(0);
  const cart = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [searchData, setSearchData] = useState("");

  // Create a reference to the footer
  const footerRef = useRef(null);

  // Scroll to footer when "Contact Us" link is clicked
  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.log("Footer reference is not set properly.");
    }
  };
  useEffect(() => {
    if (!token) {
      onLogin;
    }
    let total = 0;
    cart.forEach((item) => (total += item.quantity));
    setTotalQuantity(total);
  }, [token, onLogin, cart]);

  // Scroll to the footer when the "Contact" link is clicked

  const handleOpenTabCart = () => {
    dispatch(toggleStatusTab()); // Dispatch the action to open the cart tab
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="w-full  px-10 mx-auto">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Name */}
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Phone Shop Logo" className="h-10 w-10" />
            </Link>
            <Link to="/">
              <span className="text-green-600 text-2xl font-bold ml-2">
                Phone Shop
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 mx-8 max-lg:hidden">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-28 py-2 border border-gray-300 rounded-full focus:outline-none "
              onChange={(e) => setSearchData(e.target.value)}
              style={{ borderRadius: "8px" }}
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <Link
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-4 py-1 rounded"
              style={{ borderRadius: "4px" }}
              to={`Search?productName=${searchData}`}
            >
              SEARCH
            </Link>
          </div>

          {/* Account Btn */}
          <div className="flex items-center space-x-6">
            {nav_icon.map((element) =>
              element.label === "AddToCart" ? (
                <div
                  key={element.label}
                  className="w-12 h-12 rounded-full flex justify-center items-center relative"
                  onClick={() => handleOpenTabCart()} // Add onClick event
                >
                  <img src={element.img} alt={element.label} className="w-8" />
                  <span className="absolute font-bold bottom-1 right-1 text-white bg-red-600 text-xs w-4 h-4 rounded-full flex justify-center items-center">
                    {totalQuatity}
                  </span>
                </div>
              ) : (
                <NavLink key={element.label} to={element.href}>
                  <img
                    src={element.img}
                    alt={element.label}
                    className={`w-8 md:block `}
                  />
                </NavLink>
              )
            )}

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
              <div className="space-x-2 flex">
                <Link to="/auth/Login">
                  <button
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hidden lg:block"
                    style={{ borderRadius: "8px" }}
                  >
                    Log In
                  </button>
                </Link>
                <NavLink to="/auth/Signup">
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-full hidden lg:block"
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
            <button onClick={() => setToggleMenu(!toggleMenu)}>
              <span className="text-3xl">
                <img src={menu} alt="menu" className="w-[25px] h-auto" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="bg-green-600 max-lg:hidden">
        <div className="flex justify-center space-x-32 py-3 text-white">
          <Link to="/">
            <span className="hover:text-gray-200">Home</span>
          </Link>
          <Link
            to={`/AfterHomePage?page=NEW ARRIVAL`}
            className="hover:text-gray-200"
          >
            NEW ARRIVAL
          </Link>
          <Link
            to={`/AfterHomePage?page=DISCOUNT`}
            className="hover:text-gray-200"
          >
            DISCOUNT
          </Link>
          <Link
            to={`/user-profile`}
            className="hover:text-gray-200"
          >
            PROFILE
          </Link>
          <a
            onClick={scrollToFooter}
            className="cursor-pointer hover:text-gray-200"
            href="#contact"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="bg-white shadow-md md:hidden">
          <div className="flex flex-row items-center justify-center gap-8 pb-4">
            <Link to="/">
              <button className="relative">
                <span role="img" aria-label="cart">
                  <img src={buy} alt="buy_cart" className="w-[30px] h-auto" />
                </span>
              </button>
            </Link>
            {/* Other buttons here */}
            <button onClick={scrollToFooter} className="text-gray-800 mb-2">
              Contact Us
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
