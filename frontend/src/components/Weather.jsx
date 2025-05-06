import React, { useEffect, useState } from "react";
import "./Weather.css";

const Weather = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const defaultZip = storedUser?.zip || "75080";

  const [weather, setWeather] = useState(null);

  const fetchWeather = (zipCode) => {
    fetch(`/api/weather?zip=${zipCode}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setWeather(data))
      .catch((err) => {
        console.error("Error fetching weather:", err);
        setWeather(null);
      });
  };

  useEffect(() => {
    fetchWeather(defaultZip);
  }, []);

  return (
    <div className="weather-container">
      {weather ? (
        <>
          <h3 className="weather-title">{weather.name} Weather</h3>
          <p className="weather-detail">{weather.weather[0].description}</p>
          <p className="weather-temp">{Math.round(weather.main.temp)}°F</p>
        </>
      ) : (
        <p className="weather-detail">Loading weather...</p>
      )}
    </div>
  );
};

export default Weather;