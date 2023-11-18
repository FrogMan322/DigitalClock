const container = document.querySelector(".container");
const clockContainer = document.getElementById("clock__container");
const timerNotification = document.querySelector(".timerNotification");
const alarm = document.getElementById("alarm");
const setTimeForm = document.querySelector(".setClockTimer");
const setClockBtn = document.querySelector(".clockBtn");
const stopAlarm = document.getElementById("stopAlaram");
const savedTime = JSON.parse(localStorage.getItem("timer")) || {};

function renderTime() {
  const date = new Date();
  let sec = date.getSeconds();
  let minuts = date.getMinutes();
  let hours = date.getHours();

  clockContainer.innerHTML = `
  <h1 class="clockTime" id="clockTime">${
    hours < 10 ? (hours = "0" + hours) : hours
  }:${minuts < 10 ? (minuts = "0" + minuts) : minuts}:${
    sec < 10 ? (sec = "0" + sec) : sec
  } </h1>
  `;
  if (savedTime.booleon) {
    timerNotification.classList.add("hidden");
  } else if (savedTime.booleon === false) {
    timerNotification.classList.remove("hidden");
  }
}

setInterval(renderTime, 1000);

setClockBtn.addEventListener("click", (e) => {
  timerNotification.classList.add("hidden");
});
setTimeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const sethours = e.target[0].value;
  const setminutes = e.target[1].value;
  const setseconds = e.target[2].value;

  savedTime.hours = sethours;
  savedTime.minutes = setminutes;
  savedTime.seconds = setseconds;
  savedTime.booleon = true;
  localStorage.setItem("timer", JSON.stringify(savedTime));
});

function addTimerAnimation() {
  const date = new Date();
  const hours = date.getHours();
  const minuts = date.getMinutes();
  const sec = date.getSeconds();

  if (
    parseInt(savedTime.hours) === hours &&
    parseInt(savedTime.minutes) === minuts &&
    parseInt(savedTime.seconds) === sec
  ) {
    container.classList.add("shake");
    alarm.muted = false;
    alarm.play();
    alarm.loop = true;
  }
}
setInterval(addTimerAnimation, 1000);

stopAlarm.addEventListener("click", () => {
  timerNotification.classList.remove("hidden");

  container.classList.remove("shake");
  alarm.pause();
  alarm.currentTime = 0;
  savedTime.hours = "";
  savedTime.minutes = "";
  savedTime.seconds = "";
  savedTime.booleon = false;
  localStorage.setItem("timer", JSON.stringify(savedTime));
});
