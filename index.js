document.addEventListener("DOMContentLoaded", (event) => {
fetch("https://www.7timer.info/bin/civillight.php?lon=-75.16&lat=39.95&ac=0&unit=metric&output=json&tzshift=0")
.then(resp => resp.json())
.then(data => {
const jsonContainer = document.getElementById('jsonContainer');
const dataseries = data.dataseries;

dataseries.forEach (obj => {
  const formattedDate = formatDate(obj.date);
  const maxTempCelsius = convertToCelsius(obj.temp2m.max);
  const minTempCelsius = convertToCelsius(obj.temp2m.min);

  const date = createDate(formattedDate);
  const weatherIcon = createWeatherIcon();
  const activitySelection = createActivitySelection();
})
.catch(error => console.log(error));

function formatDate(dateFromAPI) {
  const jsonDate = new Date(dateFromAPI.toString().substr(0, 4), dateFromAPI.toString().substr(4, 2) - 1, dateFromAPI.toString().substr(6, 2));
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  };
  return jsonDate.toLocaleDateString('en-US', dateOptions);
};

function convertToCelsius(temp) {
  return Math.round((temp * 9/5) + 32);
}
  
  function getWeatherCondition(weather) {
    const weatherMap = {
      lightrain: "Light Rain",
      pcloudy: "Partly Cloudy",
      cloudy: "Cloudy",
      clear: "Clear",
      snow: "Snow",
    };
    return weatherMap[weather] || weather;
  }

  function createActivitySelection() {
  const activitySelection = document.createElement('select');

  const activities = [
    {value: "", text: "--Please choose an activity--"},
    {value: "run", text: "Go for a run outside"},
    {value: "clean", text: "Deep clean a room in the house"},
    {value: "swim", text: "Swim 20 laps"},
    {value: "dance", text: "Indoor dance workout"},
    {value: "other", text: "Other"}
  ];

  activities.forEach(activity => {
    const activityElement = document.createElement('option');
    activityElement.value = activity.value;
    activityElement.text = activity.text;
    activitySelection.appendChild(activityElement)
  });
};

function createDate(formattedDate) {
  const date = document.createElement('h2');
  date.textContent = `${formattedDate}`; 
  return date;
};

function createWeatherIcon() {
  const weatherIcon = document.createElement('div');
  weatherIcon.innerHTML = `
  <div>Weather: ${getWeatherCondition(obj.weather)}</div>
  <div>Max Temp: ${maxTempFahrenheit}°F</div>
  <div>Min Temp: ${minTempFahrenheit}°F</div>
  <div>Wind Speed: ${obj.wind10m_max} m/s</div>
  `;
  return weatherIcon;
}


  const changeActivityButton = document.createElement('button');
  changeActivityButton.textContent = 'Change Activity';

  const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Enter';
  

  activitySelection.addEventListener('change', () => {
   const selectedOption = activitySelection.value;

    if (selectedOption === "other") {
      const inputContainer = document.createElement('div');
        const inputBox = document.createElement('input');
        inputBox.type = 'text';
        inputBox.placeholder = "Enter activity";
          
      inputContainer.appendChild(inputBox);
      inputContainer.appendChild(submitButton);
      jsonContainer.replaceChild(inputContainer, activitySelection);


      submitButton.addEventListener('click', () => {
        const submittedActivity = inputBox.value;
        const submittedActivityDisplay = document.createElement('p'); 
        submittedActivityDisplay.classList = "submitted-activity-style"
        submittedActivityDisplay.textContent = `Activity: ${submittedActivity} `;
        submittedActivityDisplay.appendChild(changeActivityButton);

        jsonContainer.replaceChild(submittedActivityDisplay, inputContainer);

        changeActivityButton.addEventListener("click", () => {
          jsonContainer.replaceChild(activitySelection, submittedActivityDisplay);
        });
      });
    } else {
      const selectedOptionText = activitySelection.options[activitySelection.selectedIndex].textContent;
        const selectedOptionDisplay = document.createElement('p');
        selectedOptionDisplay.className = "display-style"
        selectedOptionDisplay.textContent = `Activity: ${selectedOptionText} `;
        selectedOptionDisplay.appendChild(changeActivityButton);

          jsonContainer.replaceChild(selectedOptionDisplay, activitySelection);

          changeActivityButton.addEventListener("click", () => {
            jsonContainer.replaceChild(activitySelection, selectedOptionDisplay);
          })
  };
});

  jsonContainer.appendChild(jsonDate);
  jsonContainer.appendChild(weatherIcon);
  jsonContainer.appendChild(activitySelection);
})
});
