function setToday() {
  const currDate = getCurrentDate();
  const dateInputField = document.getElementById("checkin_day");
  dateInputField.value = currDate;
}

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Adding 1 to month since it is zero-indexed
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function loadCheckinRecordsByDay() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.complete_google_jwt;

  // Default Today
  const date = document.getElementById("checkin_day").value || getCurrentDate();
  fetch(`/checkin/date/${date}`, {
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
        throw new Error("Failed to get that day's checkins");
      }
    })
    .then((data) => {
      // Clear records
      document.getElementById("records_container").innerHTML = "";
      createTitle();
      createCheckinDivs(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function createTitle() {
  // Create the record_card_title div
  var recordCardTitle = document.createElement("div");
  recordCardTitle.id = "record_card_title";

  // Create the record_box div
  var recordBox = document.createElement("div");
  recordBox.className = "record_box";

  // Create the validation div
  var validation = document.createElement("div");
  validation.className = "validation";
  validation.textContent = "審核狀態";

  // Create the group div
  var group = document.createElement("div");
  group.className = "group";
  group.id = "group_title";
  group.textContent = "小組";

  // Create the venue div
  var venue = document.createElement("div");
  venue.className = "venue";
  venue.id = "venue_title";
  venue.textContent = "使用場地";

  // Create the feedback_box div
  var feedbackBox = document.createElement("div");
  feedbackBox.className = "feedback_box";
  feedbackBox.textContent = "反饋";

  // Append the child elements to their respective parent elements
  recordBox.appendChild(validation);
  recordBox.appendChild(group);
  recordBox.appendChild(venue);
  recordBox.appendChild(feedbackBox);

  recordCardTitle.appendChild(recordBox);

  // Append the record_card_title div to the document body or any other desired container
  document.getElementById("records_container").appendChild(recordCardTitle);
}

function createCheckinDivs(checkins) {
  for (let i = 0; i < checkins.length; i++) {
    createSingleCheckinDiv(checkins[i]);
  }
  // add click listener to the created validation options
  addValidationButtonListener();
  addVenueButtonListener();
}

function createSingleCheckinDiv(checkin) {
  // Create the outermost div with class "record_card"
  const recordCard = document.createElement("div");
  recordCard.className = "record_card";

  // Create the div with class "record_box"
  const recordBox = document.createElement("div");
  recordBox.className = "record_box";

  // Create the div with class "validation"
  const validation = document.createElement("div");
  validation.className = "validation";

  // Create the div with class "dropdown"
  const dropdown = document.createElement("div");
  dropdown.className = "dropdown";

  // Create the button with classes "btn btn-sm btn-outline-dark dropdown-toggle"
  const button = document.createElement("button");
  button.className = "btn btn-sm dropdown-toggle ";

  switch (checkin.validation_status) {
    case "pending":
      button.className += "btn-outline-warning";
      break;
    case "validated":
      button.className += "btn-outline-success";
      break;
    case "rejected":
      button.className += "btn-outline-danger";
      break;
    default:
      button.className += "btn-outline-dark";
      break;
  }

  button.type = "button";
  button.setAttribute("data-toggle", "dropdown");
  button.setAttribute("data-checkinid", checkin.checkin_id);
  const statusTranslation = {
    pending: "待審核",
    validated: "通過",
    rejected: "撤銷",
  };
  button.textContent = statusTranslation[checkin.validation_status];

  // Create the div with id "group_options_container" and class "dropdown-menu"
  const optionsContainer = document.createElement("div");
  optionsContainer.id = "group_options_container";
  optionsContainer.className = "dropdown-menu";

  // Create the dropdown items
  const dropdownItems = [
    { text: "待審核", validationStatus: "pending" },
    { text: "通過", validationStatus: "validated" },
    { text: "撤銷", validationStatus: "rejected" },
  ];

  dropdownItems.forEach((item) => {
    const dropdownItem = document.createElement("a");
    dropdownItem.className = "dropdown-item validation_status_option";
    dropdownItem.href = "#";
    dropdownItem.dataset.checkinid = checkin.checkin_id;
    dropdownItem.setAttribute("data-validationstatus", item.validationStatus);
    dropdownItem.textContent = item.text;
    optionsContainer.appendChild(dropdownItem);
  });

  // Append the button and optionsContainer to the dropdown div
  dropdown.appendChild(button);
  dropdown.appendChild(optionsContainer);

  // Append the dropdown div to the validation div
  validation.appendChild(dropdown);

  // Create the div with class "group" and data-groupid="1"
  const group = document.createElement("div");
  group.className = "group";
  group.setAttribute("data-groupid", checkin.group_id);
  group.textContent = checkin.group_leader;

  // Create the div with class "venue" and data-venueid="1"
  const venue = document.createElement("div");
  venue.className = "venue";
  createVenueOpts(venue, checkin);

  // Create the div with class "feedback_box"
  const feedbackBox = document.createElement("div");
  feedbackBox.className = "feedback_box";

  // Create the button with classes "btn btn-sm btn-outline-dark"
  const feedbackButton = document.createElement("button");
  feedbackButton.className = "btn btn-sm btn-outline-dark";
  feedbackButton.type = "button";
  feedbackButton.setAttribute("data-checkinid", checkin.checkin_id);
  feedbackButton.setAttribute("data-feedback", checkin.feedback);
  feedbackButton.onclick = updateFeedbackAPI;
  feedbackButton.textContent = "反饋";

  // Append the feedbackButton to the feedbackBox div
  feedbackBox.appendChild(feedbackButton);

  // Append the validation, group, venue, and feedbackBox to the recordBox div
  recordBox.appendChild(validation);
  recordBox.appendChild(group);
  recordBox.appendChild(venue);
  recordBox.appendChild(feedbackBox);

  // Append the recordBox to the recordCard div
  recordCard.appendChild(recordBox);

  // Append the recordCard to the records_container
  const recordsContainer = document.getElementById("records_container");
  recordsContainer.appendChild(recordCard);
}

function updateFeedbackAPI(event) {
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorageUser.complete_google_jwt;

  let feedback = event.target.dataset.feedback;
  const checkinID = event.target.dataset.checkinid;

  let promptString = "";
  if (feedback != "null") {
    promptString += `更新反饋：`;
  }
  if (feedback == "null") {
    feedback = "";
  }
  const newFeedback = prompt(promptString, feedback);
  if (newFeedback.trim().length == 0) {
    return;
  }
  feedback = newFeedback;

  const update = {
    feedback,
    checkinID,
  };
  fetch("/checkin/feedback", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ update }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to update feedback of checkin");
      }
    })
    .then((data) => {
      console.log(data);
      event.target.dataset.feedback = feedback;
    })
    .catch((error) => {
      console.error(error);
    });
}

function createVenueOpts(venue, checkin) {
  // Create the outer div element with class "dropdown"
  var dropdownDiv = document.createElement("div");
  dropdownDiv.className = "dropdown";

  // Create the button element
  var button = document.createElement("button");
  button.className = "btn btn-sm btn-outline-dark dropdown-toggle";
  button.type = "button";
  button.setAttribute("data-toggle", "dropdown");
  button.setAttribute("data-checkinid", checkin.checkin_id);
  button.setAttribute("data-venueid", checkin.venue_id);
  button.textContent = checkin.venue_name;

  // Create the inner div element with class "group_options_container"
  var innerDiv = document.createElement("div");
  innerDiv.className = "group_options_container dropdown-menu";

  // Create the dropdown item anchor elements
  var dropdownItems = [
    { venueId: "1", text: "Living Room" },
    { venueId: "2", text: "Glassroom" },
    { venueId: "3", text: "eHQ" },
    { venueId: "4", text: "Kids Central" },
    { venueId: "5", text: "Gather" },
  ];

  dropdownItems.forEach(function (item) {
    var anchor = document.createElement("a");
    anchor.className = "dropdown-item venue_option";
    anchor.href = "#";
    anchor.setAttribute("data-venueid", item.venueId);
    anchor.setAttribute("data-checkinid", checkin.checkin_id);
    anchor.textContent = item.text;
    innerDiv.appendChild(anchor);
  });

  // Append the elements to the document
  dropdownDiv.appendChild(button);
  dropdownDiv.appendChild(innerDiv);

  // Add the dropdown to the venue div
  venue.appendChild(dropdownDiv);
}

function addValidationButtonListener() {
  const buttons = document.getElementsByClassName("validation_status_option");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (event) {
      const validationStatus = event.target.dataset.validationstatus;
      const checkinID = event.target.dataset.checkinid;
      const statusText = event.target.textContent;

      const validationBox = event.target.parentNode.previousElementSibling;

      for (let c of validationBox.classList) {
        if (c.includes("btn-outline")) {
          validationBox.classList.remove(c);

          // Update style with bootstrap class name
          if (validationStatus == "pending") {
            validationBox.classList.add("btn-outline-warning");
          }
          if (validationStatus == "validated") {
            validationBox.classList.add("btn-outline-success");
          }
          if (validationStatus == "rejected") {
            validationBox.classList.add("btn-outline-danger");
          }
        }
      }

      validationBox.dataset.validationstatus = validationStatus;
      validationBox.dataset.checkinid = checkinID;
      validationBox.textContent = statusText;

      updateValidationStatus({ validationStatus, checkinID });
    });
  }
}

function updateValidationStatus(update) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.complete_google_jwt;

  fetch("/checkin/validation", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ update }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to update validation status of checkin");
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function addVenueButtonListener() {
  const buttons = document.getElementsByClassName("venue_option");

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (event) {
      const venueID = event.target.dataset.venueid;
      const checkinID = event.target.dataset.checkinid;
      const venueName = event.target.textContent;

      const venueBox = event.target.parentNode.previousElementSibling;

      venueBox.dataset.venueid = venueID;
      venueBox.dataset.checkinid = checkinID;
      venueBox.textContent = venueName;

      updateVenueSelection({ venueID, checkinID });
    });
  }
}

function updateVenueSelection(update) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.complete_google_jwt;

  fetch("/checkin/venue", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ update }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to update validation status of checkin");
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}
