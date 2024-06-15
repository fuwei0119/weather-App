import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import { fetchWeather } from './utils/fetchWeather';
import './styles/App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [background, setBackground] = useState('');
  const [cityName, setCityName] = useState('Adelaide'); 

  useEffect(() => {
    fetchWeatherData(cityName); 
  }, [cityName]); 

  const fetchWeatherData = async (location) => {
    try {
      const data = await fetchWeather(location);
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

  const handleSearch = (location) => {
    setCityName(location); 
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${background})` }}>
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay weatherData={weatherData} cityName={cityName} background={background}/>
    </div>
  );
};

export default App;
