let now = new Date();

let p = document.querySelector("#time");

function getTime() {
  let hours = now.getHours();
  let minutes = now.getMinutes();
  return `${hours > 10 ? hours : `0${hours}`}:${
    minutes > 10 ? minutes : `0${minutes}`
  }`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];

p.innerHTML = ` ${day} ${getTime()}`;

/**
 * End static
 */

let apiKey = "e3f308dbc1f40462b7213a15fa40687f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&`;

function showTemperature(response) {
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.round(response.data.main.temp);

  let weatherDescription = document.querySelector("#sky");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} Km/h`;

  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.name;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;

}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let searchValue = searchInput.value.trim();
  axios.get(`${apiUrl}q=${searchValue}`).then(showTemperature);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  let FahrenheitTemperature= (celsiusTemperature * 9) /5 + 32;
  currentTemp.innerHTML=Math.round(FahrenheitTemperature);
  let celsiusLink = document.querySelector("#celsius-link");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  celsiusLink.removeAttribute("class");
  fahrenheitLink.setAttribute("class", "active");
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
  let celsiusLink = document.querySelector("#celsius-link");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.removeAttribute("class");
  celsiusLink.setAttribute("class", "active");
}


let celsiusTemperature= null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link")
celsiusLink.addEventListener("click", showCelsiusTemperature);



// geo location

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  axios.get(`${apiUrl}lat=${lat}&lon=${long}`).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentPosition);

axios.get(`${apiUrl}q=mexico city`).then(showTemperature);
