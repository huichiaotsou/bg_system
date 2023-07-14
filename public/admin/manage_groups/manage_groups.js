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

function deleteGroupFromView(event) {
  const groupBox = event.target.parentNode;
  groupBox.parentNode.removeChild(groupBox);
}

function deleteGroup(event) {
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorageUser.complete_google_jwt;

  // Get group ID to be deleted
  const groupElement = event.target.previousElementSibling;
  const groupID = groupElement.getAttribute("data-groupid");

  // Remove group from the database
  fetch(`/groups/${groupID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        let errorText = "刪除失敗";
        if (response.status == 409) {
          errorText += "，小組仍有組員，請更新小組員資料";
        }
        alert(errorText);
        throw new Error("Failed to delete groups");
      }
    })
    .then((data) => {
      deleteGroupFromView(event);
    })
    .catch((error) => {
      console.error(error);
    });
}

function createGroup(event) {
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorageUser.complete_google_jwt;

  const inputField = event.target.previousElementSibling;
  const groupLeaderName = inputField.value;

  // Add group to the database
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
        alert("小組新增失敗");
        throw new Error("Failed to add groups");
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
  deleteGroupFromView(event);
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
