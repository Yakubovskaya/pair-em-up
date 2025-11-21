import { domElements } from './dom-elements.js';

const updateCounter = (
  buttonKey,
  counterKey,
  used,
  maxUses,
  additionalCondition = null
) => {
  const button = domElements[buttonKey];
  if (!button) return;
  const counter = domElements[counterKey];
  if (!counter) return;

  const remaining = maxUses - used;
  counter.textContent = remaining;

  let isDisabled = remaining === 0;

  if (!isDisabled && additionalCondition) {
    isDisabled = additionalCondition();
  }

  button.disabled = isDisabled;
};

const enableButton = (buttonKey) => {
  const button = domElements[buttonKey];
  if (button) {
    button.disabled = false;
  }
};

export { updateCounter, enableButton };
