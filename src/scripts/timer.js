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
  const element = document.querySelector('.game__timer-value');

  const mins = Math.floor(seconds / 60);
  const secs = seconds - mins * 60;

  element.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return element;
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
  const element = document.querySelector('.game__timer-value');
  return element ? element.textContent : '00:00';
};

export { startTimer, stopTimer, resetTimer, getTime };
