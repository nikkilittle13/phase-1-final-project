/*fetch("https://www.7timer.info/bin/civillight.php?lon=-75.16&lat=39.95&ac=0&unit=metric&output=json&tzshift=0")
  .then(resp => resp.json())
  .then(data => {
    const h2 = document.createElement("h2");
    const dateFromAPI = data.dataseries[0].date;
    const date = new Date(dateFromAPI.toString().substr(0, 4), dateFromAPI.toString().substr(4, 2) - 1, dateFromAPI.toString().substr(6, 2));

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    };

    const formattedDate = date.toLocaleDateString('en-US', options);
    h2.textContent = formattedDate;
    document.querySelector(".day-of-week").appendChild(h2);
  })
  .catch(error => console.log(error));
  */

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
  const jsonItem = document.createElement('div');
 // const jsonItem = document.createElement('div');
 // const jsonItem = document.createElement('div');

  jsonDate.textContent = `${formattedDate}`;

  jsonItem.textContent = `Weather: ${obj.weather}, Max Temp: ${obj.temp2m.max}, Min Temp: ${obj.temp2m.min}, Max Wind Speed: ${obj.wind10m_max}`;
  jsonContainer.appendChild(jsonDate);
  jsonContainer.appendChild(jsonItem);
});
})
.catch(error => console.log(error));


