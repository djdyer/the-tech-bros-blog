async function commentFormHandler(event) {
  event.preventDefault();

  const content = document.querySelector(".comment_text").value;
  // const username = document.querySelector("#user.username").value;
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (content) {
    const response = await fetch(`/api/articles/${id}/`, {
      method: "POST",
      body: JSON.stringify({
        content,
        id,
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
