function redirect(path) {
  window.location.href = path;
}

function addAdminButton() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user.is_admin) {
    return;
  }

  const divElement = document.createElement("div");
  divElement.setAttribute("class", "button");
  divElement.setAttribute("id", "admin_button");
  divElement.textContent = "管理介面";
  divElement.setAttribute("onclick", "redirect('/admin.html')");
  document.body.appendChild(divElement);
}

function addAdminMenuOptions() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user.is_admin) {
    return;
  }

  const menuList = document.getElementById("menu_list");

  const adminDashboardLi = document.createElement("li");
  adminDashboardLi.setAttribute("onclick", "redirect('/admin.html')");
  // adminDashboardLi.onclick = ;
  adminDashboardLi.textContent = "管理介面";
  menuList.appendChild(adminDashboardLi);
}
