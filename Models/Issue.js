function Issue(){
	this.id = null;
	this.type = "";
	this.name = "";
	this.sprint = null;
	this.createdBy = null;
	this.assignee = null;
	this.description = "";
	this.status = null;
	this.tasks = [];
	this.comments = [];
	this.updatedAt = "";
	this.createdAt = "";
}
Issue.focused = null;
Issue.task = [];
Issue.selectedSprint = null;
Issue.prototype.createIssue = function(element){
	this.id = element.getElementsByClassName("issueId")[0].value;
	var issueType = element.getElementsByClassName("issueType")[0];
	this.type = issueType.options[issueType.selectedIndex].value;
	this.name = element.getElementsByClassName("issueName")[0].value;
	//input with name => get id
	var chosenSprint = element.getElementsByClassName("issueSprint")[0].value;
	console.log(chosenSprint);
	this.sprint = search(chosenSprint, sprints, "name", "id")[0];
	this.createdBy = element.getElementsByClassName("issueCreatedBy")[0].value;
	var assigneeList = element.getElementsByClassName("issueAssignee")[0];
	this.assignee = assigneeList.options[assigneeList.selectedIndex].value;
	this.description = element.getElementsByClassName("issueDescription")[0].innerText;
	var sts = element.getElementsByClassName("issueStatus")[0];
	this.status = Number(sts.options[sts.selectedIndex].value);
	this.updatedAt = getDate();
	this.createdAt = getDate();
}













Issue.prototype.createIssueRow = function(element, parent){
	var newIssue = parent.getElementsByClassName("issue")[0].cloneNode(true);
	newIssue.className = "i" + this.id;
	newIssue.getElementsByClassName("name")[0].innerHTML = this.name;
	newIssue.getElementsByClassName("type")[0].innerHTML = this.type;
	newIssue.getElementsByClassName("createdBy")[0].innerHTML = this.createdBy;
	newIssue.getElementsByClassName("assignee")[0].innerHTML = this.assignee;
	newIssue.getElementsByClassName("status")[0].innerHTML = this.status;
	newIssue.getElementsByClassName("createdAt")[0].innerHTML = this.createdAt;
	newIssue.getElementsByClassName("updatedAt")[0].innerHTML = this.updatedAt;
	parent.appendChild(newIssue);
	element.appendChild(parent);
}
Issue.prototype.getIssueData = function(arr, el){
	var issueTable = document.getElementsByClassName("issuesList")[0].cloneNode(true);
	issueTable.className = "issuesList";
	for(var i=0; i<arr.length; i++){
		this.id = arr[i].id;
		this.name = arr[i].name;
		this.type = arr[i].type;
		this.createdBy = search(Number(arr[i].createdBy), users, "id", "name");
		this.assignee = search(Number(arr[i].assignee), users, "id", "name");
		this.status = issueStatus[arr[i].status];
		this.createdAt = arr[i].createdAt;
		this.updatedAt = arr[i].updatedAt;
		this.createIssueRow(el, issueTable);
	}
}

