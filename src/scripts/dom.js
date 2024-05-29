function displayLocation(weatherData) {
  const location = document.querySelector('#weather-display #location');
  location.textContent = `${weatherData.location}, ${weatherData.country} (last updated: ${weatherData.lastUpdated})`;
}

function displayCurrentDay(weatherData, isCelSelected) {
  const currentDay = document.querySelector('#weather-display #current');
  currentDay.textContent = '';

  const date = document.createElement('h2');
  date.textContent = 'Today';

  const weatherConditionDiv = document.createElement('div');
  const weatherConditionImg = document.createElement('img');
  weatherConditionImg.src = weatherData.day0.conditionImg;
  const weatherConditionText = document.createElement('h3');
  weatherConditionText.textContent = weatherData.day0.condition;
  weatherConditionDiv.appendChild(weatherConditionImg);
  weatherConditionDiv.appendChild(weatherConditionText);

  const tempDiv = document.createElement('div');
  const temp = document.createElement('h3');
  const highLowTempDiv = document.createElement('div');
  const high = document.createElement('h3');
  const low = document.createElement('h3');

  if (isCelSelected) {
    temp.textContent = `${weatherData.day0.tempCel}°C`;
    high.textContent = `${Math.round(weatherData.day0.tempHighCel)}°C`;
    low.textContent = `${Math.round(weatherData.day0.tempLowCel)}°C`;
  } else {
    temp.textContent = `${Math.round(weatherData.day0.tempFar)}°F`;
    high.textContent = `${Math.round(weatherData.day0.tempHighFar)}°F`;
    low.textContent = `${Math.round(weatherData.day0.tempLowFar)}°F`;
  }

  tempDiv.appendChild(temp);
  highLowTempDiv.appendChild(high);
  highLowTempDiv.appendChild(low);
  tempDiv.appendChild(highLowTempDiv);

  const rainChance = document.createElement('h3');
  rainChance.textContent = `<insert svg here> ${weatherData.day0.rainChance}%`;

  const sunriseSunsetDiv = document.createElement('div');
  const sunrise = document.createElement('h3');
  sunrise.textContent = `Sunrise: ${weatherData.day0.sunrise}`;
  const sunset = document.createElement('h3');
  sunset.textContent = `Sunset: ${weatherData.day0.sunset}`;
  sunriseSunsetDiv.appendChild(sunrise);
  sunriseSunsetDiv.appendChild(sunset);

  currentDay.appendChild(date);
  currentDay.appendChild(weatherConditionDiv);
  currentDay.appendChild(tempDiv);
  currentDay.appendChild(rainChance);
  currentDay.appendChild(sunriseSunsetDiv);
}

function updateWeatherDisplay(weatherData, isCelSelected) {
  const weatherDisplay = document.querySelector('#weather-display');
  weatherDisplay.style.visibility = 'visible';
  displayLocation(weatherData);
  displayCurrentDay(weatherData, isCelSelected);
}

export { updateWeatherDisplay };
