import React from 'react';
import { WiDaySunny, WiCloudy, WiRain } from 'react-icons/wi'; // Importing weather icons

const WeatherDisplay = ({ currentWeather, forecastWeather, cityName, updateBackground, background }) => {
  // Check if currentWeather or forecastWeather is not available, return null to avoid rendering
  if (!currentWeather || !forecastWeather) return null;

  // Destructure currentWeather object to get necessary data
  const { weather: currentWeatherData, main: currentMain } = currentWeather;
  const { temp: currentTemp, humidity: currentHumidity } = currentMain;
  const { speed: currentWindSpeed } = currentWeather.wind; // Destructure wind speed from currentWeather

  // Destructure currentWeatherData to get current weather details
  const { main: currentMainWeather, description: currentDescription } = currentWeatherData[0];

  // Function to format forecast data for the next 21 hours
  const getForecast = () => {
    return forecastWeather.map(item => {
      const date = new Date(item.dt * 1000); // Convert timestamp to Date object
      const hour = date.getHours(); // Get hour of the day (0-23)
      const temp = item.main.temp.toFixed(1); // Format temperature to one decimal place
      const { main, description } = item.weather[0]; // Destructure weather main and description
      return { hour, temp, main, description }; // Return formatted forecast data
    });
  };

  let icon;
  // Determine which weather icon to display based on currentMainWeather
  switch (currentMainWeather) {
    case 'Clear':
      icon = <WiDaySunny size={160} />;
      break;
    case 'Clouds':
      icon = <WiCloudy size={160} />;
      break;
    case 'Rain':
      icon = <WiRain size={160} />;
      break;
    default:
      icon = null; // Set icon to null if weather condition doesn't match Clear, Clouds, or Rain
      break;
  }

  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }} className="weather-container">
      <div className="current-weather">
        <div className="weather-info">
          <h1>{cityName}</h1>
          <h2>{currentTemp}°C</h2>
          <p>{currentDescription}</p>
          <p>Humidity: {currentHumidity}%</p>
          <p>Wind Speed: {currentWindSpeed} m/s</p>
        </div>
        <div className="weather-icon">
          {icon} {/* Render weather icon based on currentMainWeather */}
        </div>
      </div>

      <hr className="separator-line" />

      <h3>Next 21 Hours Forecast:</h3>
      <div className="forecast-container">
        {/* Map through forecast data and render forecast items for the next 21 hours */}
        {getForecast().slice(0, 21).map((forecast, index) => (
          <div key={index} className="forecast-item">
            <h3>{forecast.hour}:00</h3>
            <p>{forecast.temp}°C</p>
            <p>{forecast.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay; // Export WeatherDisplay component as default
