import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
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
            <a href="/login">
              <img src="/JobLogo.jpg" className="h-16" />
            </a>
            <a
              href="/login"
              className="flex pt-5 align-center text-2xl font-black"
            >
              Job <span className="text-[#036aa1da]">Finder</span>
            </a>
          </div>
          <h2 className="text-3xl text-center font-semibold mb-6">
            Login to Your Account
          </h2>
          <form>
            <div className="inputTag">
              <label className="ml-1 block font-semibold">
                Login As <span className="text-red-500">*</span>
              </label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>

            <div className="inputTag">
              <label className="ml-1 block font-semibold">
                Email Address <span className="text-red-500">*</span>
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
                Password <span className="text-red-500">*</span>
              </label>
              <div>
                <input
                  type="password"
                  placeholder="Type your password here"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <RiLock2Fill />
              </div>
            </div>

            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            <p className="text-center mt-4 ml-12">Don't have an account?</p>
            <a href="/register">Register Now</a>
          </form>
        </div>
        <div className="banner">
          <img src="/login.png" alt="Login" />
        </div>
      </section>
    </>
  );
};

export default Login;
