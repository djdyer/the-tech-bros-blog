async function commentFormHandler(event) {
  event.preventDefault();

  const comment = document.querySelector("#article_content").value;
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
    document.location.replace("/view-comment");
  } else {
    alert("Failed to post comment");
  }
}

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", commentFormHandler);
