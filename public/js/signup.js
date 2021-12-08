// Sign-up function
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  // Fetch call to create new user
  if (username && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    // if signed up, route to dash
    if (response.ok) {
      document.location.replace("/dash");
    } else {
      alert(response.statusText);
    }
  }
};

// Signup button handler
document
  .querySelector(".signup_form")
  .addEventListener("submit", signupFormHandler);
