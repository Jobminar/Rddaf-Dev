import { createChatBotMessage } from "react-chatbot-kit";
import Avatar from "./Chatcomponents/Avatar";
import StartBtn from "./Chatcomponents/StartBtn";
import PropertyTypeSelector from "./Chatcomponents/PropertyTypeSelector"; // New component
import PropertyPreferenceSelector from "./Chatcomponents/PropertyPreferenceSelector"; // New component
import PropertyFeaturesSelector from "./Chatcomponents/PropertyFeaturesSelector"; // New component
import DisplayImage from "./Chatcomponents/DisplayImage";
import data from "./data";

const config = {
  botName: "Raddaf Assistant",
  initialMessages: [
    createChatBotMessage(
      `Hello! Welcome to Raddaf Property Management. What can I assist you with today?`,
      {
        widget: "propertyTypeSelector",
      }
    ),
  ],
  customComponents: {
    botAvatar: (props) => <Avatar {...props} />,
  },
  state: {
    checker: null,
    data,
    userData: {
      name: "",
      phoneNumber: 0,
      purpose: "", // Updated from 'purpose' to 'propertyType'
      propertyDetails: {
        Description: "",
        link: "",
        imageUrl: "",
      },
    },
  },
  widgets: [
    {
      widgetName: "startBtn",
      widgetFunc: (props) => <StartBtn {...props} />,
    },
    {
      widgetName: "propertyTypeSelector", // Updated from 'startSlow' to 'propertyTypeSelector'
      widgetFunc: (props) => <PropertyTypeSelector {...props} />,
    },
    {
      widgetName: "propertyPreferenceSelector", // New widget for property preference selection
      widgetFunc: (props) => <PropertyPreferenceSelector {...props} />,
    },
    {
      widgetName: "propertyFeaturesSelector", // New widget for property features selection
      widgetFunc: (props) => <PropertyFeaturesSelector {...props} />,
    },
    {
      widgetName: "finalImage",
      widgetFunc: (props) => <DisplayImage {...props} />,
    },
  ],
};

export default config;
