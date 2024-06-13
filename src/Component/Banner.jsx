import React, { useState } from "react";
import "../CssFiles/Banner.css";
import { FiMapPin, FiSearch } from "react-icons/fi";

const Banner = ({searchBoxInput,inputChangeHandler}) => {

  return (
    <div className="max-w-screen-2xl container xl:px-14 px-4 md:py-12 py-14 ">
      <h1 className="text-5xl font-bold text-primary">
        Find a <span className="text-sky">new job </span>today
      </h1>
      <p className="mt-4 text-black/60">
        Thousands of job opportunities are waiting for you. Grab your
        opportunities now.
      </p>

      <form className="mt-8">
        <div className="flex justify-start md:flex-row flex-col md:gap-2 gap-4">
          <div className="flex rounded-md w-full md:w-1/2">
            <FiSearch className="absolute mt-3 ml-3 text-gray-400" />
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Search for your desired jobs"
              className="Glow flex-1 py-2 pl-8 pr-6 text-gray-900 rounded-lg placeholder:text-gray-400 sm:text-sm sm:leading-6 "
              onChange={inputChangeHandler}
              value={searchBoxInput}
            />
          </div>
          <div className="flex rounded-md w-full md:w-1/3 ">
            <FiMapPin className="absolute mt-3 ml-3 text-gray-400" />
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter job location"
              className="Glow flex-1 py-2 pl-8 pr-6 text-gray-900 rounded-lg placeholder:text-gray-400 sm:text-sm sm:leading-6 "
            />
          </div>
          <button type="submit" className=" bg-sky py-2 ml-2 px-6 text-white rounded-lg tracking-widest hover:bg-blue-700">Search</button>
        </div>
      </form>
    </div>
  );
};

export default Banner;
