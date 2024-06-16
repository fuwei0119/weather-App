import React from 'react';
import { WiDaySunny, WiCloudy, WiRain } from 'react-icons/wi';

const WeatherDisplay = ({ currentWeather, forecastWeather, cityName, updateBackground, background }) => {
  if (!currentWeather || !forecastWeather) return null;

  const { weather: currentWeatherData, main: currentMain } = currentWeather;
  const { temp: currentTemp, humidity: currentHumidity } = currentMain;
  const { speed: currentWindSpeed } = currentWeather.wind;

  const { main: currentMainWeather, description: currentDescription } = currentWeatherData[0];

  const getForecast = () => {
    return forecastWeather.map(item => {
      const date = new Date(item.dt * 1000);
      const hour = date.getHours(); // Get the hour of the day (0-23)
      const temp = item.main.temp.toFixed(1);
      const { main, description } = item.weather[0];
      return { hour, temp, main, description };
    });
  };

  let icon;
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
      icon = null;
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
          {icon}
        </div>
      </div>

      <hr className="separator-line" />

      <h3>Next 21 Hours Forecast:</h3>
      <div className="forecast-container">
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

export default WeatherDisplay;
