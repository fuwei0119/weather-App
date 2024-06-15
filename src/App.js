import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import { fetchCityNameByZipCode, fetchWeatherByCityName } from './utils/fetchWeather'; // Adjusted import

import './styles/App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [background, setBackground] = useState('');
  const [cityName, setCityName] = useState('Adelaide');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cityName) {
          const data = await fetchWeatherByCityName(cityName);
          setWeatherData(data);
          updateBackground(data.current.weather[0].main);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData(); // Initial fetch when cityName changes
  }, [cityName]);

  const handleSearch = async (location) => {
    try {
      let city;
      if (!isNaN(location)) {
        // If location is a number (assuming it's a ZIP code)
        city = await fetchCityNameByZipCode(location);
      } else {
        // Otherwise, treat it as a city name
        city = location;
      }
      setCityName(city); // Update cityName state
    } catch (error) {
      console.error('Error fetching city name:', error);
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
    <div className="app">
      <header>
        <h1>Weather App</h1>
        <p>Enter a location or ZIP code to check the current weather conditions.</p>
        <SearchBar onSearch={handleSearch} />
      </header>
      <main style={{ backgroundImage: `url(${background})` }}>
        {weatherData && (
          <WeatherDisplay
            currentWeather={weatherData.current}
            forecastWeather={weatherData.forecast}
            cityName={cityName}
            updateBackground={updateBackground} // Pass updateBackground function to WeatherDisplay
          />
        )}
      </main>
    </div>
  );
};

export default App;
