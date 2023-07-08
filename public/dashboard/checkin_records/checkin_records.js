function loadCheckinRecordsByUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.complete_google_jwt;

  fetch(`/checkin/user/${user.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to get user checkins");
      }
    })
    .then((users) => {
      // Handle the server's response
      createUserDivs(users);
    })
    .catch((error) => {
      console.error(error);
    });
}

function createUserDivs(users) {
  for (let i = 0; i < users.length; i++) {
    createSingleUserDiv(users[i]);
  }
}

function createSingleUserDiv(user) {
  // Create a new div with the class "user_box"
  const userBox = document.createElement("div");
  userBox.className = "user_box";

  // Create a div for the checkbox
  const checkboxDiv = document.createElement("div");
  checkboxDiv.className = "checkbox";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.dataset.userid = user.id;
  if (user.is_admin) {
    checkbox.checked = true;
  }
  checkboxDiv.appendChild(checkbox);

  // Create a div for the user name
  const userName = document.createElement("div");
  userName.className = "username";
  userName.textContent = user.user_define_name;

  // Create a div for the delete button
  const email = document.createElement("div");
  email.className = "useremail";
  email.textContent = user.email;

  // Append the group name and delete button to the groups box
  userBox.appendChild(checkboxDiv);
  userBox.appendChild(userName);
  userBox.appendChild(email);

  // Append the groups box to the groups container
  const adminContainer = document.getElementById("admin_container");
  adminContainer.appendChild(userBox);
}
