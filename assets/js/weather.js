var getWeatherInfo = function(city) {
  // format the github api url
  var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=dba30060fc955c512265e193bbe9bba7&units=metric";

  // make a get request to url
  fetch(apiUrl).then(function(response) {
    console.log(response);
    response.json().then(function(data) {
      console.log(data);
    });
  });
};

getWeatherInfo("toronto");