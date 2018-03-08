//I've chosen to login without password due to the fact that I was working with local Storage and anyway...we are team members
var loginForm = document.getElementsByClassName('form')[0];
var user = new User();
user.name = loggedUser?loggedUser.name:"";
user.id = loggedUser?loggedUser.id:null;

if(loggedUser) {
	loginForm.style.display = "none";
}


document.getElementById("login").addEventListener("click", function(){
	user.name = document.getElementsByName('username')[0].value;
	user.login();
});
document.getElementById("create").addEventListener("click", function(){
	user.name = document.getElementsByName('username')[0].value;
	user.createUser();
});
