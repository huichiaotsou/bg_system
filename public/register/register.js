// Auto fill in belong group leader's name
function fillinBGleaders() {
  // Fill in select of groups
}

// Submit registration form
const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form default action

  // Get user details from form
  const userDefineName = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  // TODO: get group leader list from API
  // const groupLeader = document.getElementById("groupleader").value;

  // Get user details from local storage google_user
  const user = JSON.parse(localStorage.getItem("user"));

  // Create an object for user formData
  const userFormData = {
    given_name_google: user.given_name,
    family_name_google: user.family_name,
    user_define_name: userDefineName,
    phone: phone,
    profile_picture_link: user.picture,
    email: user.email,
    complete_google_jwt: user.complete_google_jwt,
    // groupLeader: groupLeader,
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
      window.location.href = "/dashboard.html";
    }
  };
});
