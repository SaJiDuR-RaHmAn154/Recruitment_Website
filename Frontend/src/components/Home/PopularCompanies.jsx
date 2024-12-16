import React from "react";
import { FaMicrosoft, FaApple, FaFacebook, FaAmazon, FaGoogle, FaInstagram } from "react-icons/fa";
import { FaLinkedin, FaLinkedinIn } from "react-icons/fa6";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 7,
      title: "Google",
      location: "Amsterdam, Netherlands",
      VacantPositions: 5,
      icon: <FaGoogle />,
    },
    {
      id: 1,
      title: "Microsoft",
      location: "Chennai, India",
      VacantPositions: 7,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Adelaide, Australia",
      VacantPositions: 4,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "California, USA",
      VacantPositions: 10,
      icon: <FaApple />,
    },
    {
      id: 4,
      title: "Facebook",
      location: "California, USA",
      VacantPositions: 5,
      icon: <FaFacebook />,
    },
    {
      id: 5,
      title: "LinkedIn",
      location: "Bangalore, India",
      VacantPositions: 8,
      icon: <FaLinkedinIn/>,
    },
    {
      id: 6,
      title: "Amazon",
      location: "New Delhi, India",
      VacantPositions: 12,
      icon: <FaAmazon/>,
    },
    {
      id: 8,
      title: "Instagram",
      location: "California, USA",
      VacantPositions: 5,
      icon: <FaInstagram/>,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <h3 className="font-semibold">Popular Companies</h3>
        <div className="banner">
          {companies.map((element) => {
            return (
              <div className="mb-12 mr-4 card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Vacant Positions: {element.VacantPositions}</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
