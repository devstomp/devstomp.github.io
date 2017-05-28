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
    //    window.location.href = "login.html";
    }
  });
}
$(document).on('change', fileinput, function(e){
  var input = e.target;
  filelists.push(input.files);

        console.log(input.files[0].name);
        var div = document.createElement("div");
        div.className = "well well-sm";
        div.innerHTML = e.target.files[0].name;
        fileplace.appendChild(div);

    console.log(input.files);
    console.log(filelists);
  });

function post(){
  var database = firebase.database();
  var d = new Date();
    var metadata = {
      'Author': authuser.email,
    };
  var timenow = d.getTime();
  var filepath=[];
  var snippet = $("#htmlsnippet").value;
  var maincomment = $("#comment").value;
  var storageRef = firebase.storage().ref();
      for (var i = 0; i < filelists.length; i++) {
        filepath.push(authuser.email+'/'+ filelists[i][0].name);
        var Ref = storageRef.child(authuser.email+'/'+ filelists[i][0].name);
          Ref.put(filelists[i][0], metadata).then(function(snapshot) {
              console.log("Uploaded");
          });
      }
      var comments=[['','']];

    var postData = {
      "Time": timenow,
      "Author": authuser.email,
      "MainComment":maincomment,
      "FilePath":filepath,
      "Type":"HTML",
      "Snippet":snippet,
      "Comments":comments
    };
    var newPostKey = firebase.database().ref().child('HTML').push().key;
     var updates = {};
     updates['HTML/' + newPostKey] = postData;
     updates['users/'+authuser+email+'/'+newPostKey] = postData;
     firebase.database().ref().update(updates);
    }
