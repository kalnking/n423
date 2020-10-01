var students = [
  {
    name: "Todd"
  },
  {
    name: "Kalene"
  }
];

if (localStorage) {
  //alert("I have it");
  localStorage.setItem("Students", JSON.stringify(students));
  let st = JSON.parse(localStorage.getItem("Students"));
  console.log(students);
} else {
  //alert("nope");
}
