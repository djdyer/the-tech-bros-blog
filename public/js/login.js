// Login function
const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  // Fetch call to login user
  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    // After logging in, route to dash
    if (response.ok) {
      document.location.replace("/dash");
    } else {
      alert("Failed to log in");
    }
  }
};

// Login button handler
document
  .querySelector(".login_form")
  .addEventListener("submit", loginFormHandler);
