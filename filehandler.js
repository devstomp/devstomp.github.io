var fileinput = $("input:file");

var index=0;
var fileplacing = $(".Uploads")
var files = {};


$(document).on('change', fileinput, function(e){

 var input = e.target;

//files.push(input.files)

    for (var i = 0; i < input.files.length; i++) {

          console.log(input.files[i].name);
          var div = document.createElement("div");
          div.className = "well well-sm";
          div.innerHTML = e.target.files[i].name;

          fileplace.appendChild(div);
        }
    console.log(input.files);

  });
