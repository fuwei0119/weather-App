import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import { fetchCityNameByZipCode, fetchWeatherByCityName } from './utils/fetchWeather'; // Adjusted import

import './styles/App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [background, setBackground] = useState('');
  const [cityName, setCityName] = useState('');

  const handleSearch = async (location) => {
    try {
      let city;
      if (!isNaN(location)) {
        city = await fetchCityNameByZipCode(location);
      } else {
        city = location;
      }
      setCityName(city);
      const data = await fetchWeatherByCityName(location);
      setWeatherData(data);
      updateBackground(data.weather[0].main);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const updateBackground = (weatherMain) => {
    let backgroundPath = '/background/';
    switch (weatherMain) {
      case 'Clear':
        setBackground(backgroundPath + 'sunny.jpg');
        break;
      case 'Clouds':
        setBackground(backgroundPath + 'cloudy.jpg');
        break;
      case 'Rain':
        setBackground(backgroundPath + 'rainy.jpg');
        break;
      default:
        setBackground(backgroundPath + 'default.jpg');
        break;
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${background})` }}>
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay weatherData={weatherData} cityName={cityName} />
    </div>
  );
};

export default App;
