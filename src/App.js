import React, { useState } from 'react';
import './App.css';

const API_KEY = '895284fb2d2c50a520ea537456963d9c';

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!location) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Location not found');
      }

      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch {
      setError('Location not found. Please try again.');
      setWeatherData(null);
    }
  };

  const handleSearch = () => {
    fetchWeather();
  };

  return (
    <div className="app">
      <h1> Weather App</h1>

      <div className="search-bar">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Get Weather</button>
      </div>

      {error && <div className="error">{error}</div>}

      {weatherData && (
        <div className="weather-card">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
