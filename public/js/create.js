// CREATE NEW POST
async function newFormHandler(event) {
  event.preventDefault();

  // Accept title and content
  const title = document.querySelector("#article_title").value;
  const content = document.querySelector("#article_content").value;
  // const has_comment = document.querySelector("#has_comment:checked")
  //   ? true
  //   : false;

  if (title && content) {
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
}

const delButtonHandler = async (event) => {
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
  .querySelector(".create_form")
  .addEventListener("submit", newFormHandler);
