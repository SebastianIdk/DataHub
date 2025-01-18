import React from "react";
import ReactDOM from "react-dom/client"; // Cambiar a 'react-dom/client' en React 18
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import News from "./components/News/News";
import Weather from "./components/Weather/Weather";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")); // Crear el root
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
