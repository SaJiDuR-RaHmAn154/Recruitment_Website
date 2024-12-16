import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ScrollToTopButton from "../../components/ReturnToTop";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getAll", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
          setFilteredJobs(res.data.jobs || []);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const filtered = jobs.jobs?.filter((job) => {
      const matchesTitle = job.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter
        ? job.category.toLowerCase() === categoryFilter.toLowerCase()
        : true;

      const matchesCountry = countryFilter
        ? job.country.toLowerCase() === countryFilter.toLowerCase()
        : true;

      return matchesTitle && matchesCategory && matchesCountry;
    });
    setFilteredJobs(filtered || []);
  }, [searchTerm, categoryFilter, countryFilter, jobs]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <>
      <section className="jobs page bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Filter Jobs</h2>
          {/* Filters Section */}
          <div className="flex flex-row gap-4">
            <input
              type="text"
              placeholder="Search by Job Title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-black tracking-wide py-2 px-4 rounded-md placeholder:font-semibold  w-1/2"
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-black p-2 rounded-md font-semibold w-1/3 md:w-1/2"
            >
              <option value="">Filter by Job Category</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Data Analyst">Data Mining</option>
              <option value="Graphics Design">Graphics Design</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Mobile App Development">
                Mobile App Development
              </option>
              <option value="Frontend Web Development">
                Frontend Web Development
              </option>
              <option value="MERN Stack Development">
                MERN Stack Development
              </option>
              <option value="MEAN Stack Development">
                MEAN Stack Development
              </option>
              <option value="Video Editing">Video Editing</option>
              <option value="Data Entry Operator">Data Entry Operator</option>
            </select>

            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="border border-black py-2 px-4 rounded-md font-semibold w-1/2"
            >
              <option value="">Filter by Country</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Germany">Germany</option>
              <option value="India">India</option>
              <option value="Singapore">Singapore</option>
            </select>
          </div>

          <h2 className="text-3xl mt-8 font-bold mb-6">Available Jobs</h2>

          {/* Jobs Display Section */}
          {filteredJobs.length !== 0 ? (
            <>
              <div className="banner">
                {filteredJobs.map((element) => {
                  return (
                    <div className="card" key={element._id}>
                      <p>{element.title}</p>
                      <p>{element.category}</p>
                      <p>{element.country}</p>
                      <Link to={`/job/${element._id}`}>Job Details</Link>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <h2 className="text-center mt-20 text-red-700">
              Sorry, No Jobs Found !!
            </h2>
          )}
        </div>
        <ScrollToTopButton />
      </section>
    </>
  );
};

export default Jobs;
