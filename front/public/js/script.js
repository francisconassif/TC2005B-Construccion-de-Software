

console.log("hola");

document.addEventListener("DOMContentLoaded", () => {

    const apiBaseUrl = "http://localhost:5000";

    const readResponseBody = async (response) => {
        const contentType = response.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
            return response.json();
        }

        const textBody = await response.text();
        return { message: textBody || "json response" };
    };

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

    const loginForm = document.getElementById("login-form");

    if(loginForm){
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const email = document.getElementById("correo").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!email || !password) {
                alert("fill all blanks");
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
                const data = await readResponseBody(response);

                if (!response.ok || !data.isLogin) {
                    throw new Error(data.message || "Wrong user or password");
                }

                if (window.appAuth?.setUser) {
                    window.appAuth.setUser(data.user);
                }

                alert("Logged in");
                window.location.href = "/game";
            })
            .catch((error) => {
                alert(error.message);
            });
        });
    }

    const registerForm = document.getElementById("register-form");

    if(registerForm){
        registerForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("correo").value.trim();
            const password = document.getElementById("password").value.trim();
            const confirmPassword = document.getElementById("confirmPassword").value.trim();

            if (!name || !email || !password || !confirmPassword) {
                alert("Fill all blanks");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords don't match");
                return;
            }

            fetch(`${apiBaseUrl}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    username: email,
                    password
                })
            })
            .then(async (response) => {
                const data = await readResponseBody(response);

                if (!response.ok) {
                    throw new Error(data.message || "Error on register");
                }

                alert("Register Completed. You can log into your account");
                window.location.href = "/login";
            })
            .catch((error) => {
                alert(error.message);
            });
        });
    }

});