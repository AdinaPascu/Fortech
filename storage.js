var newProject = {
	id: Date.now(),
	sprints: []
}
var project = JSON.parse(localStorage.getItem("project"))?JSON.parse(localStorage.getItem("project")):newProject;
var users = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[];
var issues = JSON.parse(localStorage.getItem("issues"))?JSON.parse(localStorage.getItem("issues")):[];
var sprints = JSON.parse(localStorage.getItem("sprints"))?JSON.parse(localStorage.getItem("sprints")):[];
var comments = JSON.parse(localStorage.getItem("comments"))?JSON.parse(localStorage.getItem("comments")):[];
var loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));
var issueStatus = {
	0: "New",
	1: "In progress",
	2: "Feedback",
	3: "Rework",
	4: "Resolved",
	5: "Ready for testing"
}
var issueUpdate = localStorage.getItem("issueUpdate");


