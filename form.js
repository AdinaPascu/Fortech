window.onload = function(){
	createList(users, "issueAssignee", "option", "u", "name");
	var onLoadAction = issueUpdate?updateIssue(issueUpdate):addNewIssue(document);
}
document.getElementsByClassName("issueSprint")[0].addEventListener("focus", function(e){
	createList(sprints, "sprintsList", "div", "v", "name");
	e.target.parentNode.addEventListener("click", function(event){
		if(event.target.className.startsWith("v")){
			e.target.value = event.target.innerHTML;
			Issue.selectedSprint = event.target.innerHTML;
			removeElement(document.getElementsByClassName("sprintsList")[0]);	
		}
	});
});
document.getElementsByClassName("saveIssue")[0].addEventListener("click", function(){
		createNewIssue();
});
document.getElementsByClassName("issueSprint")[0].onchange = function(e){
	removeElement(document.getElementsByClassName("sprintsList")[0]);
	Issue.selectedSprint = document.getElementsByClassName("issueSprint")[0].value;
}
document.getElementsByClassName("cancelIssue")[0].addEventListener("click", function(){
	window.location.href = "index.html";
});
document.getElementsByClassName("addTask")[0].addEventListener("click", function(){
	createTaskForm();
});
var e = document.getElementsByClassName("issueType")[0];
var strUser = e.options[e.selectedIndex].value;
console.log(strUser);
document.getElementsByClassName("issueType")[0].onchange = function(e){
	if(e.target[e.target.selectedIndex].value == "task"){
		document.getElementsByClassName("issueTasks")[0].style.display = "none";
	} else {
		document.getElementsByClassName("issueTasks")[0].style.display = "block";
	}
};
document.getElementsByClassName("issueForm")[0].addEventListener("click", function(e){
	if(e.target.className == "update"){
		var issue = new Issue();
		issue.createIssue(document.getElementsByClassName("issueForm")[0]);
		var aa;
		for(var i = 0; i<issues.length; i++){
			if(issue.id === issues[i].id){
				aa = i;
			}
		}
		if(issues[aa].sprint !== issue.sprint){
			changeSubTasksSprint(issue);
		}
		issues = checkTaskStatus(issue);
		var aaaaa = search(issue.id, issues, "id")[0];
		issues[aa] = issue;
		localStorage.setItem("issues", JSON.stringify(issues));
		localStorage.removeItem('issueUpdate');
		window.location.href = "index.html";
	}
});
