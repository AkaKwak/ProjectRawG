import '../assets/styles/main.scss';
import { handleRoute } from './routes';
import { Header } from './components/Header';

// Initialize header
Header();

const setRoute = () => {
  const { hash } = window.location;
  const pathParts = hash.substring(1).split('/');
  const pageName = pathParts[0] || '';
  const pageArgument = pathParts[1] || '';

  if (handleRoute[pageName]) {
    handleRoute[pageName](pageArgument);
  } else {
    handleRoute['']();
  }
};

window.addEventListener('hashchange', setRoute);
window.addEventListener('DOMContentLoaded', setRoute); 