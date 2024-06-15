import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import { fetchWeather } from './utils/fetchWeather';
import './styles/App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async (location) => {
    const data = await fetchWeather(location);
    setWeatherData(data);
  };

  return (
    <div className="app">
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
};

export default App;
