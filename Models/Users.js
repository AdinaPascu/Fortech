function User(){
	this.name = "";
	this.id = null;
	this.status = true
}
User.prototype.checkUser = function(){
	for(var i = 0; i < users.length; i++){
		if(users[i].name == this.name){
			this.status = false;
			this.id = users[i].id;
		}
	}
}
User.prototype.createUser = function(){
	this.checkUser();
	if(this.status == false){
		alert("username not available");
	} else {
		this.id = Date.now();
		users.push(this);
		localStorage.setItem("users", JSON.stringify(users));
		sessionStorage.setItem("loggedUser", JSON.stringify(this));
		this.login();
	}
}
User.prototype.login = function(){
	this.checkUser();
	if(this.status == false) {
		sessionStorage.setItem("loggedUser", JSON.stringify(this));
		location.reload();
	} else {
		alert("wrong username");
	}
}