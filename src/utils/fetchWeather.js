import axios from 'axios';

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
  const BASE_URL_CURRENT = 'https://api.openweathermap.org/data/2.5/weather';
  const BASE_URL_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast';

  // URL for current weather
  const currentUrl = `${BASE_URL_CURRENT}?q=${cityName}&appid=${API_KEY}&units=metric`;

  // URL for 7-day forecast (note: OpenWeatherMap provides forecast in 3-hour intervals)
  const forecastUrl = `${BASE_URL_FORECAST}?q=${cityName}&appid=${API_KEY}&units=metric`;

  try {
    // Fetch current weather data
    const currentResponse = await axios.get(currentUrl);
    const currentWeather = currentResponse.data;

    // Fetch forecast data
    const forecastResponse = await axios.get(forecastUrl);
    const forecastWeather = forecastResponse.data;

    // Extract only the next 7 days forecast from the list (assuming each day has multiple intervals)
    const today = new Date().getDate();
    const next7DaysForecast = forecastWeather.list.filter(item => {
      const itemDate = new Date(item.dt * 1000).getDate();
      return itemDate !== today; // Filter out today's data, if needed
    }).slice(0, 7); // Take only the next 7 entries

    return { current: currentWeather, forecast: next7DaysForecast };
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error}`);
  }
};
