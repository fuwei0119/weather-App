import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import { fetchCityNameByZipCode, fetchWeatherByCityName } from './utils/fetchWeather';

import './styles/App.css';
const App = () => {
  const [weatherData, setWeatherData] = useState(null); // State to store weather data
  const [background, setBackground] = useState(''); // State to manage background image URL
  const [cityName, setCityName] = useState('Adelaide'); // State to store city name, default to Adelaide

  useEffect(() => {
    // Effect to fetch weather data when cityName changes
    const fetchData = async () => {
      try {
        if (cityName) {
          // Fetch weather data based on cityName
          const data = await fetchWeatherByCityName(cityName);
          setWeatherData(data); // Update weatherData state with fetched data
          updateBackground(data.current.weather[0].main); // Update background based on current weather
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData(); // Call fetchData function on component mount and when cityName changes
  }, [cityName]); // Depend on cityName to trigger the effect

  const handleSearch = async (location) => {
    try {
      let city;
      if (!isNaN(location)) {
        // If location is a number (assumed to be ZIP code), fetch city name
        city = await fetchCityNameByZipCode(location);
      } else {
        // Otherwise, treat location as a city name
        city = location;
      }
      setCityName(city); // Update cityName state based on fetched city name
    } catch (error) {
      console.error('Error fetching city name:', error);
    }
  };

  const updateBackground = (weatherMain) => {
    // Function to update background image based on weatherMain (weather condition)
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
        <SearchBar onSearch={handleSearch} /> {/* Render SearchBar component */}
      </header>
      <main style={{ backgroundImage: `url(${background})` }}>
        {weatherData && (
          <WeatherDisplay
            currentWeather={weatherData.current} // Pass current weather data to WeatherDisplay
            forecastWeather={weatherData.forecast} // Pass forecast weather data to WeatherDisplay
            cityName={cityName} // Pass cityName to WeatherDisplay
            updateBackground={updateBackground} // Pass updateBackground function to WeatherDisplay
          />
        )}
      </main>
    </div>
  );
};

export default App; // Export the App component as default
