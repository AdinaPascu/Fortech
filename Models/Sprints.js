function Sprint() {
	this.name = "";
	this.id = null;
}
Sprint.prototype.createSprint = function(){
	var sprintAdd = true;
	var sprintName = document.getElementsByClassName('issueSprint')[0].value;
	sprintAdd = search(sprintName, sprints, "name", "name")[0]?false:true;
	if(sprintAdd == true){
	sprints.push(this);
	this.name = document.getElementsByClassName('issueSprint')[0].value;
	this.id = Date.now();
	localStorage.setItem("sprints", JSON.stringify(sprints));
	project.sprints.push(this.id);
	localStorage.setItem("project", JSON.stringify(project));
	} 
}
