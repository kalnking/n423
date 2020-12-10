var idn = 0;

function init() {}

function initNavButtons() {
  $(".navbar-toggler").click(function(e) {
    console.log("click");
    $(".navbar-toggle-icon").css("display", "flex");
  });
  navHome();
  navProjectCreate();
  navProjectBrowse();
  navLogin();
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

function navLogin() {
  $("#loginButton").click(function(e) {
    console.log("login page");
    $("#allContent").html(NxtTASK_SERVICE.getLoginContent());
    NxtTASK_SERVICE.getAllData(displayData);
    console.log(idn);
  });
}

function editProjectButton() {
  $(".editProjectBtn").click(function(e) {
    var id = e.currentTarget.id;
    $("#allContent").html(NxtTASK_SERVICE.getEditDataContent(id));
    NxtTASK_SERVICE.getAllData(editProject);
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
<h1 class="display-3 text-success" style="margin-left: 100px;
margin-top: 50px;">Current Projects</h1>
      <div class="card col-9" style="margin-left: 100px;">
  <div class="card-body">
  
    <h5 class="card-title text-success" id="${id}">${rawData.projectName}</h5>
    <p class="card-text" id="${id}">${rawData.projectDescription}</p>
    <a href="#" id="${num}" class="clicker btn btn-success">View</a>
  </div>
</div>

     `;
    num += 1;
    console.log(num);
  });
  container += "</div>";
  $(".projectContent").html(container);
  clickProject();
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
    $("#allContent").html(NxtTASK_SERVICE.getAllData());
    NxtTASK_SERVICE.getAllData(displayData);
  });
}

function nameAddInput() {
  let testArray = [];
  let num = 1;
  $(".nameAddInput").click(function(e) {
    let teamMember = `$(<input type="text" class="fieldname${num}" />`;
    let testConsole = testArray.push(teamMember);
    num += 1;
    $(".teamMember").append(
      `<input name="tm[]" type="text" class="fieldname${num}" placeholder="Team Member Name #${num}" />`
    );
    console.log("AI" + testArray);
  });
}

function taskAddInput() {
  let testArray = [];
  let num = 1;
  $(".taskAddInput").click(function(e) {
    console.log("clicked");
    let taskList = `$(<input type="text" class="fieldname${num}" />`;
    let testConsole = testArray.push(taskList);
    num += 1;
    $(".taskList").append(
      `<input name="tsk[]" type="text" class="fieldnames${num}" placeholder="Task #${num}" />`
    );
    console.log("AI" + testArray);
  });
}

function displayProject(addData) {
  var doc = addData.docs[idn];
  console.log(doc);
  var id = doc.id;
  var rawData = doc.data();
  // var nameNum = 0;
  // var nameArray = rawData.name;
  // var rHTML = $.map(nameArray, function(value) {
  //  nameNum += 1;
  //  return "<span>" + nameNum + ". " + value + "</span></br>";
  //});
  // rHTML = rHTML.toString().replace(/,/g, "");

  // var taskArray = rawData.task;
  // taskArray = taskArray.toString().replace(/,/g, "</br>");

  var container = `
  <h1 class="display-3 text-success" style="margin-left: 100px; margin-top: 50px;">${rawData.projectName}</h1>
  <div class="card col-9" style="margin-left: 100px;">
  <div class="card-body">
    <h5 class="card-title text-success">Description</h5>
    <p class="card-text">${rawData.projectDescription}</p>
    <br>
    <br>
    <h5 class="card-title text-success">Tasks</h5>
    <p class="card-text">${rawData.taskList}</p>
    <br>
    <br>
    <h5 class="card-title text-success">Team Members</h5>
    <p class="card-text">${rawData.teamMember}</p>
    <br>
    <br>
    <h5 class="card-title text-success">Due Date</h5>
    <p class="card-text">${rawData.dueDate}</p>

    <a href="#" class="editProjectBtn text-success"  id="${id}" >Edit Project</a>
    <a id="${id}"  style="margin-left: 15px;" class="deleteData text-success">Completed</a>
   
  </div>
</div>`;
  $("#allContent").html(container);
  editProjectButton();
}

function editProject(addData) {
  var doc = addData.docs[idn];
  var id = doc.id;
  var rawData = doc.data();

  var container = `
  <h1 class="display-3 text-success" style="margin-left: 100px; margin-top: 50px;">Edit Project</h1>
  <form style="margin-left: 100px;">      
  <div class="form-group col-lg-8">     
              <input value="${rawData.projectName}" type="text" class="form-control" id="name" >
    </div> 
  <div class="form-group col-lg-8">     
      <input value="${rawData.projectDescription}"type="text" class="form-control" id="desc">
    </div>
    <div class="form-group col-lg-8">   
              <input type="text" class="form-control" name="tm[]" id="team">
              <button  value="${rawData.taskList}" style="margin-top: 15px;" class="nameAddInput btn btn-success mb-2">+</button> </div>
    <div class="form-group col-lg-8">   
              <input value="${rawData.teamMember}" type="text" class="form-control" id="task" name="tsk[]"placeholder="Enter Task"><button  style="margin-top: 15px;" class="taskAddInput btn btn-success mb-2">+</button> </div>
    <div class="form-group col-md-8" style="margin-botton: 20px;">
              <input  value="${rawData.dueDate}" type="text" class="form-control" id="date"></div>
  <a id="${id}" style="margin-left: 15px;" class="editSaveData text-success">Save Project</a>
  <a id="${id}"  style="margin-left: 15px;" class="deleteData text-success">Delete Project</a>

</form>  
    `;
  $(".editProject").html(container);
  // IngredAddInput();
  //  InstructAddInput();
  editSaveButton(id);
  deleteDataButton(id);
}

function editSaveButton(id) {
  $(".editSaveData").click(function(e) {
    console.log(id);
    e.preventDefault();
    var tsk = $("input[name^=tsk]")
      .map(function(idx, elem) {
        return $(elem).val();
      })
      .get();
    var tm = $("input[name^=tm]")
      .map(function(idx, elem) {
        return $(elem).val();
      })
      .get();

    let name = $("#name").val();
    let desc = $("#desc").val();
    let date = $("#date").val();
    let team = tm;
    let task = tsk;
    if (name != "" && desc != "" && date != "" && team != "" && task != "") {
      NxtTASK_SERVICE.updateData(id, name, desc, team, task, date);
    } else {
      alert("add data");
    }
    $("#allContent").html(NxtTASK_SERVICE.getProjectContent());
    NxtTASK_SERVICE.getAllData(displayData);
  });
}

function deleteDataButton() {
  $(".deleteData").click(function(e) {
    var id = e.currentTarget.id;
    NxtTASK_SERVICE.deleteData(id);
    $("#allContent").html(NxtTASK_SERVICE.get(getProjectContent));
    NxtTASK_SERVICE.getAllData(displayData);
  });
}

function clickProject() {
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
