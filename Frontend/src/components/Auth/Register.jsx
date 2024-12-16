import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="flex justify-center">
            <a href="/register">
              <img src="/JobLogo.jpg" className="h-16" />
            </a>
            <a
              href="/register"
              className="flex pt-5 align-center text-2xl font-black"
            >
              Job <span className="text-[#036aa1da]">Finder</span>
            </a>
          </div>

          <div className="header">
            <h2 className="text-3xl text-center font-semibold mb-6">
              Create a New Account
            </h2>
          </div>
          <form>
            <div className="inputTag">
              <label className="ml-1 block font-semibold">
                Register As<span className="text-red-500">*</span>
              </label>
              <div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label className="ml-1 block font-semibold">
                Name<span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  type="text"
                  placeholder="Type your username here"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              <label className="ml-1 block font-semibold">Phone Number</label>
              <div>
                <input
                  type="text"
                  placeholder="Type your phone number here"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FaPhoneFlip />
              </div>
            </div>
            <div className="inputTag">
              <label className="ml-1 block font-semibold">
                Email Address<span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  type="email"
                  placeholder="Type your email address here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
            <label className="ml-1 block font-semibold">
                Password<span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  type="password"
                  placeholder="Type your password here"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit" onClick={handleRegister}>
              Register
            </button>
            <p className="text-md text-center">Already have an account?</p>
            <a href="/login">Login Now</a>
          </form>
        </div>
        <div className="banner">
          <img src="/register.png" alt="Register" />
        </div>
      </section>
    </>
  );
};

export default Register;
