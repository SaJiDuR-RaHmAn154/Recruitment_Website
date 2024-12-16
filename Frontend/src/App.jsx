import React, { useEffect, useContext } from "react";
import { Context } from "./main";
import "./index.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/Layout/Navbar";
import MyProfile from "./components/Layout/MyProfile";
import UpdateProfile from "./components/Layout/updateProfile";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import PostJob from "./components/Job/PostJob";
import MyJobs from "./components/Job/MyJobs";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import NotFound from "./components/NotFound/NotFound";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          { withCredentials: true }
        );
        setUser(response.data.user);
        setIsAuthorized(true); //User found
      } catch (error) {
        setIsAuthorized(false); //No user found
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getAll" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
