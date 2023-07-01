function checkLogin() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user == null) {
    window.location.href = "/";
  }
}

// Submit registration form
const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form default action

  // Get user details from form
  var userDefineName = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;

  // Get user details from local storage google_user
  const user = JSON.parse(localStorage.getItem("user"));

  // Create an object for formData
  var formData = {
    givenNameGoogle: user.given_name,
    familyNameGoogle: user.family_name,
    userDefineName: userDefineName,
    phone: phone,
    profilePictureLink: user.picture,
    email: user.email,
    completeGoogleJWT: user.complete_google_jwt,
  };

  // Send post request to the server
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/register");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(formData));

  // Response from server
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      window.location.href = "/dashboard";
    }
  };
});
