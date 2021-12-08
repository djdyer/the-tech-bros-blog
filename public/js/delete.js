// Delete article function
async function deleteHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  // Fetch call to delete article by id
  const response = await fetch(`/api/articles/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // After deleting, route to dash
  if (response.ok) {
    document.location.replace("/dash");
  } else {
    alert("Failed to delete article");
  }
}

// Delete button handler
document.querySelector("#delete").addEventListener("click", deleteHandler);
