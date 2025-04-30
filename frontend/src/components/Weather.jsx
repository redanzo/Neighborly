import React, { useEffect, useState } from 'react';
import './Weather.css';

const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch('http://localhost:1337/api/weather')
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(err => console.error('Error fetching weather:', err));
  }, []);

  if (!weather) return <p className="weather-detail">Loading weather...</p>;

  return (
    <div className="weather-container">
      <h3>{weather.name} Weather</h3>
      <p className="weather-detail">{weather.weather[0].description}</p>
      <p className="weather-temp">{weather.main.temp}°F</p>
      <p className="weather-detail">Humidity: {weather.main.humidity}%</p>
      <p className="weather-detail">Wind: {weather.wind.speed} mph</p>
    </div>
  );
};

export default Weather;
