import { Icon } from './Icon';

export const SearchBar = () => {
  const template = `
    <div class="nav-content">
      <a href="/" class="home-link">THE HYPER PROGAME</a>
      <div class="search-container">
        <input type="search" class="search-input" placeholder="Find a game...">
      </div>
    </div>
  `;

  return {
    render: () => template
  };
}; 