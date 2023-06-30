// // Fill in the name obtained from google
// function autoFillIn() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const fullName = `   ${user.family_name}, ${user.given_name}`;
//   const nameField = document.getElementById("name");
//   nameField.placeholder = fullName;
// }

// Submit registration form
const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form default action

  // Get data from form
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;

  // Create an object for formData
  var formData = {
    name: name,
    phone: phone,
  };

  // Send post request to the server
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/register");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(formData));

  // Response from server
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("submit with success");
      // do sth. when it's successful
    }
  };
});
