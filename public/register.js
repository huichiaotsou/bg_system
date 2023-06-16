const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form default action

  // Get data from form
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;

  // If saveData == true

  // Create an object for formData
  var formData = {
    name: name,
    phone: phone,
    email: email,
  };

  // Send post request to the server
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/post_user_data");
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
