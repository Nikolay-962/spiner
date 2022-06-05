"use strict";const FULL_DASH_ARRAY=283,WARNING_THRESHOLD=10,ALERT_THRESHOLD=5,COLOR_CODES={info:{color:"yellow"},warning:{color:"orange",threshold:10},alert:{color:"red",threshold:5}},gameStart="sounds/gameStartScreen.mp3",soundStart="sounds/count_start.mp3",soundEnd="sounds/count_end.mp3";let timeValueControl=document.querySelector(".time-value"),timeValue=timeValueControl.value,timeLimit=timeValue,timePassed=0,timeLeft=timeLimit,timerInterval=null,remainingPathColor=COLOR_CODES.info.color;timeValueControl.addEventListener("change",(()=>{timeLimit=timeValueControl.value}));let timerContainer=document.querySelector("#timer");function resetTimer(){timerContainer.innerHTML=`\n  <div class="base-timer">\n    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n      <g class="base-timer__circle">\n        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>\n        <path\n          id="base-timer-path-remaining"\n          stroke-dasharray="283"\n          class="base-timer__path-remaining ${remainingPathColor}"\n          d="\n            M 50, 50\n            m -45, 0\n            a 45,45 0 1,0 90,0\n            a 45,45 0 1,0 -90,0\n          "\n        ></path>\n      </g>\n    </svg>\n    <span id="base-timer-label" class="base-timer__label">${formatTime(timeLimit)}</span>\n  </div>\n  `}resetTimer();const playSound=e=>{let t=new Audio(e);t.volume=.2,t.play()};function onTimesUp(){clearInterval(timerInterval),playSound(soundEnd)}let resetTimerBtn=document.querySelector(".reset-timer"),timerLabel=document.querySelector("#base-timer-label");function startTimer(){timerInterval=setInterval((()=>{timePassed=timePassed+=1,timeLeft=timeLimit-timePassed,timerLabel.textContent=formatTime(timeLeft),setCircleDasharray(),setRemainingPathColor(timeLeft),0===timeLeft&&onTimesUp()}),1e3)}function formatTime(e){let t=e%60;return t<10&&(t=`0${t}`),`${Math.floor(e/60)}:${t}`}resetTimerBtn.addEventListener("click",(()=>{timePassed=0,timeLeft=timeLimit,timerLabel.textContent=formatTime(timeValueControl.value),setCircleDasharray(),setRemainingPathColor(timeValueControl.value),startTimerBtn.hasAttribute("disabled")&&(clearInterval(timerInterval),startTimerBtn.removeAttribute("disabled"))}));const timerPath=document.querySelector("#base-timer-path-remaining");function setRemainingPathColor(e){const{alert:t,warning:a,info:r}=COLOR_CODES;e<=t.threshold?(timerPath.classList.remove(a.color),timerPath.classList.add(t.color)):e<=a.threshold?(timerPath.classList.remove(r.color),timerPath.classList.add(a.color)):(timerPath.classList.remove(t.color),timerPath.classList.add(r.color))}function calculateTimeFraction(){const e=timeLeft/timeLimit;return e-1/timeLimit*(1-e)}function setCircleDasharray(){const e=`${(283*calculateTimeFraction()).toFixed(0)} 283`;timerPath.setAttribute("stroke-dasharray",e)}let startTimerBtn=document.querySelector(".start-timer");function blackBox(){document.getElementById("b-box").src="sounds/black-box.mp3"}startTimerBtn.addEventListener("click",(()=>{startTimer(),startTimerBtn.setAttribute("disabled",!0),playSound(soundStart)}));let blackBoxPlay=document.getElementById("black-box");blackBoxPlay.addEventListener("click",(()=>{blackBox()}));const gameStartPlay=document.getElementById("start");function gamesStart(){document.getElementById("game-start").src="sounds/gameStartScreen.mp3"}gameStartPlay.addEventListener("click",(()=>{gamesStart()}));let mediaWidth=document.querySelector(".img");mediaWidth.addEventListener("click",(()=>{}));