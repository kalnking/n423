var students = {};

function addListener() {
  $("nav a").click(function(e) {
    e.preventDefault();
    var btnID = this.id;
    console.log(students);
    getStudentData();
    //do what you want
  });
}

function getStudentData() {
  $(".loader").css("display", "block");
  $.getJSON("data/data.json", function(data) {
    //students = data.Students;
    parseStudents(data.Students);
  });
}

function parseStudents(studentsArray) {
  $.each(studentsArray, function(idx, value) {
    $(".content").append(`<p>${value.name} ${value.grade}</p>`);
    $.each(value.Classes, function(idx, classes) {
      $(".content").append(`<p>${classes}</p>`);
    });
    $(".loader").css("display", "none");
  });
}

$(document).ready(function() {
  //getStudentData();
  addListener();
});
