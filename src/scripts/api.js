function fetchWeatherData(location) {
  return fetch(
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
      return jsonData;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
}

//async await version
async function asyncAwaitFetchWeatherData(location) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=106c9a3f76aa4badb00163914241605&q=${location}&days=3&aqi=no&alerts=no`,
      { mode: 'cors' },
    );
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

export { fetchWeatherData, asyncAwaitFetchWeatherData };
