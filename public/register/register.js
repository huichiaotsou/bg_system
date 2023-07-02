// Submit registration form
const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form default action

  // Get user details from form
  const userDefineName = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  // Get user details from local storage google_user
  const user = JSON.parse(localStorage.getItem("user"));

  // Create an object for user formData
  const userFormData = {
    givenNameGoogle: user.given_name,
    familyNameGoogle: user.family_name,
    userDefineName: userDefineName,
    phone: phone,
    profilePictureLink: user.picture,
    email: user.email,
    completeGoogleJWT: user.complete_google_jwt,
  };

  const userDataString = JSON.stringify(userFormData);

  // Send post request to the server
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/user");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(userDataString);

  // Response from server
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      localStorage.setItem("user", userDataString);
      window.location.href = "/dashboard";
    }
  };
});
