var fileinput = $("input:file");
var index=0;
var fileplacing = $(".Uploads");
var snippet;
var maincomment;
var filelists=[];
var authuser;
function initApp() {
  snippet =document.getElementById("htmlsnippet");
  maincomment = document.getElementById("comment");
  firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
      authuser = user;



      console.log(displayName);
    } else {
    //    window.location.href = "login.html";
    }
  });
}
$(document).on('change', fileinput, function(e){
  var input = e.target;
  filelists.push(input.files);


        var div = document.createElement("div");
        div.className = "well well-sm";
        try{div.innerHTML = e.target.files[0].name;
        }catch(e){
          console.log(e);
        }
        fileplace.appendChild(div);

    console.log(input.files);

  });

function post(){
  var database = firebase.database();

  alert("snippet" + snippet + "    main comment" + maincomment);
  var d = new Date();
    var metadata = {
      'Author': authuser.uid,
    };
  var timenow = d.getTime();
  var filepath=[];

  var storageRef = firebase.storage().ref();
      for (var i = 0; i < filelists.length; i++) {
      try{  filepath.push(authuser.uid+'/'+ filelists[i][0].name);
        var Ref = storageRef.child(authuser.uid+'/'+ filelists[i][0].name);
          Ref.put(filelists[i][0], metadata).then(function(snapshot) {
              console.log("Uploaded");
          });

    }catch(e){
console.log(e);
    }
  }var comments=[['','']];

    var postData = {
      Time: timenow,
      Author: authuser.uid,
      MainComment:maincomment.value,
      FilePath:filepath,
      Type:"HTML",
      Snippet:snippet.value,
      Comments:comments
    };

    var newPostKey = firebase.database().ref().child('HTML').push().key;
     var updates = {};
     updates['HTML/' + newPostKey] = postData;
     updates['users/'+authuser.uid+'/'+newPostKey] = postData;
     return firebase.database().ref().update(updates);
    }
