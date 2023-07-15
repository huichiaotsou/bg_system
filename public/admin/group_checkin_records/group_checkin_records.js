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
      console.log(data);
      for (let record of data) {
        const date = new Date(record.checkin_date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1);
        const day = String(date.getDate()).padStart(2, "0");
        const dateID = "" + year + month + +day;
        const dateDiv = document.getElementById(dateID);
        if (record.validation_status == "validated") {
          dateDiv.style =
            "color: green; font-size: bolder; border-bottom: 1px solid green; ";
        }
        // if (record.validation_status == "rejected") {
        //   dateDiv.style =
        //     "color: red; font-size: bolder; border-bottom: 1px solid red; ";
        // }
      }
    })
    .catch((error) => {
      console.error(error);
    });
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

function createMonth(year, month) {
  // Create Month Container
  const monthContainer = document.createElement("div");
  monthContainer.setAttribute("class", "month_container");
  monthContainer.innerHTML = `
  <h4>${month + 1}月</h4>
  <div class="week_title">
    <div class="day0">Sun</div>
    <div class="day1">Mon</div>
    <div class="day2">Tue</div>
    <div class="day3">Wed</div>
    <div class="day4">Thu</div>
    <div class="day5">Fri</div>
    <div class="day6">Sat</div>
  </div>`;

  // Figure out which 1st day of this month falls on which weekday
  let momthFirstDay = new Date(year, month, 1).getDay();

  // We need to set the start date sunday
  let startDate = -(momthFirstDay - 1);
  for (let week = 1; week <= getWeeksInMonth(year, month); week++) {
    monthContainer.innerHTML += createWeek(startDate, year, month);
    startDate += 7;
  }

  const calendarContainer = document.getElementById("calendar_container");
  calendarContainer.appendChild(monthContainer);
}

function getLastDayOfMonth(year, month) {
  // Set the date to the following month's first day
  var nextMonth = new Date(year, month + 1, 1);
  // Subtract one day to get the last day of the desired month
  var lastDay = new Date(nextMonth - 1);
  // Return the day component of the last day
  return lastDay.getDate();
}

async function createCalendar() {
  let currYear = new Date().getFullYear();
  let currMonth = new Date().getMonth();
  for (let i = 0; i < 6; i++) {
    createMonth(currYear, currMonth);
    currMonth -= 1;
    if (currMonth == 0) {
      currYear -= 1;
      currMonth = 12;
    }
  }
}

function createWeek(startDate, year, month) {
  const lastDate = getLastDayOfMonth(year, month);

  let html = `<div class="week">`;
  for (let i = 0; i <= 6; i++) {
    const dateID = `${year}${month + 1}${startDate}`;

    if (startDate > 0 && startDate <= lastDate) {
      html += ` <div class="day${i}" id="${dateID}">${startDate}</div>`;
    } else {
      html += ` <div class="day${i}"></div>`;
    }
    startDate++;
  }
  return html;
}

function getWeeksInMonth(year, month) {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startWeek = getWeekNumber(firstDayOfMonth);
  const endWeek = getWeekNumber(lastDayOfMonth);

  return endWeek - startWeek + 1;
}

function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const diff = (date - firstDayOfYear) / millisecondsInDay;
  return Math.floor(diff / 7) + 1;
}
