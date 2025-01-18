import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./Weather.css";

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Paris");
  const [error, setError] = useState(null);

  const apiKey = "0ba318681fc34138808205621251801";

  useEffect(() => {
    fetchWeather(location);
  }, [location]);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("No se pudo obtener el clima. Verifica la ubicación o la API key.");
    }
  };

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = () => {
    fetchWeather(location);
  };

  return (
    <div className="weather-page">
      {/* Navbar siempre fuera del contenedor principal */}
      <Navbar showSearch={false} showLanguages={false} />

      <div className="weather-container">
        <h1>Clima Actual</h1>
        <div className="search-bar">
          <input
            type="text"
            value={location}
            onChange={handleInputChange}
            placeholder="Ingrese una ciudad"
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>

        {error && <p className="error">{error}</p>}

        {weatherData && (
          <div className="weather-info">
            <h2>
              {weatherData.location.name}, {weatherData.location.country}
            </h2>
            <p>
              <strong>Temperatura:</strong> {weatherData.current.temp_c}°C
            </p>
            <p>
              <strong>Sensación Térmica:</strong> {weatherData.current.feelslike_c}°C
            </p>
            <p>
              <strong>Condición:</strong> {weatherData.current.condition.text}
            </p>
            <p>
              <strong>Velocidad del Viento:</strong> {weatherData.current.wind_kph} km/h
            </p>
            <p>
              <strong>Humedad:</strong> {weatherData.current.humidity}%
            </p>
            <p>
              <strong>Hora Local:</strong> {weatherData.location.localtime}
            </p>
            <img
              src={weatherData.current.condition.icon}
              alt="Icono de condición"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherComponent;
