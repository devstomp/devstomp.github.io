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
    contentMain();
    } else {
      // window.location.href = "login.html";
    }
  });
}
function contentMain(){
  var htmlRef = firebase.database().ref('HTML');
  htmlRef.orderByKey().on('value', function(snapshot){
    console.log(snapshot.val());
      snapshot.forEach(function(childSnapshot) {
          console.log(childSnapshot.val().Author);
        displayPost(childSnapshot.key,childSnapshot.val().Author,childSnapshot.val().Comments,childSnapshot.val().FilePath,childSnapshot.val().Type, childSnapshot.val().Snippet,  childSnapshot.val().MainComment, childSnapshot.val().Time);
      });
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
function displayPost(key,username, comments, filebin,type, snippet, mainC, time ){
      var outline = document.createElement("div");
      var inline= document.createElement("div");
      var main = document.createElement("p");
      var filesdownload = document.createElement("div");
      var commentsection = document.createElement("div");
      var load= document.createElement("div");
      var loadmore = document.createElement("button");
      var snippetSpace= document.createElement("div");
      var newComment= document.createElement("input");
      newComment.type="text";
      newComment.className ="form-control";
      newComment.id= key;
      inline.className="content-container";
      outline.className = "content-card";
      inline.style="margin:0%";
      load.style="text-align:center";
      loadmore.style="width:100%";
      loadmore.className="btn btn-default";
      main.innerHTML= username + ": "+mainC+" - "+type+" --- "+time;
      makeComment(key,comments.Author, comments.ProfilePic, comments.Words, commentsection);
      loadmore.onclick = function(){
        while (commentsection.hasChildNodes()) {
              commentsection.removeChild(commentsection.lastChild);
          }
      //  for(var i=0;i<comments.length; i++){
          makeComment(key,comments.Author, comments.ProfilePic, comments.Words, commentsection);
        //}
        load.removeChild(loadmore);
        load.appendChild(newComment);
        document.getElementById(key).onkeyup = function(event) {
          if(event.keyCode == 13){
          writeComment(newComment.id, newComment.value);
                }
         }
      }

    newComment.onkeyup(function(event){

      });
      if(snippet!=""){
        createSnippet(snippet,snippetSpace);
      }
      for(var i=0; i<filebin.length;i++){
        storageRef.child(filebin[i]).getDownloadURL().then(function(url) {
          makeFileDownload(getSecondPart(filebin[i]), url,filesdownload);
      });
      }
      inline.appendChild(main);
      inline.appendChild(snippetSpace);
      inline.appendChild(filesdownload);
      inline.appendChild(commentsection);
      inline.appendChild(load);
      load.appendChild(loadmore);
      outline.appendChild(inline);
      document.getElementById("Content").appendChild(outline);

    }
    function getSecondPart(str) {
    return str.split('/')[1];
}

function createSnippet(snip, dev){



  var temp = document.createElement('div');
  temp.innerHTML = snip;
  var htmlObject = temp.firstChild;
  dev.appendChild(htmlObject);
}
    function makeComment(key,name, img, text, dev){
      var div = document.createElement("div");
      div.className = "comments";
      var image= document.createElement("img");
      var fname = document.createElement("p");
      var speach =document.createElement("p");
      var breaking = document.createElement("br");
      fname.innerHTML = name;
      speach.innerHTML = text;
      image.src=img;
      image.className = "img-rounded";
      fname.style = "display:inline-block;font-size:60%;"
      speach.style = "font-size:40%;";
      div.appendChild(image);
      div.appendChild(fname);
      div.appendChild(breaking);
      div.appendChild(speach);
      dev.appendChild(div);
    }
    function writeComment(key,writing){
      var d = new Date();
      var comment={
        Author:authuser.displayName,
        Time:d.getTime(),
        ProfilePic:authuser.photoURL,
        Words: writing
      };
      var newcomment = firebase.database().ref().child('HTML/'+key+"/Comments/").set({comment});


    }
  function  makeFileDownload(finame, downloadurl, dev){
    var filename = finame;
    var a  = document.createElement("a");
    var button= document.createElement("button");
    var text = document.createElement("p");
    var hr = document.createElement("hr");

    text.innerHTML = filename;
    text.style="display:inline-block;"
    button.className = "btn btn-primary";
    button.innerHTML = "Download";
    a.href=downloadurl;
    a.download = filename;
    a.style="display:inline-block;";
    a.appendChild(button);
    dev.appendChild(hr);
    dev.appendChild(text);
    dev.appendChild(a);
    dev.appendChild(hr);

  }
