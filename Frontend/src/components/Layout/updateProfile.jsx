import React, { useContext, useState } from "react";
import { Context } from "../../main";
import ScrollToTopButton from "../../components/ReturnToTop";
import axios from "axios";

const MyProfile = () => {
  const { isAuthorized, user, setUser } = useContext(Context);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    password: "",
    confirmPassword: "",
  });
  const [profilePic, setProfilePic] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("userId", user._id);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("confirmPassword", formData.confirmPassword);
      if (profilePic) formDataToSend.append("profilePic", profilePic);

      const { data } = await axios.put(
        "http://localhost:4000/api/v1/user/updateProfile",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setUser(data.user);
      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    }
  };

  if (!isAuthorized) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <section className="jobDetail page mb-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center">
              <label
                htmlFor="profilePic"
                className="block text-gray-700 font-bold mb-2"
              >
                Profile Picture
              </label>
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                accept="image/*"
                onChange={handleFileChange}
                className="border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
        <ScrollToTopButton />
      </div>
    </section>
  );
};

export default MyProfile;
