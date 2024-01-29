document.addEventListener("DOMContentLoaded", (event) => {
fetch("https://www.7timer.info/bin/civillight.php?lon=-75.16&lat=39.95&ac=0&unit=metric&output=json&tzshift=0")
.then(resp => resp.json())
.then(data => {
const jsonContainer = document.getElementById('jsonContainer');
const dataseries = data.dataseries;

dataseries.forEach (obj => {
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


  const maxTempCelsius = obj.temp2m.max;
  const minTempCelsius = obj.temp2m.min;
  const maxTempFahrenheit = Math.round((maxTempCelsius * 9/5) + 32);
  const minTempFahrenheit = Math.round((minTempCelsius * 9/5) + 32);

  function getWeatherCondition(weather) {
    const weatherMap = {
      lightrain: "Light Rain",
      cloudy: "Cloudy",
      clear: "Clear",
      snow: "Snow",
    };

    return weatherMap[weather] || weather;
  }

  const jsonDate = document.createElement('h2');
  const weatherIcon = document.createElement('div');
  const activitySelection = document.createElement('select');

  const option1 = document.createElement('option');
  option1.value = "";
  option1.textContent = "--Please choose an activity--";

  const option2 = document.createElement('option');
  option2.value = "run";
  option2.textContent = "Go for a run outside";

  const option3 = document.createElement('option');
  option3.value = "clean";
  option3.textContent = "Deep clean a room in the house";

  const option4 = document.createElement('option');
  option4.value = "swim";
  option4.textContent = "Swim 20 laps";

  const option5 = document.createElement('option');
  option5.value = "dance";
  option5.textContent = "Indoor dance workout";

  const option6 = document.createElement('option');
  option6.value = "other";
  option6.textContent = "Other";

  activitySelection.appendChild(option1);
  activitySelection.appendChild(option2);
  activitySelection.appendChild(option3);
  activitySelection.appendChild(option4);
  activitySelection.appendChild(option5);
  activitySelection.appendChild(option6);
  
  jsonDate.textContent = `${formattedDate}`; 

  weatherIcon.innerHTML = `
  <div>Weather: ${getWeatherCondition(obj.weather)}</div>
  <div>Max Temp: ${maxTempFahrenheit}°F</div>
  <div>Min Temp: ${minTempFahrenheit}°F</div>
  <div>Wind Speed: ${obj.wind10m_max} m/s</div>
  `;


  const changeActivityButton = document.createElement('button');
  changeActivityButton.textContent = 'Change Activity';
  

  activitySelection.addEventListener('change', () => {
   const selectedOption = activitySelection.value;

    if (selectedOption === "other") {
      const inputContainer = document.createElement('div');
        const inputBox = document.createElement('input');
        inputBox.type = 'text';
        inputBox.placeholder = "Enter activity";
          const submitButton = document.createElement('button');
          submitButton.type = 'submit';
          submitButton.textContent = 'Enter';

      inputContainer.appendChild(inputBox);
      inputContainer.appendChild(submitButton);
      jsonContainer.replaceChild(inputContainer, activitySelection);


      submitButton.addEventListener('click', () => {
        const submittedActivity = inputBox.value;
        const submittedActivityDisplay = document.createElement('p'); 
        submittedActivityDisplay.classList = "submitted-activity-style"
        submittedActivityDisplay.textContent = `Activity: ${submittedActivity}`;
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
        selectedOptionDisplay.textContent = `Activity: ${selectedOptionText}`;
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
})
.catch(error => console.log(error));
});
