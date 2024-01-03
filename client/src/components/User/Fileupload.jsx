import React, { useState } from "react";
import "./FileInputComponent.css";
import uploadlogo from "./upload.png";

const FileInputComponent = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleFileChange = (event) => {
    // Check if a file is selected
    setIsChecked(event.target.files.length > 0);
  };

  return (
    <label className="file-input-container">
      <input type="file" className="file-input" onChange={handleFileChange} />
      <div className="upload-icon-container">
        <img src={uploadlogo} alt="Upload" className="upload-icon" />
      </div>
      <input
        type="checkbox"
        className="file-checkbox"
        checked={isChecked}
        disabled
      />
    </label>
  );
};

export default FileInputComponent;
