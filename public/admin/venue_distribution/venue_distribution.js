function loadScheduleOnSelect() {
  const selectElement = document.getElementById("weekdays");
  selectElement.addEventListener("change", function (event) {
    const selectedWeekday = event.target.value;
    loadSchedule(selectedWeekday);
  });
}

function loadWeekday() {
  const today = new Date();
  const weekdayNumber = today.getDay();
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekdayName = weekdays[weekdayNumber];

  // Load current weekday as selected option
  const selectElement = document.getElementById("weekdays");
  for (let i = 0; i < selectElement.options.length; i++) {
    const option = selectElement.options[i];
    if (option.value === weekdayName) {
      option.selected = true;
      break;
    }
  }

  // Load the schedule for that weekday
  loadSchedule(weekdayName);
}

function loadSchedule(weekdayName) {
  // TODO: load that day's schedule
}

function addGroupSlotListener() {
  // Get all elements with the class "group_slot"
  const groupSlots = document.getElementsByClassName("group_slot");

  // Add a click event listener to each element
  Array.from(groupSlots).forEach((slot) => {
    slot.addEventListener("click", handleClick);
  });

  // Event handler function
  function handleClick(event) {
    // Get weekday
    const selectedWeekday = document.getElementById("weekdays").value;
    // Get the data attributes from the clicked element
    const timeSlot = event.target.dataset.timeslot;
    const venueID = event.target.dataset.venueid;

    // const groupName = prompt("請輸入此時段聚會之小組");
    const schedule = {
      scheduled_day: selectedWeekday,
      scheduled_time: timeSlot,
      venueID,
      groupName,
    };
    localStorage.setItem("schedule", JSON.stringify(schedule));

    // Change the front end look from displaying time to the group name
    event.target.textContent = groupName;
    // localStorage.removeItem("schedule");
  }
}
