import React, { useState } from "react";
import {
  Button,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";
import PropTypes from "prop-types";

const DocUpload = ({ onChange, values }) => {
  // State to store the selected files
  const [files, setFiles] = useState({});
  const [userType, setUserType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [propertyType, setPropertyType] = useState([]);
  const [isVerified, setIsVerified] = useState(false);

  // Function to handle file change event
  const handleFileChange = (name, event) => {
    // Update the files state with the selected file
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: event.target.files[0],
    }));
  };

  // Function to handle changes in additional fields
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    // Check if the input field is a checkbox
    const fieldValue = type === "checkbox" ? checked : value;

    setFieldValue(name, fieldValue);

    // If values are provided, update them as well
    if (values) {
      const updatedValues = {
        ...values,
        [name]: fieldValue,
      };

      // Call the parent component's onChange prop with updated values
      if (onChange) {
        onChange(updatedValues);
      }
    }
  };

  // Function to set a field value in state
  const setFieldValue = (name, value) => {
    switch (name) {
      case "userType":
        setUserType(value);
        break;
      case "purpose":
        setPurpose(value);
        break;
      case "propertyType":
        setPropertyType(value.split(",")); // Handle multiple property types
        break;
      case "isVerified":
        setIsVerified(value);
        break;
      default:
        break;
    }
  };

  // The file names to display as buttons
  const fileNames = [
    "ImageUpload",
    "PropertyDocuments",
    "FittingAndContentsForm",
    "EnergyPerformanceCertificate",
    "LeaseholdInformation",
    "PropertyInfoForm",
    "LocalAuthoritySearch",
    "Floorplan",
    "PropertyValuationReport",
  ];

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <Box sx={{ mt: 2 }}>
        <fieldset>
          <legend>User Type</legend>
          <div>
            <label>
              <input
                type="radio"
                name="userType"
                value="User"
                checked={userType === "User"}
                onChange={handleChange}
              />
              User
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="Agent"
                checked={userType === "Agent"}
                onChange={handleChange}
              />
              Agent
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Purpose</legend>
          <div>
            <label>
              <input
                type="radio"
                name="purpose"
                value="Sale"
                checked={purpose === "Sale"}
                onChange={handleChange}
              />
              Sale
            </label>
            <label>
              <input
                type="radio"
                name="purpose"
                value="Tolet"
                checked={purpose === "Tolet"}
                onChange={handleChange}
              />
              Tolet
            </label>
          </div>
        </fieldset>

        {/* Property Type remains as a multiple-select field */}

        <label>
          <input
            type="checkbox"
            name="isVerified"
            checked={isVerified}
            onChange={handleChange}
          />
          Is Verified
        </label>
      </Box>

      {fileNames.map((name) => (
        <Button variant="outlined" component="label" key={name}>
          {name}
          <input
            type="file"
            hidden
            onChange={(event) => handleFileChange(name, event)}
            accept={
              name === "ImageUpload"
                ? "image/jpg, image/jpeg, image/png"
                : undefined
            }
          />
        </Button>
      ))}

      {Object.keys(files).map((name) => (
        <p key={name}>
          Selected file for {name}: {files[name].name}
        </p>
      ))}
    </Box>
  );
};

DocUpload.propTypes = {
  onChange: PropTypes.func,
  values: PropTypes.object,
};

export default DocUpload;
