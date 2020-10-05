var data = {
  students: {
    name: ["Kalene"],
    //  age: ["27"],
    //  phone: ["3175169535"],
    //  email: ["kalnking@iu.edu"],
    // class: ["N423"]
    empty: true
  }
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
    localStorage.setItem("log_students", JSON.stringify(data.students));
  } else {
    data = JSON.parse(localStorage.getItem("log_students"));
  }

  // var newStudent = document.getElementById("addition").value;
  //console.log(newStudent);
  // students.Students.push({ name: newStudent });
  // localStorage.setItem("Students", JSON.stringify(students));
}

function addStudents() {
  data.students.name.push($("#name").val());
  localStorage.setItem("log_students", JSON.stringify(data.students));
}

function showStudents() {
  let studentData = JSON.parse(localStorage.getItem("log_students"));
  $(".log").html("");
  $.each(studentData.name, function(idx, value) {
    $(".log").append(`${value}`);
  });
}

getData();
