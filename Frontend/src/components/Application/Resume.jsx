import React from "react";

const Resume = ({ imageUrl, onClose }) => {
  return (
    <>
      <div className="resume-modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <img src={imageUrl} alt="Resume" />
        </div>
      </div>
    </>
  );
};

export default Resume;
