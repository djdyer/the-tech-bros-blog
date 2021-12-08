// Leave comment function
async function commentFormHandler(event) {
  event.preventDefault();

  const content = document.querySelector(".comment_text").value;
  const article_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  // Fetch call to post new comment on article
  if (content) {
    const response = await fetch(`/api/comments/`, {
      method: "POST",
      body: JSON.stringify({
        content,
        article_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If commented, reload article with new comment
    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to post comment");
    }
  }
}

// Comment button handler
document
  .querySelector("#comment")
  .addEventListener("click", commentFormHandler);
