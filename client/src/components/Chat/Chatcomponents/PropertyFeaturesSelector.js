import React from "react";

const PropertyFeaturesSelector = (props) => {
  const selectPropertyFeatures = (features) => {
    props.parse(features); // Call the parse function with the selected property features
  };

  return (
    <div>
      <label htmlFor="property-features">Select Property Features:</label>
      <input
        type="text"
        id="property-features"
        placeholder="E.g., Number of bedrooms, location, amenities, etc."
        onChange={(e) => selectPropertyFeatures(e.target.value)}
      />
      <button
        className="submit-btn"
        onClick={() => selectPropertyFeatures("submit")}
      >
        Submit
      </button>
    </div>
  );
};

export default PropertyFeaturesSelector;
