function Comment(){
	this.text = "";
	this.id = null;
}







function SprintModel() {
	this.name = "";
	this.features = {
		features: 0,
		new: 0,
		inProgress: 0,
		feedback: 0,
		rework: 0,
		resolved: 0,
		readyForTesting: 0,
	};
	this.bugs = {
		bugs: 0,
		new: 0,
		inProgress: 0,
		feedback: 0,
		rework: 0,
		resolved: 0,
		readyForTesting: 0,
	};
	this.tasks = {
		tasks: 0,
		new: 0,
		inProgress: 0,
		feedback: 0,
		rework: 0,
		resolved: 0,
		readyForTesting: 0,
	};
};
SprintModel.index = 0;
SprintModel.prototype.createSprintDiv = function(){
	var main = document.getElementsByClassName("main")[0];
	var newSprint = document.getElementsByClassName("sprintDiv")[0].cloneNode(true);
	newSprint.getElementsByClassName("sprint")[0].className = "sprint " + this.name;
	newSprint.getElementsByClassName("sprintName")[0].innerHTML = this.name;
	var newFeature = newSprint.getElementsByClassName("features")[0];
	newFeature.getElementsByClassName("new")[0].innerHTML = "New<br/>" + this.features.new;
	newFeature.getElementsByClassName("inProgress")[0].innerHTML = "In progress<br/>" + this.features.inProgress;
	newFeature.getElementsByClassName("feedback")[0].innerHTML = "Feedback<br/>" + this.features.feedback;
	newFeature.getElementsByClassName("rework")[0].innerHTML = "Rework<br/>" + this.features.rework;
	newFeature.getElementsByClassName("resolved")[0].innerHTML = "Resolved<br/>" + this.features.resolved;
	newFeature.getElementsByClassName("readyForTesting")[0].innerHTML = "Ready for testing<br/>" + this.features.readyForTesting;
	var newBug = newSprint.getElementsByClassName("bugs")[0];
	newBug.getElementsByClassName("new")[0].innerHTML = "New " + this.bugs.new;
	newBug.getElementsByClassName("inProgress")[0].innerHTML = "In progress<br/>" + this.bugs.inProgress;
	newBug.getElementsByClassName("feedback")[0].innerHTML = "Feedback<br/>" + this.bugs.feedback;
	newBug.getElementsByClassName("rework")[0].innerHTML = "Rework<br/>" + this.bugs.rework;
	newBug.getElementsByClassName("resolved")[0].innerHTML = "Resolved<br/>" + this.bugs.resolved;
	newBug.getElementsByClassName("readyForTesting")[0].innerHTML = "Ready for testing<br/>" + this.bugs.readyForTesting;
	var newTask = newSprint.getElementsByClassName("tasks")[0];
	newTask.getElementsByClassName("new")[0].innerHTML = "New " + this.tasks.new;
	newTask.getElementsByClassName("inProgress")[0].innerHTML = "In progress<br/>" + this.tasks.inProgress;
	newTask.getElementsByClassName("feedback")[0].innerHTML = "Feedback<br/>" + this.tasks.feedback;
	newTask.getElementsByClassName("rework")[0].innerHTML = "Rework<br/>" + this.tasks.rework;
	newTask.getElementsByClassName("resolved")[0].innerHTML = "Resolved<br/>" + this.tasks.resolved;
	newTask.getElementsByClassName("readyForTesting")[0].innerHTML = "Ready for testing<br/>" + this.tasks.readyForTesting;
	main.appendChild(newSprint);
};
SprintModel.prototype.getSprintData = function(){
	var sprint = sprints[SprintModel.index].id;
	this.name = sprints[SprintModel.index].name;
	for(var i=0; i<issues.length;i++){
		if(issues[i].sprint == sprint){
			switch(issues[i].type){
				case "feature": 
					this.features.features++;
					switch(issues[i].status){
						case 0:
							this.features.new++;
							break;
						case 1:
							this.features.inProgress++;
							break;
						case 2:
							this.features.feedback++;
							break;
						case 3:
							this.features.rework++;
							break;
						case 4:
							this.features.resolved++;
							break;
						case 5: 
							this.features.readyForTesting++;
							break;
					}
					break;
				case "bug":
					this.bugs.bugs++;
					switch(issues[i].status){
						case 0:
							this.bugs.new++;
							break;
						case 1:
							this.bugs.inProgress++;
							break;
						case 2:
							this.bugs.feedback++;
							break;
						case 3:
							this.bugs.rework++;
							break;
						case 4:
							this.bugs.resolved++;
							break;
						case 5: 
							this.bugs.readyForTesting++;
							break;
					}
					break;
				case "task":
					this.tasks.tasks++;
					switch(issues[i].status){
						case 0:
							this.tasks.new++;
							break;
						case 1:
							this.tasks.inProgress++;
							break;
						case 2:
							this.tasks.feedback++;
							break;
						case 3:
							this.tasks.rework++;
							break;
						case 4:
							this.tasks.resolved++;
							break;
						case 5: 
							this.tasks.readyForTesting++;
							break;
					}
					break;
			}
		}
	}
	SprintModel.index++;
}