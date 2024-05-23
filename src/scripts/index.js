import '../css/reset.css';
import '../css/style.css';

function fetchData(location) {
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=106c9a3f76aa4badb00163914241605&q=${location}&days=3&aqi=no&alerts=no`,
    { mode: 'cors' },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Could not find location please try again.');
      }

      return response.json();
    })
    .then((data) => {
      console.log('promise', data);
    })
    .catch((error) => {
      console.log('promise', error);
    });
}

fetchData('london');

//async await version
// async function asyncFetchData(location) {
//   try {
//     const response = await fetch(
//       `http://api.weatherapi.com/v1/forecast.json?key=106c9a3f76aa4badb00163914241605&q=${location}&days=3&aqi=no&alerts=no`,
//       { mode: 'cors' },
//     );

//     if (!response.ok) {
//       throw new Error('Could not find location please try again.');
//     }
//     const data = await response.json();
//     console.log('async', data);
//   } catch (err) {
//     console.log('async', err);
//   }
// }

// asyncFetchData('london');
