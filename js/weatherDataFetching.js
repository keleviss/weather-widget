import processForecastData from "./weatherProcessing.js";
import { getInput, clearInput, capitalizeWords, getCurrentDate } from "./helperFunctions.js";
import { fadeInCards, renderForecast, renderWeatherContent, renderWeatherMetrics } from "./uiRenderer.js";

// OpenWeather API Key
const apiKey = 'your-open-weather-api-key';

// OpenWeather API base url
const openWeatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const openWeatherForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

// Units metric
const units = 'metric';

export default async function fetchWeatherData() {
  try {
    const city = getInput();
    if (city === '') {
      throw new Error('No city provided');
    }
    clearInput();
    const weather = await getCurrentWeather(city);
    const forecast = await getForecast(city);

    // Call UI render methods
    await fadeInCards();
    await renderWeatherContent(weather.main);
    await renderWeatherMetrics(weather.metrics);
    await renderForecast(forecast);

  } catch (error) {
    throw error;
  }
}


// Async function for retrieving current weather data based on city name
async function getCurrentWeather(city) {
  // Limit the amount of search results
  const limit = 1;
  // URL to fetch current weather data based on the location
  const urlToFetch = `${openWeatherBaseUrl}?q=${city}&limit=${limit}&appid=${apiKey}&units=${units}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      // console.log(jsonResponse);

      // Get current day and month
      const currentDate = await getCurrentDate();

      // Save preferred weather data on a custom object
      return {
        main: {
          day: currentDate.day,
          month: currentDate.monthAndDate,
          temp: `${Math.round(jsonResponse.main.temp)}°`,
          location: `${jsonResponse.name}, ${jsonResponse.sys.country}`,
          description: capitalizeWords(jsonResponse.weather[0].description),
          icon: jsonResponse.weather[0].icon
        },
        metrics: {
          pressure: jsonResponse.main.pressure,
          humidity: jsonResponse.main.humidity,
          visibility: jsonResponse.visibility,
          wind: jsonResponse.wind.speed
        }
      };

    } else {
      const error = await response.json();
      throw new Error(error.message);
    }

  } catch (error) {
    console.error('Error fetching current weather data: ' + error.message);
    throw error;
  }
}

// Fetch forecast data for the next 5 days based on the location
async function getForecast(city) {
  const urlToFetch = `${openWeatherForecastUrl}?q=${city}&appid=${apiKey}&units=${units}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      // console.log(jsonResponse);

      // Process forecast data and extract the most important information
      const forecastList = await processForecastData(jsonResponse.list);
      // console.log(forecastList);
      return forecastList;

    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Error fetching forecast data: ' + error.message);
    throw error;
  }

}