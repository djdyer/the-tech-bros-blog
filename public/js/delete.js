async function deleteHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/articles/edit/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    console.log("delete SUCCESSFUL");
    // document.location.reload();
  } else {
    alert("Failed to delete article");
  }
}

document.querySelector("#delete").addEventListener("click", deleteHandler);
