import { domElements } from './dom-elements';

let seconds = 0;
let interval = null;

const startTimer = () => {
  if (interval !== null) return;

  interval = setInterval(() => {
    seconds++;
    updateDisplay();
  }, 1000);
};

const updateDisplay = () => {
  const timer = domElements.timerValue;

  const mins = Math.floor(seconds / 60);
  const secs = seconds - mins * 60;

  timer.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return timer;
};

const stopTimer = () => {
  if (interval !== null) {
    clearInterval(interval);
    interval = null;
  }
};

const resetTimer = () => {
  stopTimer();
  seconds = 0;
  updateDisplay();
};

const getTime = () => {
  const timer = domElements.timerValue;
  return timer ? timer.textContent : '00:00';
};

export { startTimer, stopTimer, resetTimer, getTime };
