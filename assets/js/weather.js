//Selectors for Form & Search
var searchForm = document.querySelector("#search-form");
var citySearch = document.querySelector("#city-search");

//Selectors for History Column
var searchHistory = document.querySelector("#history");
var clearHistory = document.querySelector("#clear")

//Selectors for Home Caption and Forecast Cards 
var caption = document.querySelector("#caption");
var cards = document.querySelector(".all-cards");

//Selectors for Current Weather Card
var cityHeader = document.querySelector("#place");
var currentDate = document.querySelector("#current-date");
var currentIcon = document.querySelector("#current-date-icon");
var currentTemp = document.querySelector("#current-date-temp");
var currentHumidity = document.querySelector("#current-date-humidity");
var currentWind = document.querySelector("#current-date-wind");
var uvIndex = document.querySelector("#current-date-uv");

//Selectors for Day 1 Card
var firstDay = document.querySelector("#day-1-date");
var firstDayIcon = document.querySelector("#day-1-icon");
var firstDayTemp = document.querySelector("#day-1-temp");
var firstDayHumidity = document.querySelector("#day-1-humidity");

//Selectors for Day 2 Card
var secondDay = document.querySelector("#day-2-date");
var secondDayIcon = document.querySelector("#day-2-icon");
var secondDayTemp = document.querySelector("#day-2-temp");
var secondDayHumidity = document.querySelector("#day-2-humidity");

//Selectors for Day 3 Card
var thirdDay = document.querySelector("#day-3-date");
var thirdDayIcon = document.querySelector("#day-3-icon");
var thirdDayTemp = document.querySelector("#day-3-temp");
var thirdDayHumidity = document.querySelector("#day-3-humidity");

//Selectors for Day 4 Card
var fourthDay = document.querySelector("#day-4-date");
var fourthDayIcon = document.querySelector("#day-4-icon");
var fourthDayTemp = document.querySelector("#day-4-temp");
var fourthDayHumidity = document.querySelector("#day-4-humidity");

//Selectors for Day 5 Card
var fifthDay = document.querySelector("#day-5-date");
var fifthDayIcon = document.querySelector("#day-5-icon");
var fifthDayTemp = document.querySelector("#day-5-temp");
var fifthDayHumidity = document.querySelector("#day-5-humidity");

//Fetch weather from OpenWeatherMap when a city is searched
var getWeatherInfo = function () { 
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + document.querySelector("#city-search").value + "&appid=dba30060fc955c512265e193bbe9bba7&units=metric").then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  }).then(function (data) {

	city = data;

	return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude={part}&appid=dba30060fc955c512265e193bbe9bba7&units=metric");

  }).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  }).then(function (forecast) {
    displayCurrentWeather (city, forecast);
  }).catch(function (error) {
    alert("We are unable to provide you with weather right now. Please try again at another time.");
  });
};

var displayCurrentWeather = function(present, forecast) {
  //Removing home caption and displaying forecast cards
  caption.setAttribute("class", "hidden");
  cards.removeAttribute("class", "hidden");

  //Removes previous weather icons when a new city is searched 
  removeChildren(currentIcon);

  removeChildren(firstDayIcon);

  removeChildren(secondDayIcon);

  removeChildren(thirdDayIcon);

  removeChildren(fourthDayIcon);

  removeChildren(fifthDayIcon);

  //Get local storage
  var savedCities = JSON.parse(localStorage.getItem("prevSearches")) || [];
  
  //Get name of city searched and save to variable
  var hist = present.name;

  //Check if item already exists in array Ref:https://www.codegrepper.com/code-examples/javascript/how+to+check+if+value+already+exists+in+array+javascript
  if(savedCities.indexOf(hist) == -1){
    //If city doesn't already exist push to array
    savedCities.push(hist); 
    //If city doesn't already exist add to history list
    var searchedCities = document.createElement("li");
    searchedCities.textContent = present.name;
    searchHistory.appendChild(searchedCities);
    searchedCities.setAttribute("class", "hist");
    searchedCities.setAttribute("id", present.name);
    searchedCities.setAttribute("onclick", "historyFunction(event)");
      } 

  localStorage.setItem("prevSearches", JSON.stringify(savedCities));

  //Display current weather
  cityHeader.textContent = present.name;
  currentDate.textContent = moment().format("dddd, MMMM Do YYYY");
  var weatherIcon = document.createElement("img");
  weatherIcon.setAttribute("src", "http://openweathermap.org/img/w/" + present.weather[0].icon + ".png");
  currentIcon.appendChild(weatherIcon);
  currentTemp.innerHTML = "Temperature:" + " " + present.main.temp + "&deg;C";
  currentHumidity.innerHTML = "Humidity:" + " " + present.main.humidity + "&percnt;";
  currentWind.innerHTML = "Wind Speed:" + " " + present.wind.speed + " " + "km/h";
  uvIndex.textContent = "UV Index:" + " " + forecast.current.uvi;
  
  //Colour code UV Index Ref: https://en.wikipedia.org/wiki/Ultraviolet_index
  if (forecast.current.uvi >= 0 && forecast.current.uvi < 3) {
    uvIndex.setAttribute("class", "low");
  } else if (forecast.current.uvi >= 3 && forecast.current.uvi < 6) {
    uvIndex.setAttribute("class", "moderate");
  } else if (forecast.current.uvi >= 6 && forecast.current.uvi < 8) {
    uvIndex.setAttribute("class", "high");
  } else if (forecast.current.uvi >= 8 && forecast.current.uvi < 11) {
    uvIndex.setAttribute("class", "very-high");
  } else if (forecast.current.uvi >= 11) {
    uvIndex.setAttribute("class", "extreme");
  };

  //Display day 1 of 5
  firstDay.textContent =  moment(). add(1,"days"). format("MMMM Do");
  var firstDaySymbol = document.createElement("img");
  firstDaySymbol.setAttribute("src", "http://openweathermap.org/img/w/" + forecast.daily[1].weather[0].icon + ".png");
  firstDayIcon.appendChild(firstDaySymbol);
  firstDayTemp.innerHTML = "Temp:" + " " + forecast.daily[1].temp.day + "&deg;C";
  firstDayHumidity.innerHTML = "Humidity:" + " " + forecast.daily[1].humidity + "&percnt;";

  //Display day 2 of 5
  secondDay.textContent =  moment(). add(2,"days"). format("MMMM Do");
  var secondDaySymbol = document.createElement("img");
  secondDaySymbol.setAttribute("src", "http://openweathermap.org/img/w/" + forecast.daily[2].weather[0].icon + ".png");
  secondDayIcon.appendChild(secondDaySymbol);
  secondDayTemp.innerHTML = "Temp:" + " " + forecast.daily[2].temp.day + "&deg;C";
  secondDayHumidity.innerHTML = "Humidity:" + " " + forecast.daily[2].humidity + "&percnt;";

  //Display day 3 of 5
  thirdDay.textContent =  moment(). add(3,"days"). format("MMMM Do");
  var thirdDaySymbol = document.createElement("img");
  thirdDaySymbol.setAttribute("src", "http://openweathermap.org/img/w/" + forecast.daily[3].weather[0].icon + ".png");
  thirdDayIcon.appendChild(thirdDaySymbol);
  thirdDayTemp.innerHTML = "Temp:" + " " + forecast.daily[3].temp.day + "&deg;C";
  thirdDayHumidity.innerHTML = "Humidity:" + " " + forecast.daily[3].humidity + "&percnt;";

  //Display day 4 of 5
  fourthDay.textContent =  moment(). add(4,"days"). format("MMMM Do");
  var fourthDaySymbol = document.createElement("img");
  fourthDaySymbol.setAttribute("src", "http://openweathermap.org/img/w/" + forecast.daily[4].weather[0].icon + ".png");
  fourthDayIcon.appendChild(fourthDaySymbol);
  fourthDayTemp.innerHTML = "Temp:" + " " + forecast.daily[4].temp.day + "&deg;C";
  fourthDayHumidity.innerHTML = "Humidity:" + " " + forecast.daily[4].humidity + "&percnt;";

  //Display day 5 of 5
  fifthDay.textContent =  moment(). add(5,"days"). format("MMMM Do");
  var fifthDaySymbol = document.createElement("img");
  fifthDaySymbol.setAttribute("src", "http://openweathermap.org/img/w/" + forecast.daily[5].weather[0].icon + ".png");
  fifthDayIcon.appendChild(fifthDaySymbol);
  fifthDayTemp.innerHTML = "Temp:" + " " + forecast.daily[5].temp.day + "&deg;C";
  fifthDayHumidity.innerHTML = "Humidity:" + " " + forecast.daily[5].humidity + "&percnt;";

  console.log(present);
  console.log(forecast);
};

//Handles API fetch by filling out form
var formSubmitHandler = function(event) {
  event.preventDefault();
  var cityName = citySearch.value.trim();
  if (cityName) {
    getWeatherInfo(cityName);
    citySearch.value = "";
  } else {
    alert("Please enter a city");
  } 
};

//Handles API fetch by clicking on item from history list
var historyFunction = function(event) {
  var cityId = event.target.id;

  var getWeatherfromHistList = function () { 
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + cityId + "&appid=dba30060fc955c512265e193bbe9bba7&units=metric").then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    }).then(function (data) {
  
    city = data;
  
    return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude={part}&appid=dba30060fc955c512265e193bbe9bba7&units=metric");
  
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    }).then(function (forecast) {
      displayCurrentWeather (city, forecast);
    }).catch(function (error) {
      alert("We are unable to provide you with weather right now. Please try again at another time.");
    });
  };

  getWeatherfromHistList();
};

//Handles child removal for history list and weather icons Ref: https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
var removeChildren = function(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  };
};

//Presents local storage as a history search list when page is loaded/refreshed
var savedCities = JSON.parse(localStorage.getItem("prevSearches")) || [];
searchHistory.innerHTML = savedCities.map(city => {
  return `<li id=${city} onclick="historyFunction(event)">${city}</li>`
}).join("");

//Gets weather info when form is submitted
searchForm.addEventListener("submit", formSubmitHandler);

//Clears local storage and history list
clearHistory.addEventListener("click", function() {
  localStorage.clear();
  removeChildren(searchHistory);
});




