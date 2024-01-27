import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, TextField, Typography } from "@mui/material";

const PropDetails = ({ onChange, values }) => {
  // Define initial state based on the provided schema
  const [propertyDimensions, setPropertyDimensions] = useState({
    reception: {
      length: values?.propertyDimensions?.reception?.length || "",
      width: values?.propertyDimensions?.reception?.width || "",
    },
    kitchen: {
      length: values?.propertyDimensions?.kitchen?.length || "",
      width: values?.propertyDimensions?.kitchen?.width || "",
    },
    masterBedroom: {
      length: values?.propertyDimensions?.masterBedroom?.length || "",
      width: values?.propertyDimensions?.masterBedroom?.width || "",
    },
    bedroom: {
      length: values?.propertyDimensions?.bedroom?.length || "",
      width: values?.propertyDimensions?.bedroom?.width || "",
    },
  });

  const [nearby, setNearby] = useState({
    hospital: {
      distance: values?.nearby?.hospital?.distance || "",
      name: values?.nearby?.hospital?.name || "",
    },
    school: {
      distance: values?.nearby?.school?.distance || "",
      name: values?.nearby?.school?.name || "",
    },
    busStation: {
      distance: values?.nearby?.busStation?.distance || "",
      name: values?.nearby?.busStation?.name || "",
    },
  });

  const [noOfBedrooms, setNoOfBedrooms] = useState(values?.noOfBedrooms || "");
  const [noOfBathrooms, setNoOfBathrooms] = useState(
    values?.noOfBathrooms || ""
  );
  const [noOfToilets, setNoOfToilets] = useState(values?.noOfToilets || "");
  const [parkingCapacity, setParkingCapacity] = useState(
    values?.parkingCapacity || ""
  );

  const handleChange = (name, value) => {
    if (onChange) {
      onChange(name, value);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Property Dimensions */}
      {Object.entries(propertyDimensions).map(([room, dimensions]) => (
        <React.Fragment key={room}>
          <Typography variant="h6">{room} Dimensions</Typography>
          <TextField
            label={`${room} Length`}
            type="number"
            value={dimensions.length}
            onChange={(e) => {
              const newValue = e.target.value;
              setPropertyDimensions({
                ...propertyDimensions,
                [room]: { ...dimensions, length: newValue },
              });
              handleChange(`${room}.length`, newValue);
            }}
          />
          <TextField
            label={`${room} Width`}
            type="number"
            value={dimensions.width}
            onChange={(e) => {
              const newValue = e.target.value;
              setPropertyDimensions({
                ...propertyDimensions,
                [room]: { ...dimensions, width: newValue },
              });
              handleChange(`${room}.width`, newValue);
            }}
          />
        </React.Fragment>
      ))}

      {/* Nearby Amenities */}
      {Object.entries(nearby).map(([amenity, details]) => (
        <React.Fragment key={amenity}>
          <Typography variant="h6">{amenity} Details</Typography>
          <TextField
            label={`${amenity} Distance`}
            type="number"
            value={details.distance}
            onChange={(e) => {
              const newValue = e.target.value;
              setNearby({
                ...nearby,
                [amenity]: { ...details, distance: newValue },
              });
              handleChange(`${amenity}.distance`, newValue);
            }}
          />
          <TextField
            label={`${amenity} Name`}
            type="text"
            value={details.name}
            onChange={(e) => {
              const newValue = e.target.value;
              setNearby({
                ...nearby,
                [amenity]: { ...details, name: newValue },
              });
              handleChange(`${amenity}.name`, newValue);
            }}
          />
        </React.Fragment>
      ))}

      {/* Other Details */}
      <TextField
        label="Number of Bedrooms"
        type="number"
        value={noOfBedrooms}
        onChange={(e) => {
          const newValue = e.target.value;
          setNoOfBedrooms(newValue);
          handleChange("noOfBedrooms", newValue);
        }}
      />

      <TextField
        label="Number of Bathrooms"
        type="number"
        value={noOfBathrooms}
        onChange={(e) => {
          const newValue = e.target.value;
          setNoOfBathrooms(newValue);
          handleChange("noOfBathrooms", newValue);
        }}
      />

      <TextField
        label="Number of Toilets"
        type="number"
        value={noOfToilets}
        onChange={(e) => {
          const newValue = e.target.value;
          setNoOfToilets(newValue);
          handleChange("noOfToilets", newValue);
        }}
      />

      <TextField
        label="Parking Capacity"
        type="number"
        value={parkingCapacity}
        onChange={(e) => {
          const newValue = e.target.value;
          setParkingCapacity(newValue);
          handleChange("parkingCapacity", newValue);
        }}
      />

      {/* Values Display */}
      {values && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Values</Typography>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
};

// Define PropTypes
PropDetails.propTypes = {
  onChange: PropTypes.func,
  values: PropTypes.object.isRequired,
};

export default PropDetails;
