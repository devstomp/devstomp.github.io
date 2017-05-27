var provider = new firebase.auth.GoogleAuthProvider();
var config = {
  apiKey: "AIzaSyDp3FFbviWq7Z-IhECOGdqY_ezzAj3197I",
  authDomain: "brigade-929f9.firebaseapp.com",
  databaseURL: "https://brigade-929f9.firebaseio.com",
  projectId: "brigade-929f9",
  storageBucket: "brigade-929f9.appspot.com",
  messagingSenderId: "54936219962"
};
function signin(){
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log(user);
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
}
