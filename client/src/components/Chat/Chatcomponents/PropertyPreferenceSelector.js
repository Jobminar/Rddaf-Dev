import React from "react";

export default function PropertyPreferenceSelector(props) {
  const selectPreference = (preference) => {
    const { name, purpose } = props.state.userData;
    const propertyType = props.state.userData.propertyType;
    const property = props.state.data[purpose][propertyType][preference];
    props.state.userData.propertyDetails = property;
    props.actions.finalResult(name, purpose, preference, property.name);
  };

  return (
    <div>
      <button
        className="preference-btn"
        onClick={() => selectPreference("fast")}
      >
        Sale
      </button>
      <button
        className="preference-btn slow-btn"
        onClick={() => selectPreference("slow")}
      >
        Tolet
      </button>
    </div>
  );
}
