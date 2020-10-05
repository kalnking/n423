globalThis.data = {
  students: []
};

//if (localStorage) {
// localStorage.setItem("Students", JSON.stringify(students));
// let st = JSON.parse(localStorage.getItem("Students"));
// console.log(students);
//} else {
// alert("nope");
//}

function getData() {
  //console.log("clicked");
  if (!localStorage.getItem("log_students")) {
    console.log("not working");
    localStorage.setItem(
      "log_students",
      JSON.stringify(globalThis.data.students)
    );
    // } else {
    //   globalThis.data = JSON.parse(localStorage.getItem("log_students"));
  }
}

//var newStudent = document.getElementById("addition").value;
//console.log(newStudent);
// students.Students.push({ name: newStudent });
// localStorage.setItem("students", JSON.stringify(students));}

function addStudents() {
  var form = document.querySelector("#formID");
  var formDataObj = Object.fromEntries(new FormData(form));
  var newStudent = {};
  for (let input of form.elements) {
    newStudent[input.name] = input.value;
  }
  console.log(newStudent);
  //var newStudent = document.getElementById("name").value;
  console.log(globalThis.data.students);
  data.students.push({
    name: newStudent.name,
    age: newStudent.age,
    phone: newStudent.phone,
    email: newStudent.email,
    class: newStudent.class
  });

  localStorage.setItem("data", JSON.stringify(data.students));
}

function showStudents() {
  let studentData = JSON.parse(localStorage.getItem("log_students"));
  $(".log").html("");
  $.each(globalThis.data.students, function(idx, value) {
    $(".log").append(`${value}`);
  });
}

getData();
