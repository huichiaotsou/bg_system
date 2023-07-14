// Auto fill in belong group leader's name
function fillinBGleaders() {
  // Fill in groups into select
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorageUser.complete_google_jwt;

  fetch("/groups", {
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
        throw new Error("Failed to get groups");
      }
    })
    .then((data) => {
      // Handle the server's response
      addGroupsIntoSelect(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function addGroupsIntoSelect(groups) {
  const optionsContainer = document.getElementById("group_options_container");

  for (let i = 0; i < groups.length; i++) {
    const group = document.createElement("a");
    group.classList = "dropdown-item";
    group.href = "#";
    group.dataset.groupid = groups[i].id;
    group.textContent = groups[i].group_leader;
    group.onclick = updateWithSelectedGroup;
    optionsContainer.appendChild(group);
  }
}

function updateWithSelectedGroup(event) {
  const button = document.getElementById("groupleader");
  const groupID = event.target.dataset.groupid;
  button.textContent = event.target.textContent;
  button.dataset.groupid = groupID;
}

// Submit registration form
const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form default action

  // Get user details from form
  const userDefineName = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const groupID = document.getElementById("groupleader").dataset.groupid;

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
    groupID: groupID,
  };

  // Send post request to the server
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/user");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(userFormData));

  // Response from server
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      userFormData.registered = true;
      localStorage.setItem("user", JSON.stringify(userFormData));
      window.location.href = "/dashboard.html";
    }
  };
});
