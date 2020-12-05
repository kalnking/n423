var idn = 0;

function init() {}

function initNavButtons() {
  $(".bars").click(function(e) {
    $(".nav-holder").css("display", "flex");
  });
  navHome();
  navProjectCreate();
  navProjectBrowse();
}

function navHome() {
  $("#homeButton").click(function(e) {
    console.log("home page");
    $("#allContent").html(NxtTASK_SERVICE.getHomeContent());
  });
}

function navProjectBrowse() {
  $("#projectButton").click(function(e) {
    console.log("project page");
    $("#allContent").html(NxtTASK_SERVICE.getProjectContent());
    NxtTASK_SERVICE.getAllData(displayData);
    console.log(idn);
  });
}

function navProjectCreate() {
  $("#createButton").click(function(e) {
    console.log("create page");
    $("#allContent").html(NxtTASK_SERVICE.getCreateProject());
    nameAddInput();
    taskAddInput();
    saveButton();
  });
}

function displayData(addData) {
  console.log(addData);
  var container = `<div>`;
  var num = 0;
  addData.forEach(function(doc) {
    var id = doc.id;
    var rawData = doc.data();
    container += ` 
      <div class="projects">
      <div class="card">
  <div class="card-header">
    Featured
  </div>
  <div class="card-body">
    <h5 class="card-title" id="${id}">${rawData.projectName}</h5>
    <p class="card-text" id="${id}">${rawData.projectDescription}</p>
    <a href="#" class="btn btn-success">View</a>
  </div>
</div>
      </div>`;
    num += 1;
    console.log(num);
  });
  container += "</div>";
  $(".projectContent").html(container);
  clickRecipe();
}

function saveButton() {
  $(".saveData").click(function(e) {
    e.preventDefault();

    var tm = $("input[name^=tm]")
      .map(function(idx, elem) {
        return $(elem).val();
      })
      .get();

    var tsk = $("input[name^=tsk]")
      .map(function(idx, elem) {
        return $(elem).val();
      })
      .get();

    console.log("add data");
    let name = $("#name")
      .val()
      .trim()
      .toLowerCase();
    let desc = $("#desc")
      .val()
      .trim()
      .toLowerCase();
    let date = $("#date")
      .val()
      .trim()
      .toLowerCase();
    let team = tm;
    let task = tsk;
    console.log(name);
    if (name != "" && desc != "" && team != "" && date != "" && task != "") {
      console.log("add data");

      NxtTASK_SERVICE.addData(name, desc, team, date, task);
    } else {
      alert("Oops! Please add a project. Thank you.");
    }
    $("#allContent").html(NxtTASK_SERVICE.getProjectContent());
    NxtTASK_SERVICE.getAllData(displayData);
  });
}

function clickRecipe() {
  $(".clicker").click(function(e) {
    var id = e.currentTarget.id;
    $("#allContent").html(NxtTASK_SERVICE.getDisplayProject(id));
    console.log("clicked");
    NxtTASK_SERVICE.getAllData(displayProject);
    idn = id;
  });
}

$(document).ready(function() {
  NxtTASK_SERVICE.initFirebase();
  $("#allContent").html(NxtTASK_SERVICE.getHomeContent());
  initNavButtons();
});
