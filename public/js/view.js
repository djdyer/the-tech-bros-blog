// VIEW any article
const view = async () => {
  const response = await fetch("/api/users/view", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/view-comment");
  } else {
    alert(response.statusText);
  }
};

document.querySelector(".view").addEventListener("click", view);
