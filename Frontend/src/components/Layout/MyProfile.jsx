import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import ScrollToTopButton from "../../components/ReturnToTop";
import ProfilePicture from "./ProfilePic";

const MyProfile = () => {
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white p-8 shadow-md rounded-lg flex flex-col items-center">
        <h2 className="text-2xl font-bold text-center mb-6">My Profile</h2>
        <div className="w-full flex flex-col gap-5">
          <div className="ml-64">
            <ProfilePicture />
          </div>

            <p className="text-lg font-bold text-green-800 mt-8 ml-36">
              Name: <span className="text-black font-medium"> {user.name}</span>
            </p>
            <p className="text-lg font-bold text-green-800 ml-36">
              Email Address:{" "}
              <span className="text-black font-medium">{user.email}</span>
            </p>
            <p className="text-lg font-bold text-green-800 ml-36">
              Phone Number:{" "}
              <span className="text-black font-medium">
                {user.phone ? user.phone : "Not Provided"}
              </span>
            </p>
            <p className="text-lg font-bold text-green-800 ml-36">
              Role: <span className="text-black font-medium">{user.role}</span>
            </p>
            <div className="mt-4 text-center">
              <Link
                to={`/updateProfile`}
                className="block w-40 mb-4 mx-auto py-2 text-lg font-medium text-white bg-green-700 rounded hover:bg-green-800 text-center"
              >
                Update Profile
              </Link>
            </div>
          </div>
      </div>
      <ScrollToTopButton />
    </section>
  );
};

export default MyProfile;
