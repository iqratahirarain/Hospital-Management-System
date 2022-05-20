let calendar;
const date = new Date();
const todayDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
var jqxhr = $.get("/schedule", (schedule) => {
  calendarInit(schedule); 
  addEventModal();
});

function calendarInit(schedule, todayDate) {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    initialDate: todayDate,
    selectable: true,
    headerToolbar: {
      left: "prev,next addEvent",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    select: function (info) {},
    customButtons: {
      addEvent: {
        text: "Add Event",
      },
    },
    events: schedule
  });
  calendar.render();
}

function addEventModal() {
  const addEventButton = document.querySelector(".fc-addEvent-button");
  addEventButton.setAttribute("data-bs-toggle", "modal");
  addEventButton.setAttribute("data-bs-target", "#calendarModal");
}
