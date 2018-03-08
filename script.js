window.onload = function(){
	for(var i=0; i<sprints.length; i++){
		var sprintDiv = new SprintModel();
		sprintDiv.getSprintData();
		sprintDiv.createSprintDiv();
	}
}
document.getElementById("addIssue").addEventListener("click", function(){
	window.location.href = "issueform.html";
});
document.getElementById("filter").addEventListener("click", function(){
	document.getElementsByClassName("filterDiv")[0].style.display = "flex";
	var sprint = document.getElementsByClassName("sprintBtn")[0];
	var status = document.getElementsByClassName("statusBtn")[0];
	for(var i = 0; i < sprints.length; i++){
		var input = document.createElement("input");
		input.setAttribute("type", "radio");
		input.setAttribute("value", sprints[i].id);
		var div = document.createElement("div");
		div.innerHTML = sprints[i].name;
		div.appendChild(input);
		sprint.appendChild(div);
	}
	for (var prop in issueStatus) {
		var input = document.createElement("input");
		input.setAttribute("type", "radio");
		input.setAttribute("value", prop);
		var div = document.createElement("div");
		div.innerHTML = issueStatus[prop];
		div.appendChild(input);
		status.appendChild(div);
	}
});
document.getElementsByClassName("sprintBtn")[0].addEventListener("click", function(e){
	var issuesList = search(Number(e.target.value), issues, "sprint");
	var issue = new Issue();
	var div = document.getElementsByClassName("filterDiv")[0];
	issue.getIssueData(issuesList, div);
});
document.getElementsByClassName("statusBtn")[0].addEventListener("click", function(e){
	var issuesList = search(Number(e.target.value), issues, "status");
	var issue = new Issue();
	var div = document.getElementsByClassName("filterDiv")[0];
	issue.getIssueData(issuesList, div);
});
document.getElementsByClassName("main")[0].addEventListener("click", function(e){
	if(e.target.className == "sprintExpand"){
		e.target.className = e.target.className + " hide";
		var constrain = e.target.nextElementSibling.className;
		constrain = constrain.split(" ");
		e.target.nextElementSibling.className = constrain[0];

		var targetedSprint = search(e.target.parentNode.classList[1], sprints, "name", "id")[0];
		var issuesList = search(targetedSprint, issues, "sprint");
		e.target.parentNode.childNodes[3].style.display = "none";

		var issue = new Issue();
		issue.getIssueData(issuesList, e.target.parentNode.parentNode);
	}
	if(e.target.className == "sprintConstrain"){
		e.target.className = e.target.className + " hide";
		e.target.parentNode.style.border = "none";
		var expand = e.target.previousElementSibling.className;
		expand = expand.split(" ");
		e.target.previousElementSibling.className = expand[0];
		e.target.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.childNodes[3]);
		e.target.parentNode.childNodes[3].style.display = "block";
	}
	if(e.target.className == "updateIssue"){
		Issue.focused = e.target.parentNode.parentNode.className.slice(1);
		localStorage.setItem("issueUpdate", Issue.focused);
		window.location.href = "issueform.html";
	}
});
