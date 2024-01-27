import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const initialAction = () => {
    const message = createChatBotMessage(
      "Hello! Welcome to our Raddaf Property Management Chatbot. Please provide your name to get started."
    );
    updateState(message, "query");
  };

  const afterNameMessage = () => {
    const message = createChatBotMessage(
      "Great! Now, let me know what you are looking for: Properties for Sale, Rental Listings, or Property Management Services?"
    );
    updateState(message, "purpose");
  };

  const afterPurposeMessage = () => {
    const message = createChatBotMessage(
      "Awesome choice! Now, could you tell me more about your preferences? Are you looking for a residential or commercial property?"
    );
    updateState(message, "preference");
  };

  const afterPreferenceMessage = () => {
    const message = createChatBotMessage(
      "What features are important to you? For example, number of bedrooms, location, amenities, etc.",
      {
        widget: "propertyFeatures",
      }
    );
    updateState(message);
  };

  const finalResult = (name, purpose, preference, propertyFeatures) => {
    const message = createChatBotMessage(
      `Thank you, ${name}! Based on your interest in ${purpose} and preferences for a ${preference} property with the following features: ${propertyFeatures}, we recommend some suitable options for you.And Our Agent will Contact you soon`,
      {
        widget: "propertyListings",
      }
    );
    updateState(message);
  };

  const updateState = (message, checker) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
      checker,
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            initialAction,
            afterNameMessage,
            afterPurposeMessage,
            afterPreferenceMessage,
            finalResult,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
