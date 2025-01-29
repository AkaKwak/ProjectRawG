import { SearchBar } from './SearchBar';

export const Header = () => {
  const render = () => {
    const header = document.querySelector('#mainNav');
    if (!header) return;

    const isHomePage = !window.location.hash || window.location.hash === '#';
    
    if (isHomePage) {
      header.innerHTML = `
        <a href="#" class="home-link">THE HYPER PROGAME</a>
        <a href="#pagelist" class="library-link">GAMES LIBRARY</a>
      `;
    } else {
      header.innerHTML = `
        <a href="#" class="home-link">THE HYPER PROGAME</a>
        <div class="search-container">
          <input type="search" class="search-input" placeholder="Find a game...">
        </div>
      `;

      const searchInput = header.querySelector('.search-input');
      searchInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          window.location.hash = `pagelist?search=${e.target.value}`;
        }
      });
    }

    const homeLink = header.querySelector('.home-link');
    homeLink?.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '';
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
  };

  window.addEventListener('hashchange', render);
  render();
}; 