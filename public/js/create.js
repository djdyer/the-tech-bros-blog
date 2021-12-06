// CREATE NEW POST
async function articleFormHandler(event) {
  event.preventDefault();

  // Accept title and content
  const title = document.querySelector("#article_title").value;
  const content = document.querySelector("#article_content").value;

  const response = await fetch(`/api/articles`, {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dash");
  } else {
    alert("Failed to create post");
  }
}

document
  .querySelector(".create_form")
  .addEventListener("submit", articleFormHandler);
