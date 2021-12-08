// Create new post function
async function articleFormHandler(event) {
  event.preventDefault();

  // Accept title and content
  const title = document.querySelector("#article_title").value;
  const content = document.querySelector("#article_content").value;

  // Fetch call to post new article
  if (title && content) {
    const response = await fetch(`/api/articles/create`, {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // After creating, route to dash
    if (response.ok) {
      document.location.replace("/dash");
    } else {
      alert("Failed to create post");
    }
  }
}

// Create button handler
document
  .querySelector(".create_form")
  .addEventListener("submit", articleFormHandler);
