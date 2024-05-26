import { formatData } from './format';

function fetchWeatherData(location) {
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=106c9a3f76aa4badb00163914241605&q=${location}&days=3&aqi=no&alerts=no`,
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
      const weatherDataObj = formatData(jsonData);
      console.log(weatherDataObj);
    })
    .catch((error) => {
      //handle error
      console.log(error);
    });
}

//async await version
async function asyncFetchWeatherData(location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=106c9a3f76aa4badb00163914241605&q=${location}&days=3&aqi=no&alerts=no`,
      { mode: 'cors' },
    );

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    //handle success
    const jsonData = await response.json();
    const weatherDataObj = formatData(jsonData);
    console.log(weatherDataObj);
  } catch (error) {
    //handle error
    console.log(error);
  }
}
export { fetchWeatherData, asyncFetchWeatherData };
