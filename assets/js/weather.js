var searchForm = document.querySelector("#search-form");
var citySearch = document.querySelector("#city-search");
var cityHeader = document.querySelector("#place");
var currentDate = document.querySelector("#current-date")
var currentWeather = document.querySelector("#current-date-weather")
var caption = document.querySelector("#caption")
var cards = document.querySelector(".all-cards")

var getCurrentWeatherInfo = function(city) {
  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=dba30060fc955c512265e193bbe9bba7&units=metric";

  fetch(apiUrl).then(function(response) {
    console.log(response);
    response.json().then(function(data) {
      displayCurrentWeather(data, city);
    });
  });
};

var displayCurrentWeather = function(data, search) {
  caption.setAttribute("class", "hidden")
  cards.removeAttribute("class", "hidden")
  cityHeader.textContent = data.name
  currentDate.textContent = moment().format("YYYY-MM-DD");
  var weatherIcon = document.createElement('img');
  weatherIcon.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
  currentWeather.appendChild(weatherIcon);
  console.log(weatherd);
  console.log(search);
};

var formSubmitHandler = function(event) {
  event.preventDefault();
  console.log(event);
  var cityName = citySearch.value.trim();

  if (cityName) {
    getCurrentWeatherInfo(cityName);
    citySearch.value = "";
  } else {
    alert("Please enter a city");
  } 
};



searchForm.addEventListener("submit", formSubmitHandler);