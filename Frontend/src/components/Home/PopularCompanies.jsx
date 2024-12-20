import React from "react";
import {
  FaMicrosoft,
  FaApple,
  FaFacebook,
  FaAmazon,
  FaGoogle,
  FaInstagram,
} from "react-icons/fa";
import { FaLinkedin, FaLinkedinIn } from "react-icons/fa6";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 7,
      title: "Google",
      location: "Amsterdam, Netherlands",
      description: "Innovative tech solutions and services.",
      icon: <FaGoogle />,
    },
    {
      id: 1,
      title: "Microsoft",
      location: "Chennai, India",
      description: "Empowering businesses with software.",
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Adelaide, Australia",
      description: "Revolutionizing the automotive industry.",
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "California, USA",
      description: "Innovative devices and seamless experiences.",
      icon: <FaApple />,
    },
    {
      id: 4,
      title: "Facebook",
      location: "California, USA",
      description: "Connecting people across the globe.",
      icon: <FaFacebook />,
    },
    {
      id: 5,
      title: "LinkedIn",
      location: "Bangalore, India",
      description: "Professional networking made easy.",
      icon: <FaLinkedinIn />,
    },
    {
      id: 6,
      title: "Amazon",
      location: "Delhi, India",
      description: "Global leader in e-commerce and cloud computing.",
      icon: <FaAmazon />,
    },
    {
      id: 8,
      title: "Instagram",
      location: "California, USA",
      description: "Share moments through photos and videos.",
      icon: <FaInstagram />,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3 className="font-semibold">Popular Companies</h3>
        <div className="banner gap-8">
          {companies.map((element) => {
            return (
              <div
                className="mb-12 mr-4 card bg-white shadow-lg rounded-lg p-6"
                key={element.id}
              >
                <div className="content flex flex-col items-center text-center">
                  <div className="flex flex-row">
                    <span className="icon text-4xl text-blue-500 mb-2">
                      {element.icon}
                    </span>
                    <span>
                      <p className="font-bold text-xl mt-2 ml-4">
                        {element.title}
                      </p>
                    </span>
                  </div>

                  <div className="text">
                    <p className="text-gray-600 mb-2">{element.location}</p>
                    <p className="text-gray-500 text-sm">
                      {element.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
