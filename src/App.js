import React, { useState } from "react";
import "./App.css";

import { fetchWeather } from "./api/fetchWeather";

const App = () => {
  const [term, setTerm] = useState("");
  const [weather, setWeather] = useState({});
  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(term);
      console.log(data);
      setWeather(data);
      setTerm("");
    }
  };
  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyPress={search}
      />

      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;c</sup>
          </div>
          <div className="min-max-temp">
            {Math.round(weather.main.temp_min)}
            <sup>&deg;c</sup> - {Math.round(weather.main.temp_max)}
            <sup>&deg;c</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
