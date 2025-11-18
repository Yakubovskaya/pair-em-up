let successSound = null;
let failSound = null;
let volume = 0.3;

const initSounds = () => {
  successSound = new Audio();
  successSound.src = './sounds/success-sound.mp3';
  successSound.volume = volume;
  successSound.preload = 'auto';

  failSound = new Audio();
  failSound.src = './sounds/fail-sound.mp3';
  failSound.volume = volume;
  failSound.preload = 'auto';
};

const playSuccessSound = () => {
  if (!successSound) {
    initSounds();
  }
  if (successSound) {
    successSound.currentTime = 0;
    successSound.play();
  }
};

const playFailSound = () => {
  if (!failSound) {
    initSounds();
  }
  if (failSound) {
    failSound.currentTime = 0;
    failSound.play();
  }
};

export { playSuccessSound, playFailSound, initSounds };
