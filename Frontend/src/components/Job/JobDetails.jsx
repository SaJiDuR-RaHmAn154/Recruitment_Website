import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white p-8 shadow-md rounded-lg flex flex-col items-center">
        <h2 className="text-2xl font-bold text-center mb-6">Job Details</h2>
        <div className="w-full flex flex-col gap-5">
          <p className="text-lg font-bold text-green-800">
            Title: <span className="text-black font-medium"> {job.title}</span>
          </p>
          <p className="text-lg font-bold text-green-800">
            Category: <span className="text-black font-medium">{job.category}</span>
          </p>
          <p className="text-lg font-bold text-green-800">
            City: <span className="text-black font-medium">{job.city}</span>
          </p>
          <p className="text-lg font-bold text-green-800">
            Country: <span className="text-black font-medium">{job.country}</span>
          </p>
          <p className="text-lg font-bold text-green-800">
            Location: <span className="text-black font-medium">{job.location}</span>
          </p>
          <p className="text-lg font-bold text-green-800">
            Salary: {" "}
            {job.fixedSalary ? (
              <span className="text-black font-medium">{job.fixedSalary}</span>
            ) : (
              <span className="text-black font-medium">
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          <p className="text-lg font-bold text-green-800">
            Description: <span className="text-black font-medium">{job.description ? job.description : "Not Provided"}</span>
          </p>
          {user && user.role === "Employer" ? null : (
            <div className="mt-6 text-center">
              <Link
                to={`/application/${job._id}`}
                className="block w-64 mx-auto py-2 text-lg font-medium text-white bg-green-700 rounded hover:bg-green-800 text-center"
              >
                Apply Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;