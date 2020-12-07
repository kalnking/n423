var NxtTASK_SERVICE = (function() {
  var _db;
  var _getAllData = function(callback) {
    _db
      .collection("Project")
      .get()
      .then(function(querySnapshot) {
        callback(querySnapshot);
      });
  };

  var _getHomeContent = function() {
    let homeContent = `<div class="container" style="margin-top: 200px">
    <div class="row">
      <div class="col-lg">
          <img src="images/video-conference-5352757_1280.png" class="img-fluid"  alt="Responsive image">
      </div>
      <div class="col-sm" >
      <h1 class="display-3 text-success">Welcome to NxtTASK</h1>
      <h5 class="text-secondary">
      Strengthen your project management skills. Support a remote or on-campus team to keep your productivity consistent. Utilize the outline of tasks to delegate to team members. NXT level student task management.</h5>
      </div>
    </div>
  </div>`;

    return homeContent;
  };

  var _getProjectContent = function() {
    let projectContent = `<div class="projectContent">
    </div>`;
    return projectContent;
  };

  var _getDisplayProject = function(id) {
    let displayProject = ``;
    return displayProject;
  };

  var _getCreateProject = function(id) {
    let createContent = `
    <h1 class="display-3 text-success" style="margin-left: 100px;
margin-top: 50px;" >Create a Project</h1>
    <form style="margin-left: 100px;">      
    <div class="form-group col-md-8">     
                <input type="text" class="form-control" id="name" placeholder="Project Name">
      </div> 
    <div class="form-group col-md-8">     
        <input type="text" class="form-control" id="desc" placeholder="Enter Description">
      </div>
      <div class="form-group col-md-8">   
                <input type="text" class="form-control" name="tm[]" id="teamList" placeholder="Enter Team Member Name">
        <button style="border-radius: 50%; display: flex; float: right;" id="${id}" class="nameAddInput btn btn-success mb-2">+</button> </div>
      <div class="form-group col-md-8">   
                <input type="text" class="form-control" id="taskList" name="tsk[]"placeholder="Enter Task">
    <button style="border-radius: 50%; display: flex; float: right;" id="${id}" class="taskAddInput btn btn-success mb-2">+</button> </div>
    <div class="form-group col-md-8">
                <input type="text" class="form-control" id="date" placeholder="Enter Due Date">
    </div>
    </<h1>
    <div class=" saveButton form-group col-md-8">
    <button type="submit" id="${id}" class=" saveData btn btn-success">Save Project</button>
    </div>

  </form>
  `;

    return createContent;
  };

  var _updateData = function(id, name, desc, team, task, date) {
    console.log(id);
    let projectData = {
      projectName: name,
      projectDescription: desc,
      dueDate: date,
      taskList: task,
      teamMember: team
    };
    _db
      .collection("Project")
      .doc(id)
      .update(projectData)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        callback("New Project Added");
      })
      .catch(function(error) {
        console.log("Error adding document: ", error);
      });
  };

  var _addData = function(id, name, desc, team, task, date) {
    console.log(name);
    let projectData = {
      projectName: name,
      projectDescription: desc,
      dueDate: date,
      taskList: task,
      teamMember: team
    };
    _db
      .collection("Project")
      .add(projectData)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        callback("New Project Added");
      })
      .catch(function(error) {
        console.log("Error adding document: ", error);
      });
  };

  var _getEditDataContent = function(id) {
    let editContent = `<div class="editProject"></div>`;

    return editContent;
  };

  var _deleteData = function(id) {
    _db
      .collection("Project")
      .doc(id)
      .delete();
    console.log("DELETED!!");
    callback("Project Deleted");
  };

  var _initFirebase = function(callback) {
    firebase
      .auth()
      .signInAnonymously()
      .then(function(result) {
        console.log("connected");
        _db = firebase.firestore();
        callback();
      });
  };

  return {
    initFirebase: _initFirebase,
    getAllData: _getAllData,
    addData: _addData,
    updateData: _updateData,
    deleteData: _deleteData,
    getHomeContent: _getHomeContent,
    getProjectContent: _getProjectContent,
    getDisplayProject: _getDisplayProject,
    getCreateProject: _getCreateProject,
    getEditDataContent: _getEditDataContent
  };
})();
