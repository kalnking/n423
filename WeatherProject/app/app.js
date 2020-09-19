var apiKey = "03e1feb4053344258b8193752201409";
var baseURL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=`;
var forecastBaseUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=46203&days=`;

function getData(fullURL) {
  $.get(fullURL, function(data) {
    console.log(data);
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

function initListeners() {
  $("#getWeather").click(function() {
    var zip = $("#zipcode").val();
    var fullURL = baseURL + zip;
    console.log(fullURL);
    getData(fullURL);
  });
}

$(document).ready(function() {
  initListeners();
});
