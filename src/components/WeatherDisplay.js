import React from 'react';
import { WiDaySunny, WiCloudy, WiRain } from 'react-icons/wi';

const WeatherDisplay = ({ weatherData, cityName, background }) => {
  if (!weatherData) return null;

  const { main, description } = weatherData.weather[0];
  const { temp, humidity, wind_speed } = weatherData.main;

  let icon;
  switch (main) {
    case 'Clear':
      icon = <WiDaySunny size={64} />;
      break;
    case 'Clouds':
      icon = <WiCloudy size={64} />;
      break;
    case 'Rain':
      icon = <WiRain size={64} />;
      break;
    default:
      icon = null; // Handle default case if needed
      break;
  }

  return (
    <div style={{ backgroundImage: background, backgroundSize: 'cover' }}>
      <div>
        {icon}
        <h1>{cityName}</h1>
        <h2>{temp}°C</h2>
        <p>{description}</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind Speed: {wind_speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
