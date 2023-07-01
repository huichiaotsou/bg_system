function checkLogin() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user == null) {
    // If localstorage has no user logged in record, forward to login page
    window.location.href = "/";
  }

  if (user.registered && !window.location.href.includes("dashboard")) {
    // If the user is not registered according to the localstorage records, forward to dashboard
    window.location.href = "/dashboard";
  }
}
