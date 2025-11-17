import '../styles/style.scss';
import { renderStartScreen } from './render-start-screen';

const addFavicon = (url) => {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/x-icon';
  link.href = url;
  document.head.appendChild(link);
};

addFavicon('./favicon.ico');

renderStartScreen();
