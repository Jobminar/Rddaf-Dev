import React, { useReducer, useRef } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import "./Chat.css";

const initialState = {
  messages: [],
  inputText: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addMessage":
      return { ...state, messages: [...state.messages, action.payload] };
    case "setInputText":
      return { ...state, inputText: action.payload };
    default:
      return state;
  }
};

const handleButtonClick = (button, handleMessageSend) => {
  switch (button.actionType) {
    case "sendMessage":
      handleMessageSend(button.value);
      break;
    case "openModal":
      break;
    case "navigateToPage":
      break;

    default:
      break;
  }
};

const ChatMessage = ({ message, handleMessageSend }) => (
  <div className={`message ${message.type} yellow-gradient`}>
    <Typography variant="caption" style={{ color: "white" }}>
      {message.timestamp.toLocaleString()}
    </Typography>
    {renderMessageContent(message, handleMessageSend)}
  </div>
);

const renderMessageContent = (message, handleMessageSend) => {
  if (Array.isArray(message.text)) {
    // Handle array of objects (for specific intents with buttons)
    return renderButtons(message.text, handleMessageSend);
  } else {
    // Handle regular text response
    return (
      <Typography variant="body1" style={{ color: "white" }}>
        {message.text}
      </Typography>
    );
  }
};

const renderButtons = (buttons, handleMessageSend) => (
  <div className="button-container">
    {buttons.map((button, buttonIndex) => (
      <Button
        key={buttonIndex}
        variant="contained"
        color="primary"
        onClick={() => handleButtonClick(button, handleMessageSend)}
      >
        {button.text}
      </Button>
    ))}
  </div>
);

const Chatbot = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputTextRef = useRef(null);

  const handleInputChange = (event) => {
    const { value } = event.target;
    formik.handleChange(event);
    dispatch({ type: "setInputText", payload: value });
  };

  const handleMessageSend = async (inputText) => {
    dispatch({ type: "setInputText", payload: "" });

    try {
      const response = await fetch(`http://localhost:3000/chatbot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputText,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data || !data.response) {
        throw new Error("Invalid response format");
      }

      const chatbotResponse = data.response;

      // Dispatch the user's message
      dispatch({
        type: "addMessage",
        payload: {
          text: inputText,
          type: "user",
          timestamp: new Date(),
        },
      });

      // Dispatch the bot's response based on intent
      const botMessage = {
        text: chatbotResponse,
        type: "bot",
        timestamp: new Date(),
      };

      if (Array.isArray(chatbotResponse)) {
        // If response is an array, assume buttons
        botMessage.buttons = chatbotResponse;
      }

      dispatch({
        type: "addMessage",
        payload: botMessage,
      });
    } catch (error) {
      console.error("Error sending message:", error.message);
      // Handle error gracefully, e.g., show an error message in the UI
    }
  };

  const formik = useFormik({
    initialValues: { inputText: state.inputText },
    onSubmit: async (values) => {
      try {
        await handleMessageSend(values.inputText);
        formik.setFieldValue("inputText", "");
        inputTextRef.current.focus();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
  });

  return (
    <div className="chatbot-container">
      <Card className="chatbot-messages">
        <CardContent>
          {state.messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              handleMessageSend={handleMessageSend}
            />
          ))}
        </CardContent>
      </Card>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          {...formik.getFieldProps("inputText")}
          label="Type your message..."
          variant="outlined"
          fullWidth
          margin="normal"
          inputRef={inputTextRef}
          onChange={handleInputChange}
          inputProps={{
            style: { background: "white", borderRadius: "5px" },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={formik.isSubmitting}
          style={{ marginTop: "10px" }}
        >
          <SendIcon />
        </Button>
      </form>
    </div>
  );
};

export default Chatbot;
