let parent = document.getElementById("table");
let tr;
let currentLocation;

currentLocation = window.location.href;
currentLocation = currentLocation.replace('dashboard.html',"index.html");

function cerrar_session(){
	localStorage.setItem('login', "false");
	window.location.href = currentLocation;
}

if (localStorage.getItem("login") != "true") {
	window.location.href = currentLocation;
}

fetch("https://basic-server-one.vercel.app/users", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		}
	})
.then(response => response.json())
.then((data)=>{
	if (data.error == false){
		data.data.forEach((user)=>{
			tr = "<tr>"+
			"<td>"+user.id+"</td>"+
			"<td>"+user.name+"</td>"+
			"<td>"+user.username+"</td>"+
			"<td>"+user.email+"</td>"+
			"<td>"+user.address.city+"</td>"+
			"<td>"+user.company.name+"</td>"+
			"</tr>"
			parent.insertAdjacentHTML('beforeend',tr);
		});
	}
	else if(data.error == true){
		console.log("sucedio un error");
	}
});