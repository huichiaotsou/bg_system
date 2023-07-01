function checkLogin() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user == null) {
    window.location.href = "/";
  }

  if (user.registerd && !window.location.href.includes("dashboard")) {
    window.location.href = "/dashboard";
  }
}
