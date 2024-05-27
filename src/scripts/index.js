import '../css/reset.css';
import '../css/style.css';
import { fetchWeatherData } from './api';
// import { asyncFetchWeatherData } from './api';

const btn = document.querySelector('button');
const input = document.querySelector('input');
const temps = document.querySelectorAll('#temp-control > *');
const tempsControl = document.querySelector('#temp-control');

function toggleTemp(event) {
  temps.forEach((temp) => {
    console.log();
    temp.classList.remove('active');
  });
  event.target.classList.add('active');
}

btn.addEventListener('click', () => {
  fetchWeatherData(input.value);
});

tempsControl.addEventListener('click', toggleTemp);
