var searchForm = document.querySelector("#search-form");
var citySearch = document.querySelector("#city-search");
var cityHeader = document.querySelector("#place");
var currentDate = document.querySelector("#current-date");
var currentIcon = document.querySelector("#current-date-icon");
var currentTemp = document.querySelector("#current-date-temp");
var currentHumidity = document.querySelector("#current-date-humidity");
var currentWind = document.querySelector("#current-date-wind");
var uvIndex = document.querySelector("#current-date-uv")
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
    displayCurrentWeather (city, forecast);
  }).catch(function (error) {
    console.warn(error);
  });
}

var displayCurrentWeather = function(present, forecast) {
  while (currentIcon.firstChild) {
    currentIcon.firstChild.remove()
  }

  caption.setAttribute("class", "hidden")
  cards.removeAttribute("class", "hidden")

  cityHeader.textContent = present.name
  currentDate.textContent = moment().format("YYYY-MM-DD");
  var weatherIcon = document.createElement('img');
  weatherIcon.setAttribute("src", "http://openweathermap.org/img/w/" + present.weather[0].icon + ".png");
  currentIcon.appendChild(weatherIcon);
  currentTemp.innerHTML = "Temperature:" + " " + present.main.temp + "&deg;C"
  currentHumidity.innerHTML = "Humidity:" + " " + present.main.humidity + "&percnt;"
  currentWind.innerHTML = "Wind Speed:" + " " + present.wind.speed + " " + "km/h"
  uvIndex.textContent = "UV Index:" + " " + forecast.current.uvi
  
  if (forecast.current.uvi >= 0 && forecast.current.uvi < 3) {
    uvIndex.setAttribute("class", "low")
  } else if (forecast.current.uvi >= 3 && forecast.current.uvi < 6) {
    uvIndex.setAttribute("class", "moderate")
  } else if (forecast.current.uvi >= 6 && forecast.current.uvi < 8) {
    uvIndex.setAttribute("class", "high")
  } else if (forecast.current.uvi >= 8 && forecast.current.uvi < 11) {
    uvIndex.setAttribute("class", "very-high")
  } else if (forecast.current.uvi >= 11) {
    uvIndex.setAttribute("class", "extreme")
  }

  console.log(present);
  console.log(forecast);
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