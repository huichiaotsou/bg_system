function checkLogin() {
  const user = JSON.parse(localStorage.getItem("google_user"));
  if (user == null) {
    window.location.href = "/";
  }
}
