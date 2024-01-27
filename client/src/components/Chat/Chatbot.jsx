import React from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./config.js";
import MessageParser from "./MessageParser.js";
import ActionProvider from "./ActionProvider.js";
import "./Chat.css";
const ChatbotComp = () => {
  return (
    <div className="chat-con">
      <Chatbot
        actionProvider={ActionProvider}
        messageParser={MessageParser}
        config={config}
        headerText="Raddaf Assistant"
        placeholderText="Say Hii"
        runInitialMessagesWithHistory
        disableScrollToBottom
      />
    </div>
  );
};

export default ChatbotComp;
