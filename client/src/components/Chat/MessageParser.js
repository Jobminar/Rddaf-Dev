import React from "react";

const MessageParser = ({ children, actions }) => {
  const { checker } = children.props.state;
  const parse = (message) => {
    if (checker === "query") {
      actions.afterNameMessage();
      children.props.state.userData.name = message;
    }

    if (checker === "purpose") {
      actions.afterPurposeMessage();
      children.props.state.userData.purpose = message;
    }

    if (checker === "preference") {
      actions.afterPreferenceMessage();
      children.props.state.userData.propertyType = message;
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
