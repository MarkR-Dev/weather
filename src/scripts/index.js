import '../css/reset.css';
import '../css/style.css';
import * as api from './api';
import * as dom from './dom';
import { formatData } from './format';

const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const temps = document.querySelectorAll('#temp-control > *');
const tempsControl = document.querySelector('#temp-control');
let weatherDataObj = {};

function toggleTemp(event) {
  temps.forEach((temp) => {
    temp.classList.remove('active');
  });
  event.target.classList.add('active');
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const weatherData = api.fetchWeatherData(searchInput.value);
  // const weatherData = api.asyncFetchWeatherData(searchInput.value);
  weatherData
    .then((data) => {
      weatherDataObj = formatData(data);
      dom.updateWeatherDisplay(weatherDataObj);

      console.log(weatherDataObj);
    })
    .catch(handleError);

  searchForm.reset();
});

searchInput.addEventListener('input', () => {
  const errorMsg = document.querySelector('#error-msg');
  errorMsg.textContent = '';
});

tempsControl.addEventListener('click', toggleTemp);

function handleError(error) {
  const errorMsg = document.querySelector('#error-msg');
  if (error.status === 400) {
    errorMsg.textContent = "* Couldn't find location, please try again.";
  } else {
    errorMsg.textContent = '* There was a problem, please try again.';
  }
}
