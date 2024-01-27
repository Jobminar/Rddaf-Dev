import React from "react";

export default function StartBtn(props) {
  const startPropertyManagement = () => {
    props.actions.initialAction();
  };

  return (
    <div>
      <button className="start-btn" onClick={() => startPropertyManagement()}>
        Start Property Management
      </button>
    </div>
  );
}
