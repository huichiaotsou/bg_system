function loadCheckinRecordsByGroup() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.complete_google_jwt;
  const selectedGroupID = document.getElementById("group_select").value;

  // Get past 6 months checkin records
  fetch(`/checkin/group/${selectedGroupID}`, {
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
        throw new Error("Failed to get group's checkin");
      }
    })
    .then((data) => {
      // Handle the server's response
      const recordsContainer = document.getElementById("records_container");
      recordsContainer.innerHTML = `    <div id="record_card_title">
      <div class="record_box">
        <div class="validation">
          簽到狀態
        </div>
        <div class="checkin_date">
          日期
        </div>
        <div class="signer">
          簽到人
        </div>
        <div class="venue">
          使用場地
        </div>
      </div>
      <div class="feedback_box">

      </div>
    </div>`;
      createCheckinDivs(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function createCheckinDivs(checkins) {
  for (let i = 0; i < checkins.length; i++) {
    createSingleCheckinDiv(checkins[i]);
  }
}

function createSingleCheckinDiv(checkin) {
  // Create the record_card div element
  const recordCard = document.createElement("div");
  recordCard.className = "record_card";

  // Create the record_box div element
  const recordBox = document.createElement("div");
  recordBox.className = "record_box";

  // Create the validation div element
  const validation = document.createElement("div");
  switch (checkin.validation_status) {
    case "pending":
      validation.className = "validation pending";
      validation.textContent = "審核中";
      break;
    case "validated":
      validation.className = "validation validated";
      validation.textContent = "簽到成功";
      break;
    case "rejected":
      validation.className = "validation rejected";
      validation.textContent = "簽到失敗";
      break;
    default:
      validation.className = "validation pending";
      validation.textContent = "審核中";
      break;
  }

  // Create the checkin_date div element
  const checkinDate = document.createElement("div");
  checkinDate.className = "checkin_date";
  const dateTime = new Date(checkin.checkin_date);
  checkinDate.textContent = `${dateTime.getMonth() + 1}/${dateTime.getDate()}`;

  // Create the signer div element
  const signer = document.createElement("div");
  signer.className = "signer";
  signer.textContent = checkin.user_name;

  // Create the venue div element
  const venue = document.createElement("div");
  venue.className = "venue";
  venue.textContent = checkin.venue_name;

  // Append the validation, checkin_date, signer, and venue elements to the record_box div
  recordBox.appendChild(validation);
  recordBox.appendChild(checkinDate);
  recordBox.appendChild(signer);
  recordBox.appendChild(venue);

  // Create the feedback_box div element
  const feedbackBox = document.createElement("div");
  feedbackBox.className = "feedback_box";

  if (checkin.feedback) {
    // Create the feedback_mark div element
    const feedbackMark = document.createElement("div");
    feedbackMark.className = "feedback_mark";
    feedbackMark.textContent = "!";
    feedbackMark.onclick = function () {
      alert(checkin.feedback);
    };
    feedbackBox.appendChild(feedbackMark);
  }

  // Append the record_box and feedback_box elements to the record_card div
  recordCard.appendChild(recordBox);
  recordCard.appendChild(feedbackBox);

  document.getElementById("records_container").appendChild(recordCard);
}

function loadAllGroups() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.complete_google_jwt;

  // Get past 6 months checkin records
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
        throw new Error("Failed to get group's checkin");
      }
    })
    .then((data) => {
      // Handle the server's response
      createGroupOptions(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function createGroupOptions(groups) {
  for (let i = 0; i < groups.length; i++) {
    createSingleGroupOption(groups[i]);
  }
}

function createSingleGroupOption(group) {
  const option = document.createElement("option");
  option.value = group.id;
  option.textContent = group.group_leader;

  const groupSelect = document.getElementById("group_select");
  groupSelect.appendChild(option);
}
