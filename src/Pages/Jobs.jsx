import React from "react";

const Jobs = ({ results }) => {
  return (
    <>
      <div>
        {
          <h3 className="ml-6 text-lg text-primary/80 font-bold mb-8">
            {results.length} Jobs Found
          </h3>
        }
      </div>
      <section>{results}</section>
    </>
  );
};

export default Jobs;
