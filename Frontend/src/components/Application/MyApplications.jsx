import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ScrollToTopButton from "../../components/ReturnToTop";
import Resume from "./Resume";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/v1/application/employer/getAll", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/jobseeker/getAll", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const downloadCV = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "resume.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      toast.error("Failed to download the CV. Please try again.");
    }
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h2 className="text-3xl font-bold mb-6 text-center">
            My Applications
          </h2>
          {applications.length <= 0 ? (
            <>
              <h2 className="text-center mt-20 text-red-700">
                No Applications Found !!
              </h2>
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                  downloadCV={downloadCV}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Applications From Job Seekers
          </h2>
          {applications.length <= 0 ? (
            <>
              <h2 className="text-center mt-20 text-red-700">
                No Applications Found !!
              </h2>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                  downloadCV={downloadCV}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && <Resume imageUrl={resumeImageUrl} onClose={closeModal} />}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({
  element,
  deleteApplication,
  openModal,
  downloadCV,
}) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone ? element.phone : "Not Provided"}
          </p>
          <p>
            <span>Address:</span>{" "}
            {element.address ? element.address : "Not Provided"}
          </p>
          <p>
            <span>CoverLetter:</span>{" "}
            {element.coverLetter ? element.coverLetter : "Not Provided"}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div class="flex flex-col items-center justify-center">
          <button
            className="mt-2 bg-blue-500 text-white px-8 py-2 rounded mr-20 mb-4 hover:bg-blue-600"
            onClick={() => downloadCV(element.resume.url)}
          >
            Download CV
          </button>
          <button
            class="mt-2 bg-red-500 text-white px-4 py-2 rounded mr-20 mb-8 hover:bg-red-600"
            onClick={() => deleteApplication(element._id)}
          >
            Delete Application
          </button>
        </div>
      </div>
      <ScrollToTopButton />
    </>
  );
};

const EmployerCard = ({ element, openModal, downloadCV }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone ? element.phone : "Not Provided"}
          </p>
          <p>
            <span>Address:</span>{" "}
            {element.address ? element.address : "Not Provided"}
          </p>
          <p>
            <span>CoverLetter:</span>{" "}
            {element.coverLetter ? element.coverLetter : "Not Provided"}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <button
          className="mt-2 bg-blue-500 text-white px-8 py-2 rounded mr-20 mb-8 hover:bg-blue-600"
          onClick={() => downloadCV(element.resume.url)}
        >
          Download CV
        </button>
      </div>
      <ScrollToTopButton />
    </>
  );
};
