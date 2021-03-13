'use strict';

const commandBox = document.querySelector('.count-command');
const plusCommand = document.querySelector('.plus-command');
const minusCommand = document.querySelector('.minus-command');

const viewersBox = document.querySelector('.count-viewers');
const plusViewers = document.querySelector('.plus-viewers');
const minusViewers = document.querySelector('.minus-viewers');

let commandCount = 0;
let viewersCount = 0;

plusCommand.addEventListener('click', () => {
  commandCount++;
  commandBox.textContent = commandCount;
});

minusCommand.addEventListener('click', () => {
  if (commandCount > 0) {
    commandCount--;
    commandBox.textContent = commandCount;
  }  
});

plusViewers.addEventListener('click', () => {
  viewersCount++;
  viewersBox.textContent = viewersCount;
});

minusViewers.addEventListener('click', () => {
  if (viewersCount > 0) {
    viewersCount--;
    viewersBox.textContent = viewersCount;
  }  
});