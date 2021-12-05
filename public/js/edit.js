async function editFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector("#article_title").value;
  const content = document.querySelector("#article_content").value;
  const user = document.querySelector("#user").value;

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/article/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
      user,
      comment,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace(`/article/${id}`);
  } else {
    alert("Failed to edit post");
  }
}

const deleteHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/articles/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dash");
    } else {
      alert("Failed to delete project");
    }
  }
};

document
  .querySelector("#edit_article")
  .addEventListener("submit", editFormHandler);

document.querySelector("#delete").addEventListener("click", deleteHandler);
