
import axios from 'axios';

const API_KEY = 'ab4b65d9626a8e136231d74bed57a79b';

export const fetchWeather = async (location) => {
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
  return response.data;
};
