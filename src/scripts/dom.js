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
  weatherConditionDiv.classList.add('weather-condition-div');
  const weatherConditionImg = document.createElement('img');
  weatherConditionImg.src = weatherData.day0.conditionImg;
  weatherConditionImg.classList.add('weather-condition-img');
  const weatherConditionText = document.createElement('h3');
  weatherConditionText.textContent = weatherData.day0.condition;
  weatherConditionText.classList.add('weather-condition-text');
  weatherConditionDiv.appendChild(weatherConditionImg);
  weatherConditionDiv.appendChild(weatherConditionText);

  const tempDiv = document.createElement('div');
  tempDiv.classList.add('temp-div');
  const temp = document.createElement('h3');
  temp.classList.add('temp');
  const highLowTempDiv = document.createElement('div');
  highLowTempDiv.classList.add('high-low-div');
  const high = document.createElement('h3');
  high.classList.add('high');
  const low = document.createElement('h3');
  low.classList.add('low');

  if (isCelSelected) {
    temp.textContent = `${weatherData.day0.tempCel}°C`;
    high.textContent = `H ${Math.round(weatherData.day0.tempHighCel)}°C`;
    low.textContent = `L ${Math.round(weatherData.day0.tempLowCel)}°C`;
  } else {
    temp.textContent = `${Math.round(weatherData.day0.tempFar)}°F`;
    high.textContent = `H ${Math.round(weatherData.day0.tempHighFar)}°F`;
    low.textContent = `L ${Math.round(weatherData.day0.tempLowFar)}°F`;
  }

  tempDiv.appendChild(temp);
  highLowTempDiv.appendChild(high);
  highLowTempDiv.appendChild(low);
  tempDiv.appendChild(highLowTempDiv);

  const rainChanceDiv = document.createElement('div');
  rainChanceDiv.classList.add('rain-chance-div');
  const rainChanceSvg = new Image();
  rainChanceSvg.src = RainChanceSvg;
  rainChanceSvg.classList.add('rain-chance-img');
  const rainChanceText = document.createElement('h3');
  rainChanceText.textContent = `${weatherData.day0.rainChance}%`;
  rainChanceText.classList.add('rain-chance-text');
  rainChanceDiv.appendChild(rainChanceSvg);
  rainChanceDiv.appendChild(rainChanceText);

  const sunriseSunsetDiv = document.createElement('div');
  sunriseSunsetDiv.classList.add('sunrise-sunset');

  const sunriseDiv = document.createElement('div');
  sunriseDiv.classList.add('sunrise');
  const sunrise = document.createElement('h3');
  sunrise.textContent = `Sunrise:`;
  const sunriseTime = document.createElement('h3');
  sunriseTime.textContent = `${weatherData.day0.sunrise}`;
  sunriseDiv.appendChild(sunrise);
  sunriseDiv.appendChild(sunriseTime);
  sunriseSunsetDiv.appendChild(sunriseDiv);

  const sunsetDiv = document.createElement('div');
  sunsetDiv.classList.add('sunset');
  const sunset = document.createElement('h3');
  sunset.textContent = `Sunset:`;
  const sunsetTime = document.createElement('h3');
  sunsetTime.textContent = `${weatherData.day0.sunset}`;
  sunsetDiv.appendChild(sunset);
  sunsetDiv.appendChild(sunsetTime);
  sunriseSunsetDiv.appendChild(sunsetDiv);

  // const sunset = document.createElement('h3');
  // sunset.textContent = `Sunset: ${weatherData.day0.sunset}`;
  // sunriseSunsetDiv.appendChild(sunset);

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
