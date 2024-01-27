import React, { useState, useEffect, useRef } from "react";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import Button from "@mui/material/Button";
import "./Chat.css";
import ChatbotComp from "./Chatbot";

const FloatingChatIcon = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const buttonContainerRef = useRef(null);

  useEffect(() => {
    // Add wiggle animation on page load
    buttonContainerRef.current.style.animation =
      "wiggle 1s ease-in-out infinite";

    // Cleanup function to remove wiggle animation after 1 second
    const timeoutId = setTimeout(() => {
      buttonContainerRef.current.style.animation = "";
    }, 1000);

    // Clear the timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, []);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div ref={buttonContainerRef} className="button-container">
      {/* Floating Chat Icon */}
      <Button
        variant="contained"
        color="primary"
        onClick={toggleChatbot}
        style={{
          background: "linear-gradient(to bottom right, #ffd700, #8b6914)",
          color: "white", // Change the text color to white for better contrast
        }}
      >
        <LiveHelpIcon style={{ color: "gold" }} />
      </Button>

      {isChatbotOpen && <ChatbotComp toggleChatbot={toggleChatbot} />}
    </div>
  );
};

export default FloatingChatIcon;
