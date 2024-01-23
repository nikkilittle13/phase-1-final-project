fetch("https://www.7timer.info/bin/civillight.php?lon=-75.16&lat=39.95&ac=0&unit=metric&output=json&tzshift=0")
.then(resp => resp.json())
.then(data => {
const jsonContainer = document.getElementById('jsonContainer');
const dataseries = data.dataseries;

dataseries.forEach(obj => {
  const dateFromAPI = obj.date;
  const date = new Date(dateFromAPI.toString().substr(0, 4), dateFromAPI.toString().substr(4, 2) - 1, dateFromAPI.toString().substr(6, 2));

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  };

  const formattedDate = date.toLocaleDateString('en-US', options);

  const jsonDate = document.createElement('h2');
  const weatherIcon = document.createElement('div');

  jsonDate.textContent = `${formattedDate}`;

  const maxTempCelsius = obj.temp2m.max;
  const minTempCelsius = obj.temp2m.min;
  const maxTempFahrenheit = (maxTempCelsius * 9/5) + 32;
  const minTempFahrenheit = (minTempCelsius * 9/5) + 32;

  weatherIcon.textContent = `Weather: ${obj.weather}, Max Temp: ${maxTempFahrenheit}, Min Temp: ${minTempFahrenheit}, Max Wind Speed: ${obj.wind10m_max}`;
  jsonContainer.appendChild(jsonDate);
  jsonContainer.appendChild(weatherIcon);
});
})
.catch(error => console.log(error));


