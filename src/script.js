function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
  <img src="http://openweathermap.org/img/wn/${
    forecastDay.weather[0].icon
  }@2x.png"
  alt=""
  width="40"
  />
  <div class="weather-forecast-temperatures">
<span class="weather-forecast-min-temp">${Math.round(forecastDay.temp.min)}º |
</span>
 <span class="weather-forecast-max-temp">${Math.round(forecastDay.temp.max)}º
 </span>  
  </div>
  </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "3a4736a51fc0f7ecebe96f4cd90ddb87";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperatureElement = document.querySelector("#cur-temp");
  let mintempElement = document.querySelector("#temp-min");
  let maxtempElement = document.querySelector("#temp-max");
  let cityElement = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  celsiusMinTemp = response.data.main.temp_min;
  celsiusMaxTemp = response.data.main.temp_max;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  mintempElement.innerHTML = Math.round(response.data.main.temp_min);
  maxtempElement.innerHTML = Math.round(response.data.main.temp_max);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "3a4736a51fc0f7ecebe96f4cd90ddb87";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#cur-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  let minTempElement = document.querySelector("#temp-min");
  let fahrenheitMinTemp = (celsiusMinTemp * 9) / 5 + 32;
  minTempElement.innerHTML = Math.round(fahrenheitMinTemp);

  let maxTempElement = document.querySelector("#temp-max");
  let fahrenheitMaxTemp = (celsiusMaxTemp * 9) / 5 + 32;
  maxTempElement.innerHTML = Math.round(fahrenheitMaxTemp);
}

function showcelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#cur-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let minTempElement = document.querySelector("#temp-min");
  minTempElement.innerHTML = Math.round(celsiusMinTemp);

  let maxTempElement = document.querySelector("#temp-max");
  maxTempElement.innerHTML = Math.round(celsiusMaxTemp);
}

let celsiusTemperature = null;
let celsiusMinTemp = null;
let celsiusMaxTemp = null;
displayForecast();

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showcelsiusTemp);

let form = document.querySelector("#city-form");
form.addEventListener("submit", search);
