import React, { useState } from "react";

import PropTypes from "prop-types";
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";

const SpecialCondition = ({ onChange, values }) => {
  const [streetParking, setStreetParking] = useState(
    values.streetParking || false
  );
  const [rearGarden, setRearGarden] = useState(values.rearGarden || false);
  const [gasCentralheating, setGasCentralHeating] = useState(
    values.gasCentralheating || false
  );
  const [doubleGlazed, setDoubleGlazed] = useState(
    values.doubleGlazed || false
  );
  const [Epc, setEpc] = useState(values.Epc || false);
  const [deleteFlag, setDeleteFlag] = useState(values.deleteFlag || false);
  const [price, setPrice] = useState(0); // Initialize with a default value
  const [place, setPlace] = useState("");
  const handleChange = (name, value) => {
    if (onChange) onChange(name, value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Price */}
      <TextField
        label="Price"
        type="number"
        name="price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
          handleChange("price", e.target.value);
        }}
      />
      <TextField
        label="Place"
        type="text"
        name="place"
        value={place}
        onChange={(e) => {
          setPlace(e.target.value);
          handleChange("place", e.target.value);
        }}
      />
      {/* Street Parking */}
      <FormControlLabel
        control={
          <Checkbox
            name="streetParking"
            checked={streetParking}
            onChange={(e) => {
              setStreetParking(e.target.checked);
              handleChange("streetParking", e.target.checked);
            }}
          />
        }
        label="Street Parking"
      />
      {/* Rear Garden */}
      <FormControlLabel
        control={
          <Checkbox
            name="rearGarden"
            checked={rearGarden}
            onChange={(e) => {
              setRearGarden(e.target.checked);
              handleChange("rearGarden", e.target.checked);
            }}
          />
        }
        label="Rear Garden"
      />
      {/* Gas Central Heating */}
      <FormControlLabel
        control={
          <Checkbox
            name="gasCentralheating"
            checked={gasCentralheating}
            onChange={(e) => {
              setGasCentralHeating(e.target.checked);
              handleChange("gasCentralheating", e.target.checked);
            }}
          />
        }
        label="Gas Central Heating"
      />
      {/* Double Glazed */}
      <FormControlLabel
        control={
          <Checkbox
            name="doubleGlazed"
            checked={doubleGlazed}
            onChange={(e) => {
              setDoubleGlazed(e.target.checked);
              handleChange("doubleGlazed", e.target.checked);
            }}
          />
        }
        label="Double Glazed"
      />
      {/* Epc */}
      <FormControlLabel
        control={
          <Checkbox
            name="Epc"
            checked={Epc}
            onChange={(e) => {
              setEpc(e.target.checked);
              handleChange("Epc", e.target.checked);
            }}
          />
        }
        label="Epc"
      />
      {/* Delete Flag */}
      <FormControlLabel
        control={
          <Checkbox
            name="deleteFlag"
            checked={deleteFlag}
            onChange={(e) => {
              setDeleteFlag(e.target.checked);
              handleChange("deleteFlag", e.target.checked);
            }}
          />
        }
        label="Delete Flag"
      />
      {/* Schedule Date Time */}
      <input
        type="date"
        name="scheduleDateTime"
        value={values.scheduleDateTime}
        onChange={(e) => handleChange("scheduleDateTime", e.target.value)}
      />
      {/* Created On */}
      const currentDateTimeUK =
      moment().utcOffset(0).format("YYYY-MM-DDTHH:mm:ss.sssZ");
      {/* You can access values and other props */}
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
SpecialCondition.propTypes = {
  onChange: PropTypes.func,
  values: PropTypes.object.isRequired,
};

export default SpecialCondition;
