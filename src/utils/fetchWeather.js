import axios from 'axios';

const API_KEY = 'ab4b65d9626a8e136231d74bed57a79b';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather data by city name or city code
export const fetchWeather = async (location) => {
  let url;
  if (!isNaN(location)) {
    // If location is a number, treat it as a city code
    url = `${BASE_URL}?id=${location}&appid=${API_KEY}&units=metric`;
  } else {
    // Otherwise, treat it as a city name
    url = `${BASE_URL}?q=${location}&appid=${API_KEY}&units=metric`;
  }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error}`);
  }
};
