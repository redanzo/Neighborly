import React, { useEffect, useState } from 'react';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const API_KEY = 'd5a3e0fa328397c8174cff2352cb936d'; // API key

  useEffect(() => {
    // For now, use a static location like New York City
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=New York&units=metric&appid=${API_KEY}`)
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(err => console.error(err));
  }, []);

  if (!weather) return <p>Loading weather...</p>;

  return (
    <div>
      <h3>{weather.name} Weather</h3>
      <p>{weather.weather[0].description}</p>
      <p>Temp: {weather.main.temp}°C</p>
    </div>
  );
};

export default Weather;
