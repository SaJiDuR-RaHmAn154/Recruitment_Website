import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
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
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };
  return (
    <>
      <header className="max-w-screen-3xl mx-auto container px-2 xl:px-16">
        <nav
          className={
            isAuthorized ? "flex justify-between items-center pt-5" : "hidden"
          }
        >
          <div className="flex">
            <a href="/">
              <img src="/JobLogo.jpg" className="h-16 pt-1" />
            </a>
            <a
              href="/"
              className="flex pt-5 align-center text-2xl font-black"
            >
              Job <span className="text-[#036aa1da]">Finder</span>
            </a>
          </div>

          {/* NavItems */}
          <ul className={user && user.role==='Employer'?"hidden md:flex gap-12 pt-4":"hidden md:flex gap-20 pt-4"}>
            <li className="font-bold text-lg">
              <NavLink
                to={"/"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            </li>
            <li className="text-lg font-bold">
              <NavLink to={"/job/getAll"} >
                All Jobs
              </NavLink>
            </li>
            
            {user && user.role === "Employer" ? (
              <>
                <li className="text-lg font-bold">
                  <NavLink to={"/job/post"}>
                    Post Job
                  </NavLink>
                </li>
                <li className="text-lg font-bold">
                  <NavLink to={"/job/me"}>
                    View Posted Jobs
                  </NavLink>
                </li>
              </>
            ) : (
              <></>
            )}
            <li className="text-lg font-bold">
              <NavLink to={"/applications/me"}>
                {user && user.role === "Employer"
                  ? "Applicant's Applications"
                  : "My Applications"}
              </NavLink>
            </li>
              <button onClick={handleLogout} className="btn1 text-lg">
                Logout
              </button>
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

        {/* NavItems for Drop-Down Menu (Responsive Navbar) */}
        <div
          className={`px-4 pt-4 pb-4 bg-black text-white text-lg ${
            show ? "" : "hidden"
          } lg:hidden`}
        >
          <ul>
            <li className="text-lg font-bold">
              <NavLink to={"/"}>
                Home
              </NavLink>
            </li>
            <li className="text-lg font-bold">
              <NavLink to={"/job/getAll"}>
                All Jobs
              </NavLink>
            </li>
            <li className="text-lg font-bold">
              <NavLink to={"/applications/me"}>
                {user && user.role === "Employer"
                  ? "Applicant's Applications"
                  : "My Applications"}
              </NavLink>
            </li>
            {user && user.role === "Employer" ? (
              <>
                <li className="text-lg font-bold">
                  <NavLink to={"/job/post"}>
                    Post Job
                  </NavLink>
                </li>
                <li className="text-lg font-bold">
                  <NavLink to={"/job/me"}>
                    View Posted Jobs
                  </NavLink>
                </li>
              </>
            ) : (
              <></>
            )}
              <button onClick={handleLogout} className="btn1 mt-4 text-lg text-white ">
                Logout
              </button>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
