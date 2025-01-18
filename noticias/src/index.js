import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import News from "./components/News/News";
import Weather from "./components/Weather/Weather";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
