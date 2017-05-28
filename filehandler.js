var fileinput = $("input:file");

var index=0;
var fileplacing = $(".Uploads")
var filelists=[];
/*
function initApp() {
  // Listening for auth state changes.
  // [START authstatelistener]
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
      console.log(displayName);

      // [START_EXCLUDE]
  //    document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
    //  document.getElementById('quickstart-sign-in').textContent = 'Sign out';
      //document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
      // [END_EXCLUDE]
    } else {
        window.location.href = "login.html";
      // User is signed out.
      // [START_EXCLUDE]
    //  document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
      //document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
      //document.getElementById('quickstart-account-details').textContent = 'null';
      //document.getElementById('quickstart-oauthtoken').textContent = 'null';
      // [END_EXCLUDE]
    }
    // [START_EXCLUDE]
    //document.getElementById('quickstart-sign-in').disabled = false;
    // [END_EXCLUDE]
  });
  // [END authstatelistener]
  //document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
}

*/
$(document).on('change', fileinput, function(e){

 var input = e.target;
filelists.push(input.files);
//files.push(input.files)


    for (var i = 0; i < input.files.length; i++) {

          console.log(input.files[i].name);
          var div = document.createElement("div");
          div.className = "well well-sm";
          div.innerHTML = e.target.files[i].name;

          fileplace.appendChild(div);
        }
    console.log(input.files);
console.log(filelists);
  });
function post(){
  var metadata = {
    author: user.email,
  };
  var storageRef = firebase.storage().ref();

      for (var i = 0; i < filelists.length; i++) {
  var Ref = storageRef.child(filelists[i][0].name);
  Ref.put(filelists[i][0], metadata).then(function(snapshot) {
    console.log("Uploaded");
  });
}




    }
