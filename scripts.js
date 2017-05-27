
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
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
   user = result.user;

}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});

initApp();
}
function signingithub(){
  var provider = new firebase.auth.GithubAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
  var token = result.credential.accessToken;
  // The signed-in user info.
 user = result.user;
  console.log(user);
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  alert(error);
  console.log(error);
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
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
