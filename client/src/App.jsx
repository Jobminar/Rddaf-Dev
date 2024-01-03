import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home"; // Import your Home component
import SignUpLogin from "./components/Login/SignUpLogin";
import ListingProp from "./components/User/Property/ListingProp";

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<SignUpLogin />} />
        <Route path="/listingproperty" element={<ListingProp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
