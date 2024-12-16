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
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      navigateTo("/job/getAll");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <div className="application_form page py-8 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Application Form</h2>
        <form onSubmit={handleApplication} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="name" className="block font-semibold">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name here"
              className="w-full border bg-white border-gray-300 p-2"
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block font-semibold">
              Your Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full border bg-white border-gray-300 p-2"
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="address" className="block font-semibold">
              Your Address <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="w-full border border-gray-300 p-2"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="phone" className="block font-semibold">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 p-2"
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="coverLetter" className="block font-semibold">
              Cover Letter <span className="text-gray-500">(Optional)</span>
            </label>
            <textarea
              id="coverLetter"
              rows="2"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Write your cover letter here"
              className="w-full border border-gray-300 p-2"
            ></textarea>
          </div>

          <div className="space-y-1">
            <label htmlFor="resume" className="block font-semibold">
              Upload Resume <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="resume"
              accept=".jpg, .png, .webp, .pdf, .docx"
              onChange={handleFileChange}
              className="w-full border border-gray-300 p-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default Application;
