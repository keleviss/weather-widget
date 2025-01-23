import { formatDateToDay } from "./helperFunctions.js"

// Rendering the empty cards on the app container================

// Append new card child Promise
async function renderNewCard(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const appContainer = document.querySelector('.app-container');
      const newCard = document.createElement('div');
      newCard.classList.add('card', 'fade-in');
      newCard.id = id;
      appContainer.appendChild(newCard);
      resolve();
    }, 200);
  });
}

// Render all cards inside the app-container 
export async function fadeInCards() {
  const appContainer = document.querySelector('.app-container');
  appContainer.innerHTML = '';
  try {
    const ids = ['current-weather', 'weather-metrics', 'forecast'];

    for (let i = 0; i < ids.length; i++) {
      await renderNewCard(ids[i]);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// ==============================================================================
// Rendering content inside the card elements

// Render the current weather data on the first card #current-weather
export async function renderWeatherContent(weatherData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const currentWeatherCard = document.getElementById('current-weather');
      currentWeatherCard.innerHTML = `
          <div class="location-temperature fade-in">
            <div class="date-container">
              <span id="day">${weatherData.day}</span>
              <span id="month">${weatherData.month}</span>
            </div>
            <div class="temp-container">
              <span id="temperature">${weatherData.temp}</span>
              <span id="location"><i class="fa-solid fa-location-dot fa-xs"></i> ${weatherData.location}</span>
            </div>
          </div>
          <div class="icon-description fade-in">
            <img id="icon" src="./assets/weatherIcons/${weatherData.icon}.svg" alt="${weatherData.description} icon">
            <span id="description">${weatherData.description}</span>
          </div>
        `;
      resolve();
    }, 100);
  });
}

// Render weather metrics on the second card #weather-metrics
export async function renderWeatherMetrics(metrics) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const weatherMetricsCard = document.getElementById('weather-metrics');
      weatherMetricsCard.innerHTML = `
          <ul class="metric-list fade-in">
            <li class="metric">Pressure: <span>${metrics.pressure} mb</span></li>
            <li class="metric">Humidity: <span>${metrics.humidity} %</span></li>
            <li class="metric">Visibility: <span>${(metrics.visibility / 1000)} km</span></li>
            <li class="metric">Wind: <span>${((metrics.wind / 1000) * 3600).toFixed(2)} km/h</span></li>
          </ul>
        `;

      resolve();
    }, 100);
  });
}

// Rendering cotnent inside the last card element with id #forecast
export async function renderForecast(forecast) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const forecastCard = document.getElementById('forecast');
      forecastCard.innerHTML = '';
      const forecastList = document.createElement('ul');
      forecastList.classList.add('forecast-list', 'fade-in');
      forecastCard.appendChild(forecastList);

      for (let i = 0; i < forecast.length; i++) {
        const formattedDay = formatDateToDay(forecast[i].date);

        forecastList.innerHTML += `
            <li class="forecast-day">
              <span>${formattedDay}</span>
              <img id="icon" src="./assets/weatherIcons/${forecast[i].icon}d.svg" alt="${forecast[i].description} icon">
              <span>${forecast[i].avgTemp}°</span>
            </li>
          `;
      }

      resolve();
    }, 100);
  });
}

export async function renderErrorOnScreen(message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
      resolve();
    }, 200);
  });
}

export async function resetErrors() {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = '';
  errorMessage.style.display = '';
}