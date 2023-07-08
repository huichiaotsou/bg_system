function fillUserData() {
  const user = JSON.parse(localStorage.getItem("user"));
  const name = user.user_define_name;

  document.getElementById("borrower").innerHTML += name;
}

function addButtonEventListener() {
  const buttons = document.getElementsByClassName("dropdown-item");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (event) {
      const venueID = event.target.dataset.venueid;
      const venueName = event.target.textContent;
      const selectedVenue = document.getElementById("selected_venue");
      selectedVenue.dataset.venueid = venueID;
      selectedVenue.textContent = venueName;
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
    email: user.email,
    venueID: selectedVenue.dataset.venueid,
    checkinDate: getCurrDateString(),
  };

  // Send post request to the server
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/checkin");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer " + user.complete_google_jwt);
  xhr.send(JSON.stringify(checkinDetails));

  // Response from server
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        alert("簽到成功");
        window.location.href = "/checkin_records.html";
      }
      if (xhr.status === 409) {
        alert("簽到失敗，今日已登記。如欲修改請洽管理員");
      }
    }
  };
}

function getCurrDateString() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const date = currentDate.getDate();
  return `${year}-${month}-${date}`;
}
