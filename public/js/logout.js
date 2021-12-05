const logout = async () => {
  console.log("logout frontend");
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
    window.location.reload(true);
  } else {
    alert(response.statusText);
  }
};

document.querySelector("#logout").addEventListener("click", logout);

// var logout = document.querySelector("#logout");

// if (logout) {
//   logout.addEventListener("click", logout);
// }
