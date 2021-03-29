var searchForm = document.querySelector("#search-form");
var citySearch = document.querySelector("#city-search");
var cityHeader = document.querySelector("#place");
var currentDate = document.querySelector("#current-date");
var currentIcon = document.querySelector("#current-date-icon");
var currentTemp = document.querySelector("#current-date-temp");
var currentHumidity = document.querySelector("#current-date-humidity");
var currentWind = document.querySelector("#current-date-wind");
var caption = document.querySelector("#caption");
var cards = document.querySelector(".all-cards");


var getWeatherInfo = function () { 
  fetch("http://api.openweathermap.org/data/2.5/weather?q=" + document.querySelector("#city-search").value + "&appid=dba30060fc955c512265e193bbe9bba7&units=metric").then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  }).then(function (data) {

	city = data;

	return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude={part}&appid=dba30060fc955c512265e193bbe9bba7");

  }).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  }).then(function (forecast) {
    console.log(city, forecast);
  }).catch(function (error) {
    console.warn(error);
  });
}

var displayCurrentWeather = function(data, search) {
  while (currentIcon.firstChild) {
    currentIcon.firstChild.remove()
  }
  caption.setAttribute("class", "hidden")
  cards.removeAttribute("class", "hidden")
  cityHeader.textContent = data.name
  currentDate.textContent = moment().format("YYYY-MM-DD");
  var weatherIcon = document.createElement('img');
  weatherIcon.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
  currentIcon.appendChild(weatherIcon);
  currentTemp.innerHTML = "Temperature:" + " " + data.main.temp + "&deg;C"
  currentHumidity.innerHTML = "Humidity:" + " " + data.main.humidity + "&percnt;"
  currentWind.innerHTML = "Wind Speed:" + " " + data.wind.speed + " " + "km/h"
  console.log(data);
  console.log(search);
};

var formSubmitHandler = function(event) {
  event.preventDefault();
  console.log(event);
  var cityName = citySearch.value.trim();

  if (cityName) {
    getWeatherInfo(cityName);
    citySearch.value = "";
  } else {
    alert("Please enter a city");
  } 
};




searchForm.addEventListener("submit", formSubmitHandler);