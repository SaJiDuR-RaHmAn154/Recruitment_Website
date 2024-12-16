import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ScrollToTopButton from "../../components/ReturnToTop";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleJobPost = async (event) => {
    event.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }

    await axios
      .post(
        "http://localhost:4000/api/v1/job/post",
        fixedSalary.length >= 4
          ? {
              title,
              category,
              country,
              city,
              location,
              fixedSalary,
              description,
            }
          : {
              title,
              category,
              country,
              city,
              location,
              salaryFrom,
              salaryTo,
              description,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        navigateTo("/job/getAll");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  };

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post page py-8 px-4 md:px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6">Post New Job</h2>
          <form onSubmit={handleJobPost} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="title" className="block font-semibold">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Provide Job Title Here"
                className="w-full border bg-white border-gray-300 p-2"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="category" className="block font-semibold">
                Job Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="wrapper w-full border border-gray-300 p-2"
                required
              >
                <option value="">Select Job Category</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Data Mining">Data Mining</option>
                <option value="Graphics Design">Graphics Design</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="MERN Stack Development">
                  MERN STACK Development
                </option>
                <option value="MEAN Stack Development">
                  MEAN STACK Development
                </option>
                <option value="Video Editing">Video Editing</option>
                <option value="Data Entry Operator">Data Entry Operator</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="city" className="block font-semibold">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Provide City Here"
                className="w-full border border-gray-300 p-2"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="country" className="block font-semibold">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Provide Country Here"
                className="w-full border border-gray-300 p-2"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="location" className="block font-semibold">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Provide Job Location Here"
                className="w-full border border-gray-300 p-2"
                required
              />
            </div>

            <div className="salary_wrapper space-y-2">
              <label htmlFor="salaryType" className="block font-semibold">
                Salary Type <span className="text-red-500">*</span>
              </label>
              <select
                id="salaryType"
                value={salaryType}
                onChange={(e) => setSalaryType(e.target.value)}
                className="w-full border border-gray-300 p-2"
                required
              >
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>

              {salaryType === "default" ? (null
              ) : salaryType === "Fixed Salary" ? (
                <div className="space-y-2">
                  <input
                    type="number"
                    id="fixedSalary"
                    placeholder="Enter Fixed Salary Here"
                    value={fixedSalary}
                    onChange={(e) => setFixedSalary(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-lg"
                    required
                  />
                </div>
              ) : (
                <div className="ranged_salary space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Salary From"
                      value={salaryFrom}
                      onChange={(e) => setSalaryFrom(e.target.value)}
                      className="w-1/2 border border-gray-300 p-2"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Salary To"
                      value={salaryTo}
                      onChange={(e) => setSalaryTo(e.target.value)}
                      className="w-1/2 border border-gray-300 p-2"
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="wrapper space-y-1">
              <label htmlFor="description" className="block font-semibold">
                Job Description{" "}
                <span className="text-gray-500">(Optional)</span>
              </label>
              <textarea
                id="description"
                rows="2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 p-2"
                placeholder="Provide Job Description Here"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Create Job
            </button>
          </form>
        </div>

      <ScrollToTopButton />
      </div>
    </>
  );
};

export default PostJob;
