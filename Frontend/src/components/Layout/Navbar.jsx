import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);

  const handleToggler = () => {
    setShow(!show);
  };

  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <header className="bg-white mr-6 pt-1">
      <div className="container mx-auto px-4 lg:px-8">
        <nav
          className={
            isAuthorized ? "flex justify-between items-center pt-5" : "hidden"
          }
        >
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a href="/">
              <img src="/JobLogo.jpg" alt="Job Finder" className="h-16 mb-4 ml-4" />
            </a>
            <a href="/" className="text-2xl font-black mb-3">
              Job <span className="text-[#036aa1da]">Finder</span>
            </a>
          </div>

          {/* Desktop Menu */}
          <ul className={`hidden lg:flex space-x-8 text-lg font-bold`}>
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "text-[#036aa1da]" : ""}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/job/getAll" className={({ isActive }) => isActive ? "text-[#036aa1da]" : ""}>
                All Jobs
              </NavLink>
            </li>
            {user && user.role === "Employer" && (
              <>
                <li>
                  <NavLink to="/job/post" className={({ isActive }) => isActive ? "text-[#036aa1da]" : ""}>
                    Post Job
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/job/me" className={({ isActive }) => isActive ? "text-[#036aa1da]" : ""}>
                    View Posted Jobs
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/applications/me" className={({ isActive }) => isActive ? "text-[#036aa1da]" : ""}>
                {user && user.role === "Employer" ? "Applicant's Applications" : "My Applications"}
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={({ isActive }) => isActive ? "text-[#036aa1da]" : ""}>
                My Profile
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="btn1"
              >
                Logout
              </button>
            </li>
          </ul>


            {/* Drop-Down menu in small devices */}
          <div className="lg:hidden block">
            <button onClick={handleToggler}>
              {show ? (
                <FaXmark className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6 " />
              )}
            </button>
          </div>
        </nav>



        {/* Mobile Menu */}
        {show && (
          <ul className={`flex flex-col space-y-4 bg-black text-white text-lg font-bold p-4  lg:hidden`}>
            <li>
              <NavLink to="/" onClick={handleToggler} className={`hover:text-[#036aa1da]`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/job/getAll" onClick={handleToggler} className={`hover:text-[#036aa1da]`}>
                All Jobs
              </NavLink>
            </li>
            {user && user.role === "Employer" && (
              <>
                <li>
                  <NavLink to="/job/post" onClick={handleToggler} className={`hover:text-[#036aa1da]`} >
                    Post Job
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/job/me" onClick={handleToggler} className={`hover:text-[#036aa1da]`}>
                    View Posted Jobs
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/applications/me" onClick={handleToggler} className={`hover:text-[#036aa1da]`}>
                {user && user.role === "Employer" ? "Applicant's Applications" : "My Applications"}
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" onClick={handleToggler} className={`hover:text-[#036aa1da]`}>
                My Profile
              </NavLink>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  handleToggler();
                }}
                className="w-full btn1"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Navbar;
