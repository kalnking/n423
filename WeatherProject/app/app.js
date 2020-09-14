var apiKey = "03e1feb4053344258b8193752201409";
var baseURL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=`;

function getData(fullURL) {
  $.get(fullURL, function(data) {
    console.log(data);
    $(".content").html(
      `<p>City Name: ${data.location.name}</p>
    <p>State: ${data.location.region}</p>
    <p>Current Time: ${data.location.localtime}</p>`
    );
  }).catch(function(error) {
    console.log("your zipcode is invalid");
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
