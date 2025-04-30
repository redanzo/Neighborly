import React, { useEffect, useState } from 'react';
import './Weather.css';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [zip, setZip] = useState('75080'); // Default: UTD Richardson TX
  const [inputZip, setInputZip] = useState('');

  const fetchWeather = (zipCode) => {
    fetch(`http://localhost:1337/api/weather?zip=${zipCode}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => setWeather(data))
      .catch(err => {
        console.error('Error fetching weather:', err);
        setWeather(null);
      });
  };

  useEffect(() => {
    fetchWeather(zip);
  }, [zip]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputZip.trim() !== '') {
      setZip(inputZip.trim());
    }
  };

  return (
    <div className="weather-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter ZIP"
          value={inputZip}
          onChange={(e) => setInputZip(e.target.value)}
          className="weather-input"
        />
        <button type="submit" className="weather-button">Check</button>
      </form>

      {weather ? (
        <>
          <h3>{weather.name} Weather</h3>
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
