import React from "react";

const PropertyTypeSelector = (props) => {
  const selectPropertyType = (propertyType) => {
    props.parse(propertyType); // Call the parse function with the selected property type
  };

  return (
    <div>
      <button
        className="property-type-btn"
        onClick={() => selectPropertyType("residential")}
      >
        Residential
      </button>
      <button
        className="property-type-btn"
        onClick={() => selectPropertyType("commercial")}
      >
        Commercial
      </button>
    </div>
  );
};

export default PropertyTypeSelector;
