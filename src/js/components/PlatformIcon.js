import { PlatformIcons } from './PlatformIcons';

export const PlatformIcon = (platform) => {
  const slug = platform.slug.toLowerCase();
  let iconKey = 'pc';

  if (slug.includes('playstation')) iconKey = 'playstation';
  else if (slug.includes('xbox')) iconKey = 'xbox';
  else if (slug.includes('nintendo')) iconKey = 'nintendo';

  return `
    <a href="#pagelist?platform=${platform.id}" class="platform-link" title="${platform.name}">
      ${PlatformIcons[iconKey]}
    </a>
  `;
}; 