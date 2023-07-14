// Callback function to handle the One Tap response
function handleCredentialResponse(response) {
  const { credential } = response;

  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential }),
  })
    .then((response) => {
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
      localStorage.setItem("user", JSON.stringify(user));

      if (!user.registered) {
        window.location.href = "/register.html";
      } else {
        window.location.href = "/checkin.html";
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
