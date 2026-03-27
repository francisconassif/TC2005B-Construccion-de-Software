

console.log("hola");

document.addEventListener("DOMContentLoaded", () => {

    const btnFuleco = document.getElementById("btnFuleco");

    if(btnFuleco){
        btnFuleco.addEventListener("click", () => {
            alert("Fuleco se ha traumatizado con los números 7 y 1");
        });
    }

    const btnUSP = document.getElementById("btnUSP");

    if(btnUSP) {
        btnUSP.addEventListener("click", () => {
            alert("¡Vente a estudiar en USP!!!")
            window.open("https://internationaloffice.usp.br/en/index.php/admissions/studentexchange/", "_blank");
        });
    }

    const form = document.querySelector("form");

    if(form){

        form.addEventListener("submit", (event) => {

            event.preventDefault();

            const email = document.getElementById("correo").value.trim();
            const password = document.getElementById("password").value.trim();

            // mock
            const emailCorrecto = "admin@gmail.com";
            const passwordCorrecto = "1234";

            if (!email || !password) {
                alert("Todos los campos son obligatorios");
                return;
            }

            if (email === emailCorrecto && password === passwordCorrecto){

                alert("Login hecho");

                window.location.href = "/index.html";

            }
            else {

                alert("Credenciales incorrectas o usuario no registrado");

            }

        });

    }

});