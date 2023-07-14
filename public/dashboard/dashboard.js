function loadUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  const welcomeText = document.getElementById("welcome_text");
  welcomeText.textContent = `Welcome Home! ${user.user_define_name}`;
}
