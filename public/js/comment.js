async function commentFormHandler(event) {
  event.preventDefault();

  const content = document.querySelector(".comment_text").value;
  const username = document.querySelector("#user.username").value;
  const article_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (comment) {
    const response = await fetch(`/api/:id/comment`, {
      method: "POST",
      body: JSON.stringify({
        content,
        username,
        article_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/article");
    } else {
      alert("Failed to post comment");
    }
  }
}

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", commentFormHandler);
