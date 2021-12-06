async function commentFormHandler(event) {
  event.preventDefault();

  const comment = document.querySelector(".comment_text").value;
  const user = document.querySelector("#user.name").value;

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (comment) {
    const response = await fetch(`/api/:id/comment`, {
      method: "POST",
      body: JSON.stringify({
        comment,
        user,
        post_id,
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
}

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", commentFormHandler);
