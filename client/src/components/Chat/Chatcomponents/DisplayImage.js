import React from "react";

export default function DisplayImage(props) {
  const { imageUrl, link } = props.state.userData.propertyDetails;
  console.log(props.state.userData);

  return (
    <div className="img-component">
      <div className="img-container">
        <img src={imageUrl} alt="" />
      </div>
      <a href={link} target="_blank" rel="noreferrer">
        Property Details
      </a>
    </div>
  );
}
