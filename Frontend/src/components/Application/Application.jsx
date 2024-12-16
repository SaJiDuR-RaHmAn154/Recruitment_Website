import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  const handleFileChange = (e) => {
    const resume = e.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data", // For storing resume and text data together
          },
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume("");
      navigateTo('/job/getAll');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo('/');
  }

  return (
    <>
      <section className="application">
        <div className="container">
          <h2 className="text-3xl font-bold mb-6 text-center">Application Form</h2>
          <form onSubmit={handleApplication}>
            <input
              type="text"
              placeholder="Your Name (Required)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your email address (Required)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your address (Optional)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your phone number (Required)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <textarea
              rows="2"
              placeholder="Cover Letter (Optional)"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />
            <div>
              <label
                style={{
                  textAlign: "start",
                  display: "block",
                  fontSize: "20px",
                }}
              >
                Select Resume
              </label>
              <input
                type="file"
                accept=".jpg, .png, .webp"
                onChange={handleFileChange}
                style={{ width: "100%" }}
              />
            </div>
            <button type="submit">Submit Application</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Application;
