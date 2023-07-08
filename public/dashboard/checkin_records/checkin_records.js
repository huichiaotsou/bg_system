function loadCheckinRecordsByGroup() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.complete_google_jwt;

  // TODO: to get year and month from the select list
  fetch(`/checkin/group/${user.group_id}/year/2023/month/7`, {
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
  const onlyDate = checkin.checkin_date.split("T");
  const dateArray = onlyDate[0].split("-");
  checkinDate.textContent = `${dateArray[1]}/${dateArray[2]}`;

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

function createMonthOptions() {
  // 取得當前日期
  var currentDate = new Date();

  // 建立月份選項的容器元素
  var monthOptionsContainer = document.createElement("div");
  monthOptionsContainer.setAttribute("id", "month_options_container");
  monthOptionsContainer.setAttribute("class", "dropdown-menu");
  monthOptionsContainer.setAttribute("aria-labelledby", "dropdownMenuButton");

  // 迴圈建立月份選項
  for (var i = 0; i < 6; i++) {
    var month = currentDate.getMonth() + 1 - i; // 從當前月份往前推 i 個月
    var year = currentDate.getFullYear();

    // 如果月份小於 1，表示跨年
    if (month < 1) {
      month += 12;
      year -= 1;
    }

    // 建立單個月份選項的元素
    var dropdownItem = document.createElement("a");
    dropdownItem.setAttribute("class", "dropdown-item");
    dropdownItem.setAttribute("href", "#");
    dropdownItem.setAttribute("data-year", year);
    dropdownItem.setAttribute("data-month", month);
    dropdownItem.textContent = year + " " + month + "月";

    // 將月份選項元素加入容器元素中
    monthOptionsContainer.appendChild(dropdownItem);
  }

  // 建立下拉選單的元素
  var dropdown = document.createElement("div");
  dropdown.setAttribute("class", "dropdown");

  // 建立下拉選單按鈕的元素
  var button = document.createElement("button");
  button.setAttribute("class", "btn btn-sm btn-outline-dark dropdown-toggle");
  button.setAttribute("type", "button");
  button.setAttribute("id", "month");
  button.setAttribute("data-toggle", "dropdown");
  button.setAttribute("aria-haspopup", "true");
  button.setAttribute("aria-expanded", "false");
  button.textContent = "月份";

  // 將月份選項容器加入下拉選單元素中
  dropdown.appendChild(button);
  dropdown.appendChild(monthOptionsContainer);

  // 將下拉選單元素加入月份選擇的容器中
  var monthSelect = document.getElementById("month_selection");
  monthSelect.appendChild(dropdown);
}
