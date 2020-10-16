var _db;
var fakeNews = {
  fName: "Todd",
  lName: "Shelton"
};

function initFirebase() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log("user is there", displayName, email, user);
      console.log("connected");
      _db = firebase.firestore();
    } else {
      console.log("user not there");
    }
  });
}

function updateUser(disName, photo) {
  firebase.auth().currentUser.updateProfile({
    displayName: disName,
    photoURL: photo
  });
}

function initListeners() {
  $("#add").click(function() {
    _db
      .collection("names")
      .add(fakeNews)
      .then(function(doc) {
        console.log("added data and here is ref number: ", doc.id);
      });
  });

  //this gets one
  //   _db
  //  .collection("names")
  //  .doc("1ltjFbjjhADZA3izVpPz")
  //  .get()
  //  .then(function(querySnapshot) {
  // querySnapshot.forEach(function(doc) {
  //   console.log(doc.data() + " " + doc.id);
  // });

  $("#signup").click(function() {
    let email = "kaln@iu.edu";
    let displayName = "Kalene Kingery";
    let password = "password";
    let photoUrl = "https://example.com/jane-q-user/profile.jpg";
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        console.log(result.user.uid);
        if (result.user) {
          result.user.updateProfile({
            displayName: "Kalene Kingery",
            photoURL: "https://example.com/jane-q-user/profile.jpg"
          });
        }
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage + "" + errorCode + "", error);
      });
  });

  $("#login").click(function() {
    let email = "kaln@iu.edu";
    let password = "password";
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  });

  $("#logout").click(function() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log("logged out");
        _db = "";
      })
      .catch(function(error) {
        console.log("error signing out");
      });
  });

  $("#get").click(function() {
    //this gets all
    _db
      .collection("names")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // console.log(doc.data() + " " + doc.id);
          console.log(doc.data(), doc.id);
        });
      });
  });
}

$(document).ready(function() {
  try {
    let app = firebase.app();
    initFirebase();
    initListeners();
  } catch (e) {
    console.error(e);
  }
});
