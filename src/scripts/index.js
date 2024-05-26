import '../css/reset.css';
import '../css/style.css';

function fetchWeatherData() {
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=106c9a3f76aa4badb00163914241605&q=${input.value}&days=3&aqi=no&alerts=no`,
    { mode: 'cors' },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((jsonData) => {
      //handle success
      console.log('then');
      const weatherDataObj = formatData(jsonData);
      console.log(weatherDataObj);
    })
    .catch((error) => {
      //handle error
      console.log('catch', error);
    });
}

function formatData(data) {
  const formattedData = {};

  formatMiscData(formattedData, data);
  formatDays(formattedData, data);

  return formattedData;
}

function formatMiscData(obj, data) {
  obj.location = data.location.name;
  obj.country = data.location.country;
  obj.localTime = data.location.localtime;
  obj.lastUpdated = data.current.last_updated;
}

// Format current day weather and next 2 days forecast
function formatDays(obj, data) {
  for (let i = 0; i <= 2; i++) {
    obj[`day${i}`] = {};

    if (i === 0) {
      obj[`day${i}`].condition = data.current.condition.text;
      obj[`day${i}`].conditionImg = data.current.condition.icon;
      obj[`day${i}`].tempCel = data.current.temp_c;
      obj[`day${i}`].tempFar = data.current.temp_f;
    } else {
      obj[`day${i}`].condition =
        data.forecast.forecastday[i].day.condition.text;
      obj[`day${i}`].conditionImg =
        data.forecast.forecastday[i].day.condition.icon;
    }
    obj[`day${i}`].tempHighCel = data.forecast.forecastday[i].day.maxtemp_c;
    obj[`day${i}`].tempHighFar = data.forecast.forecastday[i].day.maxtemp_f;
    obj[`day${i}`].tempLowCel = data.forecast.forecastday[i].day.mintemp_c;
    obj[`day${i}`].tempLowFar = data.forecast.forecastday[i].day.mintemp_f;
    obj[`day${i}`].rainChance =
      data.forecast.forecastday[i].day.daily_chance_of_rain;
    obj[`day${i}`].sunrise = data.forecast.forecastday[i].astro.sunrise;
    obj[`day${i}`].sunset = data.forecast.forecastday[i].astro.sunset;
    obj[`day${i}`].date = data.forecast.forecastday[i].date;
  }
}

//async await version
// async function asyncFetchWeatherData() {
//   try {
//     const response = await fetch(
//       `http://api.weatherapi.com/v1/forecast.json?key=106c9a3f76aa4badb00163914241605&q=${input.value}&days=3&aqi=no&alerts=no`,
//       { mode: 'cors' },
//     );

//     if (!response.ok) {
//       throw new Error(`${response.status} - ${response.statusText}`);
//     }

//     //handle success
//     const jsonData = await response.json();
//     const weatherDataObj = formatData(jsonData);
//     console.log(weatherDataObj);
//   } catch (error) {
//     //handle error
//     console.log(error);
//   }
// }

const btn = document.querySelector('button');
const input = document.querySelector('input');

btn.addEventListener('click', fetchWeatherData);
