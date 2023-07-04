function fillUserData() {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user.user_define_name;
  const phone = user.phone;

  document.getElementById("borrower").innerHTML += name;
  document.getElementById("phone").innerHTML += phone;
}

function clickedButton() {
  const buttons = document.getElementsByClassName("venue_option");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      // Remove 'clicked' id from all buttons
      for (var j = 0; j < buttons.length; j++) {
        buttons[j].removeAttribute("id");
      }

      // Add 'clicked' id to the clicked button
      this.id = "clicked";
    });
  }
}
