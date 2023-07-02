function loadUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  const welcomeText = document.getElementById("welcome_text");
  welcomeText.textContent = `Welcome Home! ${user.user_define_name}`;
}

function addAdminButton() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user.is_admin) {
    return;
  }

  const divElement = document.createElement("div");
  divElement.setAttribute("class", "button");
  divElement.setAttribute("id", "admin_button");
  divElement.textContent = "管理員專區";
  document.body.appendChild(divElement);
}

function redirect(path) {
  window.location.href = path;
}
