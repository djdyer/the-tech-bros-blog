async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#article_title").value;
  const content = document.querySelector("#article_content").value;
  const username = document.querySelector("#user.name").value;
  // const has_comment = document.querySelector("#has_comment:checked")
  //   ? true
  //   : false;

  const response = await fetch(`/api/post`, {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
      username,
      // has_comment,
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

document.querySelector("#post").addEventListener("click", newFormHandler);

document.querySelector("#create").addEventListener("click", newFormHandler);
