

console.log("hola");

document.addEventListener("DOMContentLoaded", () => {

    const apiBaseUrl = "http://localhost:5000";

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

            if (!email || !password) {
                alert("Todos los campos son obligatorios");
                return;
            }

            fetch(`${apiBaseUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: email,
                    password
                })
            })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok || !data.isLogin) {
                    throw new Error(data.message || "Credenciales incorrectas o usuario no registrado");
                }

                alert("Login hecho");
                window.location.href = "/index.html";
            })
            .catch((error) => {
                alert(error.message);
            });

        });

    }

});