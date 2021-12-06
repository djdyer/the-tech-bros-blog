async function editFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector("#article_title").value;
  const content = document.querySelector("#article_content").value;

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/articles/${id}`, {
    method: "PUT",
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
    alert("Failed to edit post");
  }
}

document
  .querySelector("#edit_article")
  .addEventListener("submit", editFormHandler);
