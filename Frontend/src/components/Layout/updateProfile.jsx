import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import ScrollToTopButton from "../../components/ReturnToTop";
import axios from "axios";
import toast from "react-hot-toast";

const MyProfile = () => {
  const { isAuthorized, user, setUser } = useContext(Context);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    newPassword: "",
    confirmPassword: "",
  });

  const [changePassword, setChangePassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = {
      userId: user._id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };
  
    if (changePassword) {
      formDataToSend.newPassword = formData.newPassword;
      formDataToSend.confirmPassword = formData.confirmPassword;
    }
  
    try {
      const { data } = await axios.put(
        "http://localhost:4000/api/v1/user/updateProfile",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Send cookies for authentication
        }
      );
  
      // Update user state and show success notification
      setUser(data.user);
      toast.success("Profile updated successfully");
      navigateTo("/profile");
    } catch (error) {
      // Handle error more effectively
      console.error("Update profile error:", error);
      const errorMessage = error.response?.data?.message || "Error updating profile";
      toast.error(errorMessage);
    }
  };
  

  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobDetail page mb-10">
      <div className="container mx-auto px-4 mt-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Update Profile</h2>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Name</label>
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
                Change Password?
              </label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="changePassword"
                    checked={changePassword}
                    onChange={() => setChangePassword(true)}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="changePassword"
                    checked={!changePassword}
                    onChange={() => setChangePassword(false)}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>

            {changePassword && (
              <>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
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
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                </div>
              </>
            )}

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-500 mt-4 w-full text-white font-bold py-3 rounded hover:bg-blue-700"
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
