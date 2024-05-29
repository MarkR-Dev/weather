function formatData(data) {
  const formattedData = {};

  formatMiscData(formattedData, data);
  formatDays(formattedData, data);

  return formattedData;
}

function formatDateTime(dateTime) {
  let formattedDateTime = dateTime.split(' ');
  formattedDateTime[0] = formattedDateTime[0].split('-').reverse().join('-');
  return formattedDateTime.reverse().join(' ');
}

// Format data about location
function formatMiscData(obj, data) {
  obj.location = data.location.name;
  obj.country = data.location.country;
  obj.localTime = formatDateTime(data.location.localtime);
  obj.lastUpdated = formatDateTime(data.current.last_updated);
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

export { formatData };
