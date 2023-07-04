function fillUserData() {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user.user_define_name;
  const phone = user.phone;

  document.getElementById("borrower").innerHTML += name;
  document.getElementById("phone").innerHTML += phone;
}

function addButtonEventListener() {
  const buttons = document.getElementsByClassName("venue_option");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      // Remove 'selected_venue' id from all buttons
      for (var j = 0; j < buttons.length; j++) {
        buttons[j].removeAttribute("id");
      }

      // Add 'selected_venue' id to the clicked button
      this.id = "selected_venue";
    });
  }
}
