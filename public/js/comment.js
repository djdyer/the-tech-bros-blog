async function commentFormHandler(event) {
  event.preventDefault();

  const content = document.querySelector(".comment_text").value;
  // const user_id = document.querySelector("#user.user_id").value;
  const article_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (content) {
    const response = await fetch(`/api/comments/`, {
      method: "POST",
      body: JSON.stringify({
        content,
        // user_id,
        article_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/article/:id");
    } else {
      alert("Failed to post comment");
    }
  }
}

document
  .querySelector("#comment")
  .addEventListener("click", commentFormHandler);
