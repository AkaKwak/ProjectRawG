import { Icon } from './Icon';

export const PlatformSelect = (onPlatformChange) => {
  const platforms = [
    { id: '', name: 'All Platforms' },
    { id: '4', name: 'PC', icon: 'pc' },
    { id: '187', name: 'PlayStation 5', icon: 'playstation' },
    { id: '1', name: 'Xbox Series X', icon: 'xbox' },
    { id: '7', name: 'Nintendo Switch', icon: 'nintendo' }
  ];

  const render = () => `
    <div class="platform-select">
      <select class="platform-filter" aria-label="Filter by platform">
        ${platforms.map(platform => `
          <option value="${platform.id}">
            ${platform.icon ? Icon(platform.icon, 'platform-icon') : ''}
            ${platform.name}
          </option>
        `).join('')}
      </select>
    </div>
  `;

  const setup = () => {
    const select = document.querySelector('.platform-filter');
    select?.addEventListener('change', (e) => {
      onPlatformChange(e.target.value);
    });
  };

  return {
    render,
    setup
  };
}; 