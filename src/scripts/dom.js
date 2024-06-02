import RainChanceSvg from '../assets/rain.svg';
import { formatDayName } from './format';

function displayLocation(weatherData) {
  const location = document.querySelector('#weather-display #location');
  location.textContent = `${weatherData.location}, ${weatherData.country} (last updated: ${weatherData.lastUpdated})`;
}

function displayCurrentDay(weatherData, isCelSelected) {
  const currentDay = document.querySelector('#weather-display #current');
  currentDay.textContent = '';

  // Date
  const date = document.createElement('h2');
  date.classList.add('current-day');
  date.textContent = 'Today';

  // Weather Condition
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

  // Temp
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

  // Rain Chance
  const rainChanceDiv = document.createElement('div');
  rainChanceDiv.classList.add('rain-chance-div');
  const rainChanceImg = new Image();
  rainChanceImg.src = RainChanceSvg;
  rainChanceImg.classList.add('rain-chance-img');
  const rainChanceText = document.createElement('h3');
  rainChanceText.textContent = `${weatherData.day0.rainChance}%`;
  rainChanceText.classList.add('rain-chance-text');
  rainChanceDiv.appendChild(rainChanceImg);
  rainChanceDiv.appendChild(rainChanceText);

  // Sunrise Sunset
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

  // Append to DOM
  currentDay.appendChild(date);
  currentDay.appendChild(weatherConditionDiv);
  currentDay.appendChild(tempDiv);
  currentDay.appendChild(rainChanceDiv);
  currentDay.appendChild(sunriseSunsetDiv);
}

function displayDays(weatherData, isCelSelected) {
  const days = document.querySelectorAll('#weather > div:not(:first-child)');
  const daysWeatherData = [weatherData.day1, weatherData.day2];

  days.forEach((day, index) => {
    day.textContent = '';

    const date = document.createElement('div');

    // Day Name
    date.textContent = `${formatDayName(daysWeatherData[index].date)}`;
    date.classList.add('date');

    // Weather Condition
    const conditionDiv = document.createElement('div');
    conditionDiv.classList.add('condition-div');
    const conditionImg = document.createElement('img');
    conditionImg.src = daysWeatherData[index].conditionImg;
    conditionImg.classList.add('condition-img');
    const conditionText = document.createElement('h3');
    conditionText.textContent = daysWeatherData[index].condition;
    conditionText.classList.add('condition-text');
    conditionDiv.appendChild(conditionImg);
    conditionDiv.appendChild(conditionText);

    // Temp
    const tempDiv = document.createElement('div');
    tempDiv.classList.add('temp-div');
    const high = document.createElement('h3');
    high.classList.add('high');
    const low = document.createElement('h3');
    low.classList.add('low');

    if (isCelSelected) {
      high.textContent = `H ${Math.round(daysWeatherData[index].tempHighCel)}°C`;
      low.textContent = `L ${Math.round(daysWeatherData[index].tempLowCel)}°C`;
    } else {
      high.textContent = `H ${Math.round(daysWeatherData[index].tempHighFar)}°F`;
      low.textContent = `L ${Math.round(daysWeatherData[index].tempLowFar)}°F`;
    }
    tempDiv.appendChild(high);
    tempDiv.appendChild(low);

    // Rain Chance
    const rainChanceDiv = document.createElement('div');
    rainChanceDiv.classList.add('rain-chance-div');
    const rainChanceImg = new Image();
    rainChanceImg.src = RainChanceSvg;
    rainChanceImg.classList.add('rain-chance-img');
    const rainChanceText = document.createElement('h3');
    rainChanceText.textContent = `${daysWeatherData[index].rainChance}%`;
    rainChanceText.classList.add('rain-chance-text');
    rainChanceDiv.appendChild(rainChanceImg);
    rainChanceDiv.appendChild(rainChanceText);

    // Append to DOM
    day.appendChild(date);
    day.appendChild(conditionDiv);
    day.appendChild(tempDiv);
    day.appendChild(rainChanceDiv);
  });
}

// Update Display
function updateWeatherDisplay(weatherData, isCelSelected) {
  const weatherDisplay = document.querySelector('#weather-display');
  weatherDisplay.style.visibility = 'visible';
  displayLocation(weatherData);
  displayCurrentDay(weatherData, isCelSelected);
  displayDays(weatherData, isCelSelected);
}

function showSpinner() {
  const searchBtn = document.querySelector('#search-submit');
  const loadSpinnerDiv = document.createElement('div');
  loadSpinnerDiv.classList.add('spinner');
  searchBtn.textContent = '';
  searchBtn.appendChild(loadSpinnerDiv);
}

function hideSpinner() {
  const searchBtn = document.querySelector('#search-submit');
  const loadSpinnerDiv = document.querySelector('#search-submit .spinner');
  searchBtn.removeChild(loadSpinnerDiv);
  searchBtn.textContent = 'Search';
}

export { updateWeatherDisplay, showSpinner, hideSpinner };
