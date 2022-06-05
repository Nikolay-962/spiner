'use strict';
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: 'yellow'
  },
  warning: {
    color: 'orange',
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: 'red',
    threshold: ALERT_THRESHOLD
  }
};

const gameStart = 'sounds/gameStartScreen.mp3';
const soundStart = 'sounds/count_start.mp3';
const soundEnd = 'sounds/count_end.mp3';

let timeValueControl = document.querySelector('.time-value');
let timeValue = timeValueControl.value;
let timeLimit = timeValue;
let timePassed = 0;
let timeLeft = timeLimit;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

timeValueControl.addEventListener('change', () => {
  timeLimit = timeValueControl.value;
});

let timerContainer = document.querySelector('#timer');

function resetTimer() {
  timerContainer.innerHTML = `
  <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
          id="base-timer-path-remaining"
          stroke-dasharray="283"
          class="base-timer__path-remaining ${remainingPathColor}"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">${formatTime(timeLimit)}</span>
  </div>
  `;
}

resetTimer();

const playSound = (sound) => {
  let audio = new Audio(sound);
  audio.volume = 0.2;
  audio.play();
}

function onTimesUp() {
  clearInterval(timerInterval);
  playSound(soundEnd);
}

let resetTimerBtn = document.querySelector('.reset-timer');
let timerLabel = document.querySelector('#base-timer-label');

resetTimerBtn.addEventListener('click', () => {
  timePassed = 0;
  timeLeft = timeLimit;
  timerLabel.textContent = formatTime(timeValueControl.value);

  setCircleDasharray();
  setRemainingPathColor(timeValueControl.value);

  if (startTimerBtn.hasAttribute('disabled')) {
    clearInterval(timerInterval);
    startTimerBtn.removeAttribute('disabled');
  }
});

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = timeLimit - timePassed;
    timerLabel.textContent = formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

const timerPath = document.querySelector('#base-timer-path-remaining');

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    timerPath.classList.remove(warning.color);
    timerPath.classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    timerPath.classList.remove(info.color);
    timerPath.classList.add(warning.color);
  } else {
    timerPath.classList.remove(alert.color);
    timerPath.classList.add(info.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / timeLimit;
  return rawTimeFraction - (1 / timeLimit) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  timerPath.setAttribute('stroke-dasharray', circleDasharray);
}

let startTimerBtn = document.querySelector('.start-timer');

startTimerBtn.addEventListener('click', () => {
  startTimer();
  startTimerBtn.setAttribute('disabled', true);
  playSound(soundStart);
});

function blackBox() {
  let audio = document.getElementById("b-box");
  audio.src = 'sounds/black-box.mp3';
  return;
}
let blackBoxPlay = document.getElementById("black-box");
blackBoxPlay.addEventListener('click', () => {
  blackBox()
});


const gameStartPlay = document.getElementById("start");
gameStartPlay.addEventListener('click', () => {
  gamesStart()
});
function gamesStart() {
  let audio = document.getElementById("game-start");
  audio.src = 'sounds/gameStartScreen.mp3';
  return;
}
let mediaWidth = document.querySelector('.img');
mediaWidth.addEventListener('click', () => {

})