var config = {
  apiKey: "AIzaSyDp3FFbviWq7Z-IhECOGdqY_ezzAj3197I",
  authDomain: "brigade-929f9.firebaseapp.com",
  databaseURL: "https://brigade-929f9.firebaseio.com",
  projectId: "brigade-929f9",
  storageBucket: "brigade-929f9.appspot.com",
  messagingSenderId: "54936219962"
};

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
