function addNewIssue(element){
	element.getElementsByClassName("issueId")[0].value = generateId();
	element.getElementsByClassName("issueCreatedBy")[0].value = loggedUser?loggedUser.id:"";
	element.getElementsByClassName("issueCreatedAt")[0].value = getDate();
	element.getElementsByClassName("issueUpdatedAt")[0].value = getDate();
	element.getElementsByClassName("update")[0].style.display = "none";
	element.getElementsByClassName("saveIssue")[0].style.display = "inline-block";
}
function createNewIssue(){
	if(document.getElementsByClassName("issueSprint")[0].value == ""){
		alert("Please insert a Sprint Name");
	} else {
	var issue = new Issue();
	createComment(document.getElementsByClassName("issueForm")[0], issue);
	issue.createIssue(document.getElementsByClassName("issueForm")[0]);
	for(var i = 0; i< Issue.task.length; i++){
		Issue.task[i].sprint = issue.sprint;
		issues.push(Issue.task[i]);
		issue.tasks.push(Issue.task[i].id);
	}
	issues.push(issue);
	localStorage.setItem("issues", JSON.stringify(issues));
	window.location.href = "index.html";
	}
}
function createTaskForm(){
	var taskForm = document.getElementsByClassName("issueForm")[0].cloneNode(true);
	taskForm.className = "taskForm";
	addNewIssue(taskForm);
	taskForm.querySelector('[value="task"]').setAttribute("selected", "selected");
	taskForm.getElementsByClassName("issueType")[0].setAttribute("disabled", "disabled");
	taskForm.getElementsByClassName("issueSprint")[0].setAttribute("disabled", "disabled");
	taskForm.getElementsByClassName("issueSprint")[0].value = document.getElementsByClassName("issueForm")[0].getElementsByClassName("issueSprint")[0].value;
	taskForm.getElementsByClassName("issueTasks")[0].style.display = "none";
	taskForm.getElementsByClassName("saveIssue")[0].className = "saveTask";
	taskForm.getElementsByClassName("cancelIssue")[0].className = "cancelTask";
	document.getElementsByTagName("body")[0].appendChild(taskForm);
	document.getElementsByClassName("saveTask")[0].addEventListener("click", function(){
		createTask();
		taskForm.parentNode.removeChild(taskForm);
	});
	document.getElementsByClassName("cancelTask")[0].addEventListener("click", function(){
		taskForm.parentNode.removeChild(taskForm);
	});
}
function createTask(){
	var task = new Issue();
	createComment(document.getElementsByClassName("taskForm")[0], task);
	task.createIssue(document.getElementsByClassName("taskForm")[0]);
	Issue.task.push(task);
	var taskForm = document.getElementsByClassName("taskForm")[0];
	console.log(Issue.task);
}
function createComment(element, obj){
	var comment = new Comment();
	comment.text = element.getElementsByClassName("commentText")[0].value;
	if(comment.text !== ""){
	comment.id = generateId();
	obj.comments.push(comment.id);
	comments.push(comment);
	localStorage.setItem("comments", JSON.stringify(comments));
	}
}
function updateIssue(issueId){
	document.getElementsByClassName("update")[0].style.display = "inline-block";
	document.getElementsByClassName("saveIssue")[0].style.display = "none";
	var issue = search(issueId, issues, "id")[0];
	console.log(issue);
	document.getElementsByClassName("issueId")[0].value = issue.id;
	document.getElementsByClassName("issueName")[0].value = issue.name;
	document.getElementsByClassName("issueSprint")[0].value = search(issue.sprint, sprints, "id", "name");
	document.getElementsByClassName("issueCreatedBy")[0].value = issue.createdBy;
	document.getElementsByClassName("issueCreatedAt")[0].value = issue.createdAt;
	document.getElementsByClassName("issueUpdatedAt")[0].value = getDate();
	document.getElementsByClassName("issueDescription")[0].innerText = issue.description;
	var typeVal = issue.type;
	var selector = '[value="' + typeVal + '"]';
	var x = document.querySelector(selector);
	x.setAttribute("selected", "selected");
	if(typeVal == "task"){
		document.getElementsByClassName("issueTasks")[0].style.display = "none";
	}
	var assignee = issue.assignee;
	var user = assignee!==""?"u"+search(assignee, users, "name", "id"):"";
	selector = '[value="' + user + '"]';
	document.getElementsByClassName("issueStatus")[0].removeAttribute("disabled");
	document.querySelector(selector).setAttribute("selected", "selected");
	selector = '[value="' + issue.status + '"]';
	document.querySelector(selector).setAttribute("selected", "selected");
	var tasksArr = [];
	for(var i=0; i<issue.tasks.length; i++){
		tasksArr.push(search(issue.tasks[i], issues, "id", "name"))
	}
	document.getElementsByClassName("tasks")[0].innerHTML = tasksArr;
	var commentsArr = [];
	for(var i=0; i<issue.tasks.length; i++){
		commentsArr.push(search(issue.comments[i], comments, "id", "text"));
	}
	document.getElementsByClassName("comments")[0].innerHTML = commentsArr;

}
function changeSubTasksSprint(issue) {
	var subTasks = search(issue.id, issues, "id")[0].tasks;
	for(var i = 0; i<subTasks.length; i++){
		subTasks[i].sprint = issue.sprint;
	}
}
function checkTaskStatus(issue) {
	for(var i = 0; i < issues.length; i++){
		for(var j = 0; j < issues[i].tasks.length; j++){
			if(issues[i].tasks[j] == issue.id){
				if(issue.status > issues[i].status){
					issues[i].status = issue.status;
				}
			}
		}
	}
	return issues;
}