import { onClassicButtonClick } from './start-classic-game.js';

const renderStartScreen = () => {
  const container = document.createElement('div');
  container.classList.add('start-screen');

  const title = document.createElement('h1');
  title.classList.add('title');
  title.textContent = "Pair 'em Up";

  const modes = ['Classic', 'Random', 'Chaotic'];
  const buttonsWrapper = document.createElement('div');
  buttonsWrapper.classList.add('mode-buttons');

  modes.forEach((mode) => {
    const btn = document.createElement('button');
    btn.classList.add('button');
    btn.type = 'button';
    btn.textContent = mode;
    if (mode === 'Classic') {
      btn.addEventListener('click', onClassicButtonClick);
    }
    buttonsWrapper.append(btn);
  });

  const extraButtonsWrapper = document.createElement('div');
  extraButtonsWrapper.classList.add('extra-buttons');

  ['Settings', 'Results'].forEach((text) => {
    const btn = document.createElement('button');
    btn.classList.add('button');
    btn.type = 'button';
    btn.textContent = text;
    extraButtonsWrapper.append(btn);
  });

  const githubWrapper = document.createElement('div');
  githubWrapper.classList.add('github-wrapper');

  const githubLabel = document.createElement('span');
  githubLabel.textContent = 'GitHub:';

  const githubLink = document.createElement('a');
  githubLink.classList.add('github-link');
  githubLink.href = 'https://github.com/Yakubovskaya';
  githubLink.target = '_blank';
  githubLink.textContent = '@Yakubovskaya';

  githubWrapper.append(githubLabel, githubLink);

  container.append(title, buttonsWrapper, extraButtonsWrapper, githubWrapper);
  document.body.append(container);
};

export { renderStartScreen };
