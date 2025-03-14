import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import ScrollToTopButton from "../../components/ReturnToTop";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  //Fetching all jobs of an Employer
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getMyJobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  // Function for enabling editing mode
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };
  // Function for disabling editing mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  // Function for editing jobs
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  // Function for deleting jobs
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) => 
      prevJobs.map((job) => 
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <>
      <div className="myJobs page">
        <div className="container">
        <h2 className="text-3xl font-bold mb-6">Your Posted Jobs</h2>
          {myJobs.length > 0 ? (
            <>
              <div className="banner">
                {myJobs && myJobs.map((element) => {
                  return (
                    <div className="card" key={element._id}>
                      <div className="content">
                        <div className="short_fields">
                          <div>
                            <span>Title :</span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.title}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <span>City :</span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.city}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "city",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <span>Country :</span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.country}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "country",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <span>Category :</span>
                            <select
                              value={element.category}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "category",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                            >
                              <option value="Artificial Intelligence">
                                Artificial Intelligence
                              </option>
                              <option value="Data Analyst">Data Analyst</option>
                              <option value="Graphics Design">
                                Graphics Design
                              </option>
                              <option value="UI/UX Design">UI/UX Design</option>
                              <option value="Mobile App Development">
                                Mobile App Development
                              </option>
                              <option value="Frontend Web Development">
                                Frontend Web Development
                              </option>
                              <option value="MERN Stack Development">
                                MERN STACK Development
                              </option>
                              <option value="MEAN Stack Development">
                                MEAN STACK Development
                              </option>
                              <option value="Video Editing">
                                Video Editing
                              </option>
                              <option value="Data Entry Operator">
                                Data Mining
                              </option>
                            </select>
                          </div>
                          <div>
                            <span>
                              Salary :
                              <br/>
                              {element.fixedSalary ? (
                                <input
                                  type="number"
                                  value={element.fixedSalary}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "fixedSalary",
                                      e.target.value
                                    )
                                  }
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                />
                              ) : (
                                <div>
                                  <input
                                    type="number"
                                    value={element.salaryFrom}
                                    onChange={(e) =>
                                      handleInputChange(
                                        element._id,
                                        "salaryFrom",
                                        e.target.value
                                      )
                                    }
                                    disabled={
                                      editingMode !== element._id ? true : false
                                    }
                                  />
                                  <input
                                    type="number"
                                    value={element.salaryTo}
                                    onChange={(e) =>
                                      handleInputChange(
                                        element._id,
                                        "salaryTo",
                                        e.target.value
                                      )
                                    }
                                    disabled={
                                      editingMode !== element._id ? true : false
                                    }
                                  />
                                </div>
                              )}
                            </span>
                          </div>

                          <div>
                          {" "}
                          <span>Expired :</span>
                          <select
                            value={element.expired}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "expired",
                                e.target.value
                              )
                            }
                            disabled={
                              editingMode !== element._id ? true : false
                            }
                          >
                            <option value={true}>True</option>
                            <option value={false}>False</option>
                          </select>
                        </div>
                      </div>

                        <div className="long_field">
                          <div>
                            <span>Description :</span>
                            <textarea
                              rows="2"
                              value={element.description?element.description:"Not Provided"}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "description",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                            />
                          </div>

                          <div>
                            <span>Location :</span>
                            <textarea
                              rows="1"
                              value={element.location}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "location",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="button_wrapper">
                        <div className="edit_btn_wrapper">
                          {editingMode === element._id ? (
                            <>
                              <button
                                onClick={() => handleUpdateJob(element._id)}
                                className="check_btn"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={() => handleDisableEdit()}
                                className="cross_btn"
                              >
                                <RxCross2 />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleEnableEdit(element._id)}
                              className="edit_btn"
                            >
                              Update Job
                            </button>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteJob(element._id)}
                          className="delete_btn"
                        >
                          Delete Job
                        </button>
                      </div>
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
        <ScrollToTopButton/>
      </div>
    </>
  );
};

export default MyJobs;
