perfecthalf = ((1 / 37) * 360) / 2;

let currentLength = perfecthalf;

$(".wheel svg").css("transform", "rotate(" + perfecthalf + "deg)");

$(".spin").click(() => {
  $(".wheel svg").css("filter", "blur(4px)");

  spininterval = getRandomInt(0, 37) * (360 / 37) + getRandomInt(3, 4) * 360;
  currentLength += spininterval;

  numofsecs = spininterval;

  //console.log(currentLength);
  $(".wheel svg").css("transform", "rotate(" + currentLength + "deg)");

  setTimeout(function () {
    $(".wheel svg").css("filter", "blur(0px)");
  }, numofsecs);

  gong();

  setTimeout(() => {
    play();
  }, 2000);

});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function () {
  $(".spin").click();
})

function gong() {
  let gong = document.getElementById("gong");
  audio.src = 'sounds/gong.mp3';
  return;
}

function play() {
  let audio = document.getElementById("audio");
  audio.src = 'sounds/new-spin.mp3';
  return;
}

let numberColors = document.querySelectorAll('.number');
let fieldColors = document.querySelectorAll('.field');
for (let fieldColor of fieldColors) {
  fieldColor.onclick = function () {
    this.classList.add('red')
  }
}

