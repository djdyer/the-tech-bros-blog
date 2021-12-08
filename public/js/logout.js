// Logout user function
const logout = async () => {
  console.log("logout frontend");
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  // After logging out, route to home
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

// Logout button handler
document.querySelector("#logout").addEventListener("click", logout);
