var people = {};

function getPeopleData() {
  $.getJSON("data/data.json", function(data) {
    parsePeople(data.People);
  });
}

function parsePeople(peopleArray) {
  $.each(peopleArray, function(idx, value) {
    $(".content").append(`<p>${value.name} ${value.lname}</p>`);
  });
}

$(document).ready(function() {
  getPeopleData();
});
