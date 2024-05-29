function displayLocation(weatherData) {
  const location = document.querySelector('#weather-display #location');
  location.textContent = `${weatherData.location}, ${weatherData.country} (last updated: ${weatherData.lastUpdated})`;
}

function updateWeatherDisplay(weatherData) {
  const weatherDisplay = document.querySelector('#weather-display');
  weatherDisplay.style.visibility = 'visible';
  displayLocation(weatherData);
}

export { updateWeatherDisplay };
