import RainChanceSvg from '../assets/rain.svg';

function displayLocation(weatherData) {
  const location = document.querySelector('#weather-display #location');
  location.textContent = `${weatherData.location}, ${weatherData.country} (last updated: ${weatherData.lastUpdated})`;
}

function displayCurrentDay(weatherData, isCelSelected) {
  const currentDay = document.querySelector('#weather-display #current');
  currentDay.textContent = '';

  const date = document.createElement('h2');
  date.classList.add('current-day');
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
    high.textContent = `High ${Math.round(weatherData.day0.tempHighCel)}°C`;
    low.textContent = `Low ${Math.round(weatherData.day0.tempLowCel)}°C`;
  } else {
    temp.textContent = `${Math.round(weatherData.day0.tempFar)}°F`;
    high.textContent = `High ${Math.round(weatherData.day0.tempHighFar)}°F`;
    low.textContent = `Low ${Math.round(weatherData.day0.tempLowFar)}°F`;
  }

  tempDiv.appendChild(temp);
  highLowTempDiv.appendChild(high);
  highLowTempDiv.appendChild(low);
  tempDiv.appendChild(highLowTempDiv);

  const rainChanceDiv = document.createElement('div');
  const rainChanceSvg = new Image();
  rainChanceSvg.src = RainChanceSvg;
  const rainChanceText = document.createElement('h3');
  rainChanceText.textContent = `${weatherData.day0.rainChance}%`;
  rainChanceDiv.appendChild(rainChanceSvg);
  rainChanceDiv.appendChild(rainChanceText);

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
  currentDay.appendChild(rainChanceDiv);
  currentDay.appendChild(sunriseSunsetDiv);
}

function updateWeatherDisplay(weatherData, isCelSelected) {
  const weatherDisplay = document.querySelector('#weather-display');
  weatherDisplay.style.visibility = 'visible';
  displayLocation(weatherData);
  displayCurrentDay(weatherData, isCelSelected);
}

export { updateWeatherDisplay };
