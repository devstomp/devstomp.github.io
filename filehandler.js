var fileinput = $("input:file");

var index=0;
var fileplacing = $(".Uploads")
var filelists=[];


$(document).on('change', fileinput, function(e){

 var input = e.target;
filelists.push(input.files);
//files.push(input.files)
var storageRef = firebase.storage().ref();

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

  var storageRef = firebase.storage().ref();

      for (var i = 0; i < filelists.length; i++) {
  var Ref = storageRef.child(filelists[i][0].name);
  Ref.put(filelists[i][0]).then(function(snapshot) {
    console.log("Uploaded");
  });
}




    }
