// Callback function to handle the One Tap response
function handleCredentialResponse(response) {
  const { credential } = response;

  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential }),
  })
    .then((response) => {
      // TODO: verification at the server
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to verify credential");
      }
    })
    .then((data) => {
      // Handle the server's response
      localStorage.clear();

      const user = data.user;
      localStorage.setItem("google_user", JSON.stringify(user));

      if (!data.registered) {
        window.location.href = "/register";
      } else {
        window.location.href = "/dashboard";
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
