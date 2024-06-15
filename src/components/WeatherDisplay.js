
import React from 'react';
import { WiDaySunny, WiCloudy, WiRain } from 'react-icons/wi';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) return null;

  const { main, description } = weatherData.weather[0];
  const { temp, humidity, wind_speed } = weatherData.main;

  let background;
  let icon;

  switch (main) {
    case 'Clear':
      background = 'sunny.jpg';
      icon = <WiDaySunny size={64} />;
      break;
    case 'Clouds':
      background = 'cloudy.jpg';
      icon = <WiCloudy size={64} />;
      break;
    case 'Rain':
      background = 'rainy.jpg';
      icon = <WiRain size={64} />;
      break;
    default:
      background = 'default.jpg';
  }

  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
      <div>
        {icon}
        <h1>{temp}°C</h1>
        <p>{description}</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind Speed: {wind_speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
