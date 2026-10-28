
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

// REGISTER
if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim().toLowerCase();
        const password = document.getElementById("regPassword").value;

        const users = JSON.parse(localStorage.getItem("quizUsers") || "[]");

        const exists = users.some(user => user.email === email);

        if (exists) {
            document.getElementById("registerMessage").textContent =
                "Email already registered!";
            return;
        }

        users.push({ name, email, password });
        localStorage.setItem("quizUsers", JSON.stringify(users));

        alert("Registration successful! Please login.");
        window.location.href = "index.html";
    });
}

// LOGIN
if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        const users = JSON.parse(localStorage.getItem("quizUsers") || "[]");

        const user = users.find(
            user => user.email === email && user.password === password
        );

        if (user) {
            sessionStorage.setItem("quizLoggedIn", "true");
            sessionStorage.setItem("quizUserName", user.name);

            // Open your existing quiz page after login.
            window.location.href = "quiz.html";
        } else {
            document.getElementById("loginMessage").textContent =
                "Invalid email or password. Please register first.";
        }
    });
}
