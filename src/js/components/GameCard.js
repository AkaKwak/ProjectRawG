import { PlatformIcon } from './PlatformIcon';

export const GameCard = (game) => {
  const {
    name,
    background_image: backgroundImage,
    platforms = [],
    released,
    rating,
    ratings_count: ratingsCount,
    publishers = [],
    genres = [],
    id
  } = game;

  const render = () => {
    console.log('Game data:', game); // Debug

    if (!game || !game.background_image) {
      console.warn('Invalid game data:', game);
      return '';
    }

    return `
      <article class="game-card">
        <a href="#pagedetail/${game.id}">
          <div class="card-image">
            <img src="${game.background_image}" alt="${game.name}">
          </div>
          <div class="card-content">
            <h3 class="game-title">${game.name}</h3>
            <div class="game-meta">
              <span class="rating">Rating: ${game.rating || 'N/A'}/5</span>
            </div>
          </div>
        </a>
      </article>
    `;
  };

  return {
    render
  };
}; 