// Edit article function
async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#article_title").value;
  const content = document.querySelector("#article_content").value;

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  // Fetch call to edit article by id
  const response = await fetch(`/api/articles/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
      id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // after edit, reroute to dash
  if (response.ok) {
    document.location.replace("/dash");
  } else {
    alert("Failed to edit post");
  }
}

// Update button handler
document.querySelector("#update").addEventListener("click", editFormHandler);
