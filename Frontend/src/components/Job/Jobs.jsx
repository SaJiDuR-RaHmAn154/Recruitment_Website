import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
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
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <>
      <section className="jobs page">
        <div className="container">
          <h2>Available Jobs</h2>
          {jobs.length !== 0 ? (
            <>
              <div className="banner">
                {jobs.jobs &&
                  jobs.jobs.map((element) => {
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
            <>
              <h2 className="text-center mt-20 text-red-700">Sorry, No Jobs Found !!</h2>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Jobs;
