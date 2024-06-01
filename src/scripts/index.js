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
let isCelSelected = true;

function handleRequest(event) {
  event.preventDefault();

  const weatherData = api.fetchWeatherData(searchInput.value);
  // const weatherData = api.asyncFetchWeatherData(searchInput.value);

  weatherData.then(handleSuccess).catch(handleError);

  searchForm.reset();
}

function handleSuccess(data) {
  weatherDataObj = formatData(data);
  dom.updateWeatherDisplay(weatherDataObj, isCelSelected);

  console.log(weatherDataObj);
}

function handleError(error) {
  const errorMsg = document.querySelector('#error-msg');
  const errorStatus = error.toString().split(' ')[1];

  if (errorStatus === '400') {
    errorMsg.textContent = "* Couldn't find location, please try again.";
  } else {
    errorMsg.textContent = '* There was a problem, please try again.';
  }
}

function toggleTemp(event) {
  if (!event.target.classList.contains('active')) {
    temps.forEach((temp) => {
      temp.classList.remove('active');
    });
    event.target.classList.add('active');
    isCelSelected = !isCelSelected;
  }
  if (weatherDataObj.location) {
    dom.updateWeatherDisplay(weatherDataObj, isCelSelected);
  }
}

searchForm.addEventListener('submit', handleRequest);

searchInput.addEventListener('input', () => {
  const errorMsg = document.querySelector('#error-msg');
  errorMsg.textContent = '';
});

tempsControl.addEventListener('click', toggleTemp);
