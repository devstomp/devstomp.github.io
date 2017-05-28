
var user;
var config = {
  apiKey: "AIzaSyDp3FFbviWq7Z-IhECOGdqY_ezzAj3197I",
  authDomain: "brigade-929f9.firebaseapp.com",
  databaseURL: "https://brigade-929f9.firebaseio.com",
  projectId: "brigade-929f9",
  storageBucket: "brigade-929f9.appspot.com",
  messagingSenderId: "54936219962"
};

function signingoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(result) {
  var token = result.credential.accessToken;
   user = result.user;
}).catch(function(error) {

  var errorCode = error.code;
  var errorMessage = error.message;
  var email = error.email;
  var credential = error.credential;
});

initApp();
}
function signingithub(){
  var provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
  var token = result.credential.accessToken;
 user = result.user;
  console.log(user);
}).catch(function(error) {
  var errorCode = error.code;
  alert(error);
  console.log(error);
  var errorMessage = error.message;
  var email = error.email;
  var credential = error.credential;
});
initApp();
}
function loginButton() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
function initApp() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log(displayName);
      window.location.href = "home.html";
        } else {
    }
  });
}
