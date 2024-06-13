import React from "react";
import InputField from "../Component/InputField";

const JobPostingData = ({ handleChange }) => {
  // Current Time
  const now = new Date();
  // 24h ago
  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
  // 7 days ago
  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  //  30 days ago
  const oneMonthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  // converting date to string as json file data is in string format
  const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0,10);
  const sevenDaysAgoDate = sevenDaysAgo.toISOString().slice(0,10);
  const oneMonthAgoDate = oneMonthAgo.toISOString().slice(0,10);
 
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Date of posting</h4>
      <div className="py-2 px-2 w-48">
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            id="test"
            value=""
            onChange={handleChange}
          />
          <span className="checkmark"></span> All time
        </label>

        <InputField
          handleChange={handleChange}
          value={twentyFourHoursAgoDate}
          title="Last 24 hours"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value={sevenDaysAgoDate}
          title="7 days ago"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value={oneMonthAgoDate}
          title="Last month"
          name="test"
        />
      </div>
    </div>
  );
};

export default JobPostingData;
