// VIEW any article
const view = async () => {
  const response = await fetch("/api/users/view-comment", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace(`/view-comment/${post_id}`);
  } else {
    alert(response.statusText);
  }
};

document.querySelector(".view").addEventListener("click", view);
