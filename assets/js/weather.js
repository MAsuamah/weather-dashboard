var searchForm = document.querySelector("#search-form");
var citySearch = document.querySelector("#city-search");

var getWeatherInfo = function(city) {

  var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=dba30060fc955c512265e193bbe9bba7&units=metric";

  fetch(apiUrl).then(function(response) {
    console.log(response);
    response.json().then(function(data) {
      console.log(data);
    });
  });
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