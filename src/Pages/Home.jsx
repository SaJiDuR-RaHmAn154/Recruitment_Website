import { useEffect, useState } from "react";
import Banner from "../Component/Banner";
import Jobs from "./Jobs";
import Card from "../Component/Card";
import Sidebar from "../SideBar/Sidebar";
import NewsLetter from "../Component/NewsLetter";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  //  Fetching job details from job.json file
  useEffect(() => {
    setIsLoading(true);
    fetch("jobs.json")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false); //After extrating the whole data from the file/database
      });
  }, []);

  //  useState for controlling searchBox inputs
  const [searchBoxInput, setSearchBoxInput] = useState("");

  const inputChangeHandler = (event) => {
    setSearchBoxInput(event.target.value);
  };

  //  Filtering jobs using job titles
  const filteredItems = jobs.filter((job) => 
    job.jobTitle.toLowerCase().indexOf(searchBoxInput.toLowerCase()) !== -1 
  );

  // Radio button filtering
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Button based filtering
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Page range
  const calculatePageRange = () => {
    const startingIndex = (currentPage - 1) * itemsPerPage;
    const endingIndex = startingIndex + itemsPerPage;
    return { startingIndex, endingIndex };
  };

  // Next page function
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Previous page function
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // main function
  const filteredData = (jobs, selected, searchBoxInput) => {
    let filteredJobs = jobs;

    // filtering search box jobs
    if (searchBoxInput) {
      filteredJobs = filteredItems;
    }
    // Other filterings
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) =>
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selected) ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          experienceLevel.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase() ||
          postingDate >= selected
      );
    }
    // Grouping data for currentPage
    const { startingIndex, endingIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startingIndex, endingIndex);

    return filteredJobs.map((data, index) => <Card key={index} data={data} />);
  };

  // calling the main function
  const results = filteredData(jobs, selectedCategory, searchBoxInput);

  return (
    <>
      {/* Passed the props received from Banner component */}
      <Banner
        searchBoxInput={searchBoxInput}
        inputChangeHandler={inputChangeHandler}
      />

      {/* main contents */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-2">

        {/* Left Side */}
        <div className="bg-white mt-3 pl-3 rounded-2xl">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/* Job post cards */}
        <div className="col-span-2 bg-white p-4 mt-3 rounded-sm">
          {isLoading ? (
            <p className="font-lg">Loading....</p>
          ) : results.length > 0 ? (
            <Jobs results={results} />
          ) : (
            <>
              <h3 className="text-lg text-primary font-bold mb-1">0 Jobs</h3>
              <p className="text-primary/75">No data found!</p>
            </>
          )}

          {/* Pagination */}
          {results.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                onClick={prevPage}
                disabled={currentPage == 1}
                className="hover:underline"
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage == Math.ceil(filteredItems.length / itemsPerPage)
                }
                className="hover:underline"
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Right side*/}
        <div className="bg-white mt-4 pl-4 rounded text-left">
        <NewsLetter/>
        </div>
      </div>
    </>
  );
};

export default Home;
