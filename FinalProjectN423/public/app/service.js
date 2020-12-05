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
    let projectContent = `<div class="projectContent"></div>`;
    return projectContent;
  };

  var _getDisplayProject = function(id) {
    let displayProject = ``;
    return displayProject;
  };

  var _getCreateProject = function(id) {
    let createContent = `
    <h1 class="display-3 text-success">Create a Project</h1>
    <form>      
    <div class="form-group col-md-8">     
        <input type="desc" class="form-control" id="desc" placeholder="Enter Description">
      </div>
      <div class="form-group col-md-8">   
        <input type="name" class="form-control" id="name" placeholder="Enter Team Member Name">
      </div>
      <div class="form-group col-md-8">   
      <input type="name" class="form-control" id="task" placeholder="Enter Task">
    </div>
    <div class="form-group col-md-8">
      <input type="date" class="form-control" id="date" placeholder="Enter Due Date">
    </div>
    </div>
    <div class="form-group col-md-8">
    <button type="submit" class="btn btn-success">Save Project</button>
    </div>

  </form>
  `;

    return createContent;
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
    getHomeContent: _getHomeContent,
    getProjectContent: _getProjectContent,
    getDisplayProject: _getDisplayProject,
    getCreateProject: _getCreateProject
  };
})();
