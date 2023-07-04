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

function sendCheckinData() {
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedVenue = document.getElementById("selected_venue");
  if (selectedVenue == null) {
    alert("請選擇場地");
    return;
  }

  const checkinDetails = {
    userID: user.id,
    venueID: selectedVenue.dataset.venueid,
  };

  // Send post request to the server
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/checkin");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer " + user.complete_google_jwt);
  xhr.send(JSON.stringify(checkinDetails));

  // Response from server
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      window.location.href = "/dashboard.html";
    }
  };
}
