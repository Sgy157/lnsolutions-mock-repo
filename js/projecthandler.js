let projects = document.getElementById("projects").getElementsByClassName("project");
let ballProject = projects[0];

ballProject.getElementsByTagName("button")[0].addEventListener("click", launchBallz);
function launchBallz(){
    var playarea = document.getElementById("playarea");
    playarea.innerHTML = "<iframe src=\"https://sgy157.github.io/ballz-html5-repo/\" title=\"ballzgame\"></iframe>";
    ballProject.getElementsByTagName("button")[0].hidden = true;
}