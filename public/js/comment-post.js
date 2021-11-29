async function newFormHandler(event) {
  event.preventDefault();

  const comment = document.querySelector("#post_content").value;
  const user = document.querySelector("#user.name").value;

  const response = await fetch(`/api/:id/comment`, {
    method: "POST",
    body: JSON.stringify({
      comment,
      user,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to post comment");
  }
}

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", newFormHandler);
