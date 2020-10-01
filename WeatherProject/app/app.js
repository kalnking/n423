var apiKey = "03e1feb4053344258b8193752201409";
var baseURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=`;
var forecastURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=`;
var endForecastURL = `&days=3`;

function getData(fullURL) {
  $.get(fullURL, function(data) {
    console.log(data);
    //parseForecast(data.forecast.forecastArray);
    let iconURL = data.current.condition.icon;
    $(".content").html(
      `<h2>${data.current.temp_f} &#8457</h2>
    <p>City Name: ${data.location.name}</p>
    <p>State: ${data.location.region}</p>
    <p>Country: ${data.location.country}</p>
    <p>Current Time: ${data.location.localtime}</p>
    <p>Lattitude: ${data.location.lat}</p>
    <p>Longitude: ${data.location.lon}</p>
    <p>Last Update: ${data.current.last_updated}</p>
    <img src="${iconURL}"></img>
    `
    );
  }).catch(function(error) {
    console.log("your zipcode is invalid");
    alert("Please enter a valid zipcode");
  });
}

function parseForecast(forecastArray) {
  $.each(forecastArray, function(idx, value) {
    console.log(value);
    $(".forecastContent").append(`<p>${data.forecast.forecastday.day}</p>`);
  });
}

function initListeners() {
  $("#getWeather").click(function() {
    var zip = $("#zipcode").val();
    var daycount = $("#forecastDays").val();
    var dayConnect = "&days=";
    var fullURL = baseURL + zip + dayConnect + daycount;
    console.log(fullURL);
    getData(fullURL);
  });
}

$(document).ready(function() {
  initListeners();
});
