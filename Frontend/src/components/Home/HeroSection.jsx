import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "35,700",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "81,570",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1 className="text-5xl font-bold mb-1">
              Find a <span className="text-[#0369a1]">new</span> job today
            </h1>
            <p className="mt-4 text-black/60">
              Thousands of job opportunities are waiting for you. Grab your
              opportunity now.
            </p>
          </div>
          <div className="image">
            <img src="/heroS.jpg" alt="hero" />
          </div>
        </div>
        {/* <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p className="font-semibold">{element.title}</p>
                  <p className="text-black/60 mt-[5px] text-lg">{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div> */}
      </div>
    </>
  );
};

export default HeroSection;
