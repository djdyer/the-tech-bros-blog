async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#post_title").value;
  const content = document.querySelector("#post_content").value;
  const user = document.querySelector("#user.name").value;
  const has_comment = document.querySelector("#has_comment:checked")
    ? true
    : false;

  const response = await fetch(`/api/post`, {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
      user,
      has_comment,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to create post");
  }
}

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
