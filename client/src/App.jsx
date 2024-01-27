import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUpLogin from "./components/Login/SignUpLogin";
import ListingProp from "./components/User/Property/ListingProp";
import FloatingChatIcon from "./components/Chat/FloatingChatIcon"; // Adjust the import path based on your project structure
import PropSubmit from "./components/PropList/PropSubmit";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<SignUpLogin />} />
        <Route path="/listingproperty" element={<ListingProp />} />
        <Route path="/proplist" element={<PropSubmit />} />
      </Routes>

      {/* Render the floating chat icon component */}
      <FloatingChatIcon />
    </BrowserRouter>
  );
}

export default App;
