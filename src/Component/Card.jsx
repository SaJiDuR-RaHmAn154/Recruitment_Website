import React from "react";
import { Link } from "react-router-dom";
import {FiCalendar, FiClock, FiDollarSign, FiMapPin} from "react-icons/fi";
import '../CssFiles/Card.css'
const Card = ({ data }) => {
  const {
    companyName,
    jobTitle,
    companyLogo,
    minPrice,
    maxPrice,
    jobLocation,
    employmentType,
    postingDate,
    description,
  } = data;

  return (
    <section className="box card">
      <Link to={"/"} className="flex gap-4 mb-3 flex-col sm:flex-row items-start">
        <img src={companyLogo} />
        <div>
          <h3 className="text-lg font-semibold mb-1">{jobTitle}</h3>
          <h4 className="text-primary mb-1">{companyName}</h4>
        <div className="text-primary/75 flex flex-wrap mb-2">
            <span className="flex items-center gap-1 mr-2"><FiMapPin/>{jobLocation}</span>
            <span className="flex items-center gap-1 mr-2"><FiClock/>{employmentType}</span>
            <span className="flex items-center gap-1 mr-2"><FiDollarSign/>{minPrice}-{maxPrice}k</span>
            <span className="flex items-center gap-1"><FiCalendar/>{postingDate}</span>
        </div>
        <p className="text-primary/70 pb-2">{description}</p>
        </div>
      </Link>
    </section>
  );
};

export default Card;
