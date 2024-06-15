import axios from 'axios';

// Function to fetch city name by ZIP code using Zippopotam.us API
// Function to fetch city name by ZIP code using Zippopotam.us API
export const fetchCityNameByZipCode = async (zipCode) => {
  const url = `https://api.zippopotam.us/au/${zipCode}`;

  try {
    const response = await axios.get(url);
    // Check if the response contains valid data
    if (response.data.places && response.data.places.length > 0) {
      // Assuming the first city in the response is the nearest city
      const cityName = response.data.places[0]['place name'];
      return cityName;
    } else {
      throw new Error('City name not found for the provided ZIP code.');
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('ZIP code not found.');
    } else {
      throw new Error(`Error fetching city name: ${error.message}`);
    }
  }
};

// Function to fetch weather data by city name
export const fetchWeatherByCityName = async (cityName) => {
  const API_KEY = 'ab4b65d9626a8e136231d74bed57a79b';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const url = `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error}`);
  }
};
