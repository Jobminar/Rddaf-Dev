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

const handleButtonClick = (buttonValue, handleMessageSend) => {
  handleMessageSend(buttonValue);
};

const ChatMessage = ({ message, handleMessageSend }) => (
  <div className={`message ${message.type} yellow-gradient`}>
    <Typography variant="caption" style={{ color: "white" }}>
      {message.timestamp.toLocaleString()}
    </Typography>
    <Typography variant="body1" style={{ color: "white" }}>
      {message.text}
    </Typography>
    {message.buttons && (
      <div className="button-container">
        {message.buttons.map((button, buttonIndex) => (
          <Button
            key={buttonIndex}
            variant="contained"
            color="primary"
            onClick={() => handleButtonClick(button.value, handleMessageSend)}
          >
            {button.text}
          </Button>
        ))}
      </div>
    )}
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

      // Dispatch the bot's response
      dispatch({
        type: "addMessage",
        payload: {
          text: chatbotResponse,
          type: "bot",
          timestamp: new Date(),
          buttons: data.buttons || [], // Ensure buttons is an array
        },
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
