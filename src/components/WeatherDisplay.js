import React from 'react';
import { WiDaySunny, WiCloudy, WiRain } from 'react-icons/wi';

const WeatherDisplay = ({ currentWeather, forecastWeather, cityName, updateBackground, background }) => {
  if (!currentWeather || !forecastWeather) return null;

  const { weather: currentWeatherData, main: currentMain } = currentWeather;
  const { temp: currentTemp, humidity: currentHumidity, wind_speed: currentWindSpeed } = currentMain;
  const { main: currentMainWeather, description: currentDescription } = currentWeatherData[0];

  const getForecast = () => {
    return forecastWeather.map(item => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      const temp = item.main.temp.toFixed(1);
      const { main, description } = item.weather[0];
      return { day, temp, main, description };
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

      <h3>Next 7 Days Forecast:</h3>
      <div className="forecast-container">
        {getForecast().map((forecast, index) => (
          <div key={index} className="forecast-item">
            <p>{forecast.day}</p>
            <p>{forecast.temp}°C</p>
            <p>{forecast.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default WeatherDisplay;
