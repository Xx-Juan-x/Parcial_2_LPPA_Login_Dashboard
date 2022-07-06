let email =  document.getElementById("email");
let mensaje_email = document.querySelector(".conteiner-form .text-error.email");
let password  = document.getElementById("password");
let mensaje_password = document.querySelector(".conteiner-form .text-error.password");
let form;
let currentLocation;

currentLocation = window.location.href;
currentLocation = currentLocation.replace('index.html',"dashboard.html");

if (localStorage.getItem("login") == "true") {
	window.location.href = currentLocation;
}

form = document.getElementById("frm-login");

form.addEventListener("submit", function(Event){

    Event.preventDefault();

    /*Bandera*/
    let errorFormulario = false;

    let regex_email = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if(!regex_email.test(email.value)){
        errorFormulario = true;
        mensaje_email.innerHTML = "El formato del email es incorrecto.";
        email.classList.add("error");
        console.log("email incorrecto");
    }else{
        mensaje_email.innerHTML = "";
        email.classList.remove("error");
    }

    if(password.value.length < 8){
        errorFormulario = true;
        mensaje_password.innerHTML = "La contraseña debe contener más de 8 caracteres.";
        password.classList.add("error");
    }else{
        mensaje_password.innerHTML = "";
        password.classList.remove("error");
    }

    if(errorFormulario == false){
        fetch("https://basic-server-one.vercel.app/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            email: email.value,
            password: password.value
            })
        })
        .then(response => response.json())
        .then((data)=>{
            console.log(data);
            if (data.error == false){
                localStorage.setItem('login', "true");
                window.location.href = currentLocation;
            }else if (data.success == false){
                data.errors.forEach((error)=>{
                    if(error.param ==  "password"){
                        mensaje_password.innerHTML = "Server: La contraseña debe contener solo letras y numeros.";
                        password.classList.add("error");
                    }
                    if(error.param ==  "email"){
                        mensaje_email.innerHTML = "Server: Formato de email invalido.";
                        email.classList.add("error");
                    }
                });
            }else if (data.error == true){
                mensaje_password.innerHTML = "Usuario no encontrado";
                password.classList.add("error");
            }
        })
        .catch(function(error){
            console.log(error);
        })
    }
});
