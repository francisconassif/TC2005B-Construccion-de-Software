(function () {
    const AUTH_STORAGE_KEY = "authUser";

    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function getStoredUser() {
        try {
            const rawUser = localStorage.getItem(AUTH_STORAGE_KEY);
            return rawUser ? JSON.parse(rawUser) : null;
        } catch {
            return null;
        }
    }

    function getUserDisplayName(user) {
        return user?.nombre || user?.name || user?.username || user?.correo || user?.email || "User";
    }

    function enforceGameAuth(user) {
        const path = window.location.pathname;
        const isGamePath = path === "/game" || path === "/game/" || path === "/game/index.html";

        if (isGamePath && !user) {
            window.location.replace("/login");
            return false;
        }

        return true;
    }

    function renderNavbar() {
        const mountNode = document.getElementById("app-navbar");

        if (!mountNode) {
            return;
        }

        const user = getStoredUser();
        const canContinue = enforceGameAuth(user);
        if (!canContinue) {
            return;
        }

        const authContent = user
            ? `
                <li class="nav-item d-flex align-items-center me-3">
                    <span class="nav-link text-warning fw-semibold">Hello, ${escapeHtml(getUserDisplayName(user))}</span>
                </li>
                <li class="nav-item">
                    <button class="btn btn-warning fw-bold" id="logout-button" type="button">Logout</button>
                </li>
            `
            : `
                <li class="nav-item">
                    <a class="btn btn-warning ms-3 fw-bold" href="/login">Login</a>
                </li>
            `;

        mountNode.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark mt-5 mb-5" style="background-color: #009B3A;">
                <div class="container">
                    <a class="navbar-brand fw-bold" href="/">
                        🇧🇷 Francisco's exchange to México
                    </a>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavCommon" aria-controls="navbarNavCommon" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarNavCommon">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a class="nav-link text-warning fw-semibold" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-warning fw-semibold" href="/game">Game</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-warning fw-semibold" href="/profile.html">Profile</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-warning fw-semibold" href="/imgs">Images</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-warning fw-semibold" href="/about.html">About</a>
                            </li>
                            ${authContent}
                        </ul>
                    </div>
                </div>
            </nav>
        `;

        const logoutButton = document.getElementById("logout-button");
        if (logoutButton) {
            logoutButton.addEventListener("click", () => {
                localStorage.removeItem(AUTH_STORAGE_KEY);
                renderNavbar();
                window.location.href = "/";
            });
        }
    }

    window.appAuth = {
        setUser(user) {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
            renderNavbar();
        },
        clearUser() {
            localStorage.removeItem(AUTH_STORAGE_KEY);
            renderNavbar();
        },
        getUser() {
            return getStoredUser();
        }
    };

    document.addEventListener("DOMContentLoaded", renderNavbar);
})();
