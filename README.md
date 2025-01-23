# Weather Now 🌦️

## Usage 🚀
1. Enter a city name in the search bar.
2. Press **Enter** or click the search icon.
3. View the current weather information and forecast.

### The display will update with:
- **Current temperature and location**
- **Weather description with icon**
- **Detailed metrics**:
  - Pressure
  - Humidity
  - Visibility
  - Wind
- **5-day forecast**


## API Configuration ⚙️
This project uses the **OpenWeather API**. To run the application:
1. Clone repository:
  ```bash
  git clone https://github.com/keleviss/weather-widget.git
  ```
2. Sign up for a free API key at [OpenWeather](https://openweathermap.org/).
3. Replace the API key in `js/weatherDataFetching.js`:
   ```javascript
   const apiKey = 'your-open-weather-api-key';
   ```


## File Structure 📁
```plaintext
weather-now/
├── assets/
│   ├── weatherIcons/
│   └── fontAwesomeIcons/
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── weatherDataFetching.js
│   ├── weatherProcessing.js
│   ├── helperFunctions.js
│   └── uiRenderer.js
└── index.html
```


## Features in Detail 🔍

### Current Weather
- **Day and date display**
- **Current temperature**
- **Location with country code**
- **Weather description with corresponding icon**

### Weather Metrics
- Atmospheric pressure (mb)
- Humidity percentage
- Visibility distance (km)
- Wind speed (km/h)

### 5-Day Forecast
- **Daily temperature averages**
- **Weather condition icons**
- **Day of the week display**


## Error Handling 🚨
The application includes robust error handling for:
- Invalid city names
- API request failures
- Network connectivity issues


## Acknowledgments 🙏
- **Weather data** provided by [OpenWeather](https://openweathermap.org/).
- **Icons** by [Font Awesome](https://fontawesome.com/).
