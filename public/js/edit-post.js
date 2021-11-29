async function editFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector("#post_title").value;
  const content = document.querySelector("#post_content").value;
  const user = document.querySelector("#user").value;

  const has_comment = document.querySelector("#has_comment:checked")
    ? true
    : false;

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/post/${id}`, {
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
    document.location.replace(`/post/${id}`);
  } else {
    alert("Failed to edit post");
  }
}

document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editFormHandler);
