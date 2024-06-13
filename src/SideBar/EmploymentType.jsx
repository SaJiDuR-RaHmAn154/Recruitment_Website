import React from "react";
import InputField from "../Component/InputField";

const EmploymentType = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Type of Employment</h4>
      <div className="py-2 px-2 w-48">
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            id="test"
            value=""
            onChange={handleChange}
          />
          <span className="checkmark"></span> All
        </label>

        <InputField
          handleChange={handleChange}
          value="Full-time"
          title="Full-Time"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Temporary"
          title="Temporary"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Part-time"
          title="Part-Time"
          name="test"
        />
      </div>
    </div>
  );
};

export default EmploymentType;
