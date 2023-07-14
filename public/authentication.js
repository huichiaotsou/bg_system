async function checkLogin() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user == null) {
    // If localstorage has no user logged in record, forward to login page
    window.location.href = "/";
  }

  if (user.registered) {
    // If the user is registered, reload user details to local storage
    await refreshLocalStorageUser();
  }
}

async function refreshLocalStorageUser() {
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorageUser.complete_google_jwt;
  fetch(`/user/${localStorageUser.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to get user");
      }
    })
    .then((data) => {
      // Handle the server's response
      localStorage.setItem("user", JSON.stringify(data));
    })
    .catch((error) => {
      console.error(error);
    });
}
