import '../css/reset.css';
import '../css/style.css';
import { fetchWeatherData } from './api';
// import { asyncFetchWeatherData } from './api';

const btn = document.querySelector('button');
const input = document.querySelector('input');

btn.addEventListener('click', () => {
  fetchWeatherData(input.value);
});
