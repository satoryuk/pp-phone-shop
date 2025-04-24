import { NavLink, useLocation, Outlet, Link } from "react-router-dom";
import { hambugerBar, logo, Log_out } from "../../Assets";
import { nav_bar } from "../../Constants";
import { useState } from "react";
import Cookies from "js-cookie";
import { logoutFetch } from "../../Fetch/FetchAPI";

const handleLogout = async () => {
  try {
    const response = await logoutFetch();
    Cookies.remove("token");
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
const RootLayOut = () => {
  const location = useLocation();
  const [toggleMenu, setToggleMenu] = useState(false);
  const token = Cookies.get("token"); // Get the token from cookies

  return token ? (
    <main className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="flex max-lg:flex-row max-lg:justify-between flex-col p-6 w-80 bg-gray-900 shadow-lg lg:w-72 max-lg:w-full max-lg:border-b-2 lg:border-r-2">
        {/* Fixed Sidebar */}
        <div className="hidden lg:block fixed top-0 left-0 h-full w-72 bg-gray-900 shadow-lg">
          {/* Logo */}
          <div className="flex items-center mt-4 ml-4 gap-4">
            <NavLink to="/">
              <img
                src={logo}
                alt="App logo"
                className="w-22 lg:w-12 rounded-full"
              />
            </NavLink>
            <h2 className="font-bold text-2xl text-gray-300">Phone Shop</h2>
          </div>
          <nav className="flex flex-col gap-4 p-6">
            {nav_bar.map(({ img, label, path }) => (
              <NavLink
                key={label}
                to={path}
                className={`flex items-center gap-4 px-4 py-2 rounded-lg text-sm font-medium transition hover:bg-gray-100 ${
                  location.pathname === `/dashboard${path}` ? "bg-gray-100" : ""
                }`}
              >
                <img src={img} alt={`${label} icon`} className="w-5 h-5" />
                <span className="green-txt">{label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center justify-center mt-80">
            <Link
              to="/"
              className="red-btn max-lg:w-12 max-lg:text-xl text-xs"
              style={{ height: "38px" }}
              onClick={() => handleLogout()}
            >
              <img src={Log_out} alt="" className="w-4 h-auto mr-1" />
              Log Out
            </Link>
          </div>
        </div>
        {/* Hamburger Button (Mobile) */}
        <button
          className="flex items-center justify-center lg:hidden"
          onClick={() => setToggleMenu(!toggleMenu)}
          aria-label="Toggle menu"
        >
          <img src={hambugerBar} alt="Menu button" className="w-11 h-auto" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-col gap-4">
          {nav_bar.map(({ img, label, path }) => (
            <NavLink
              key={label}
              to={path}
              className={`flex items-center gap-4 px-4 py-2 rounded-lg text-sm font-medium transition hover:bg-gray-100 ${
                location.pathname === `/dashboard${path}` ? "bg-gray-100" : ""
              }`}
            >
              <img src={img} alt={`${label} icon`} className="w-5 h-5" />
              <span className="green-txt">{label}</span>
            </NavLink>
          ))}
        </nav>
        <Link
          to="/"
          className="red-btn max-lg:w-24 max-lg:text-xs mt-1"
          style={{ height: "38px" }}
          onClick={() => handleLogout()}
        >
          Log Out
          <img src={Log_out} alt="" className="w-4 h-auto ml-1" />
        </Link>
      </aside>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-gray-800 bg-opacity-50 lg:hidden transition-transform transform ${
          toggleMenu ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={() => setToggleMenu(false)} // Close menu on overlay click
      >
        <div
          className="w-64 bg-gray-900 h-full shadow-lg"
          onClick={(e) => e.stopPropagation()} // Prevent closing on content click
        >
          <nav className="flex flex-col gap-4 p-6">
            {nav_bar.map(({ img, label, path }) => (
              <NavLink
                key={label}
                to={path}
                onClick={() => setToggleMenu(false)} // Close menu on navigation
                className={`flex items-center gap-4 px-4 py-2 rounded-lg text-sm font-medium transition hover:bg-yellow-400 ${
                  location.pathname === `/${path}` ? "bg-gray-100" : ""
                }`}
              >
                <img src={img} alt={`${label} icon`} className="w-5 h-5" />
                <span className="green-txt">{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="flex-auto p-6 ml-2">
        <Outlet />
      </section>
    </main>
  ) : (
    // If no token, display a fallback (e.g., a message or redirect)
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-xl">You are not authenticated. Please log in.</h1>
      <div className="flex justify-between mt-8 gap-28">
        <Link
          to="/"
          className="font-bold px-8 py-4 rounded-xl bg-primary text-white hover:bg-green-500"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="font-bold px-8 py-4 rounded-xl bg-red-600 text-black hover:text-gray-700 hover:bg-red-500"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default RootLayOut;
