var fileinput = $("input:file");
var index=0;
var fileplacing = $(".Uploads")
var filelists=[];
var authuser;
function initApp() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      authuser = user;
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log(displayName);
    } else {
        window.location.href = "login.html";
    }
  });
}
$(document).on('change', fileinput, function(e){
  var input = e.target;
  filelists.push(input.files);
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
    'Author': authuser.email,
  };
  var storageRef = firebase.storage().ref();
      for (var i = 0; i < filelists.length; i++) {
        var Ref = storageRef.child(filelists[i][0].name);
          Ref.put(filelists[i][0], metadata).then(function(snapshot) {
              console.log("Uploaded");
          });
      }
    }
