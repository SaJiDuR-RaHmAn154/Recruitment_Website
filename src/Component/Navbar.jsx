import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenu] = useState(false);

  // After clicking the menu,the state will be toggled
  const stateToggler = () => {
    setIsMenu(!isMenuOpen);
  };

  const navItems = [
    { path: "/", title: "Search Job" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary Estimate " },
    { path: "/post-job", title: "Post Job" },
  ];

  return (
    <>
      <header className="max-w-screen-2xl mx-auto container px-2 xl:px-16">
        <nav className="flex justify-between items-center py-2">
          <div className="flex mb-2">
            <a href="/">
              <img src="/images/JobLogo.jpg" className="h-16 pt-1" />
            </a>
            <a href="/" className="flex pt-5 align-center text-2xl font-black">
              Job <span className="text-red-800">Finder</span>
            </a>
          </div>

          {/* NavItems */}
          <ul className="hidden md:flex gap-10">
            {navItems.map(({ path, title }) => (
              <li key={path} className="text-base text-primary font-bold">
                <NavLink
                  to={path}
                  className={( {isActive} ) => (isActive ? "active" : "")}
                >
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Login And SignUp */}
          <div className="text-base text-primary font-medium space-x-4 hidden lg:block">
            <Link
              to="/login"
              className="py-1 px-6 rounded-md bg-sky text-white hover:bg-purple-900 tracking-wide"
            >
              Login
            </Link>
            <Link
              to="/signUp"
              className="py-1 px-4  rounded-md bg-sky text-white hover:bg-purple-900 tracking-wide"
            >
              SignUp
            </Link>
          </div>

          {/* Drop-Down menu in small devices */}
          <div className="md:hidden block">
            <button onClick={stateToggler}>
              {isMenuOpen ? (
                <FaXmark className="w-6 h-6 mr-4 text-primary" />
              ) : (
                <FaBars className="w-6 h-6 mr-4 text-primary" />
              )}
            </button>
          </div>
        </nav>

        {/* NavItems for Drop-Down Menu (Responsive Navbar) */}
        <div
          className={`px-4 py-5 bg-black ${
            isMenuOpen ? "" : "hidden"
          } lg:hidden`}
        >
          <ul>
          {navItems.map(({ path, title }) => (
              <li key={path} className="text-base text-white font-bold">
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {title}
                </NavLink>
              </li>
            ))}

            <li className="pt-3 pb-2">
              <Link
                to="/login"
                className="py-1 px-6 rounded-md bg-sky text-white hover:bg-purple-900 tracking-wide"
              >
                Login
              </Link>

              <Link
                to="/signUp"
                className="py-1 px-4 ml-4 rounded-md bg-sky text-white hover:bg-purple-900 tracking-wide"
              >
                SignUp
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
