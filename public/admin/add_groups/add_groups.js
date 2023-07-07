function loadExistingGroups() {
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
      createGroupsDivs(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function deleteGroup(event) {
  const groupBox = event.target.parentNode;
  groupBox.parentNode.removeChild(groupBox);
  // TODO: remove group from the database
}

function createGroup(event) {
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorageUser.complete_google_jwt;

  const inputField = event.target.previousElementSibling;
  const groupLeaderName = inputField.value;

  // TODO: add group to the database
  fetch("/groups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ groupLeaderName }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to verify credential");
      }
    })
    .then((group) => {
      // Handle the server's response
      // group: group_leader and id
      createSingleGroupDiv(group);
    })
    .catch((error) => {
      console.error(error);
    });

  // Replace the confirmed div, and create the group with successful insertion
  deleteGroup(event);
}

function createGroupsDivs(groups) {
  for (let i = 0; i < groups.length; i++) {
    createSingleGroupDiv(groups[i]);
  }
}

function createSingleGroupDiv(group) {
  // Create a new div with the class "groups_box"
  const groupsBox = document.createElement("div");
  groupsBox.className = "groups_box";

  // Create a div for the group name
  const groupName = document.createElement("div");
  groupName.className = "group_name";
  groupName.dataset.groupid = group.id;
  groupName.textContent = group.group_leader;

  // Create a div for the delete button
  const deleteButton = document.createElement("div");
  deleteButton.className = "delete_button";
  deleteButton.textContent = "刪除";
  deleteButton.onclick = deleteGroup;

  // Append the group name and delete button to the groups box
  groupsBox.appendChild(groupName);
  groupsBox.appendChild(deleteButton);

  // Append the groups box to the groups container
  const groupsContainer = document.getElementById("groups_container");
  groupsContainer.appendChild(groupsBox);
}

function createNewGroupDiv() {
  // Create a new div with the class "groups_box"
  const groupsBox = document.createElement("div");
  groupsBox.className = "groups_box";

  // Create a div for the group name
  const groupName = document.createElement("input");
  groupName.className = "group_name";
  // groupName.className = "new_group_name";
  groupName.placeholder = "請輸入主揪名稱";

  // Create a div for the create button
  const confirmButton = document.createElement("div");
  confirmButton.className = "confirm_button";
  confirmButton.textContent = "確認";
  confirmButton.onclick = createGroup;

  // Append the group name and delete button to the groups box
  groupsBox.appendChild(groupName);
  groupsBox.appendChild(confirmButton);

  // Append the groups box to the groups container
  const groupsContainer = document.getElementById("groups_container");
  groupsContainer.insertBefore(groupsBox, groupsContainer.firstChild);
}
