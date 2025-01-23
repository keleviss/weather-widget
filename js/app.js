import fetchWeatherData from './weatherDataFetching.js';
import { resetErrors, renderErrorOnScreen } from './uiRenderer.js';

// Search bar and location input elements
const input = document.getElementById('search-input');

// Activate hover effect when #location-input is focused
input.addEventListener('focus', () => {
  input.parentElement.classList.add('input-focused');
});

// Disable hover effect when #location-input loses focus
input.addEventListener('blur', () => {
  input.parentElement.classList.remove('input-focused');
});

// Search button to start fetching weather data based on the location
const searchIcon = document.querySelector('.fa-magnifying-glass');

// Clicking the search icon
searchIcon.addEventListener('click', async () => {
  await searchAndFetch();
  input.blur();
});

input.addEventListener('keypress', async (event) => {
  if (event.key === 'Enter') {
    await searchAndFetch();
    input.blur();
  }
})

async function searchAndFetch() {
  try {
    await resetErrors();
    await fetchWeatherData();
  } catch (error) {
    await renderErrorOnScreen(error.message);
  }
}