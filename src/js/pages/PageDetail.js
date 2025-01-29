import { fetchGameDetails } from '../services/api';
import { PlatformIcon } from '../components/PlatformIcon';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const PageDetail = (gameId) => {
  const state = {
    game: null,
    isLoading: true,
    error: null
  };

  const render = () => {
    const pageContent = document.querySelector('#pageContent');
    pageContent.innerHTML = LoadingSpinner().render();
    loadGameDetails();
  };

  const loadGameDetails = async () => {
    try {
      const data = await fetchGameDetails(gameId);
      state.game = data;
      displayGame();
    } catch (error) {
      state.error = error;
      showError();
    } finally {
      state.isLoading = false;
    }
  };

  const displayGame = () => {
    const { game } = state;
    const pageContent = document.querySelector('#pageContent');
    
    pageContent.innerHTML = `
      <section class="game-detail">
        <div class="game-hero" style="background-image: url('${game.background_image}')">
          <div class="hero-content">
            <h1>${game.name}</h1>
            <div class="game-meta">
              <div class="platforms">
                ${game.platforms?.map(p => PlatformIcon(p.platform)).join('')}
              </div>
              <div class="rating">
                <span class="stars">${'★'.repeat(Math.round(game.rating))}</span>
                <span class="count">(${game.ratings_count} votes)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="game-content">
          <div class="game-info">
            <div class="info-section">
              <h2>About</h2>
              <p>${game.description_raw}</p>
            </div>

            <div class="info-section">
              <h2>Details</h2>
              <ul class="details-list">
                <li>
                  <span class="label">Release Date:</span>
                  <span class="value">${new Date(game.released).toLocaleDateString()}</span>
                </li>
                <li>
                  <span class="label">Genre:</span>
                  <span class="value">${game.genres.map(g => g.name).join(', ')}</span>
                </li>
                <li>
                  <span class="label">Publisher:</span>
                  <span class="value">${game.publishers.map(p => p.name).join(', ')}</span>
                </li>
                <li>
                  <span class="label">Developer:</span>
                  <span class="value">${game.developers.map(d => d.name).join(', ')}</span>
                </li>
              </ul>
            </div>

            ${game.website ? `
              <div class="info-section">
                <h2>Links</h2>
                <a href="${game.website}" target="_blank" rel="noopener noreferrer" class="website-link">
                  Official Website
                </a>
              </div>
            ` : ''}
          </div>

          <div class="game-media">
            <h2>Screenshots</h2>
            <div class="screenshots-grid">
              ${game.screenshots?.results.map(screenshot => `
                <div class="screenshot">
                  <img src="${screenshot.image}" alt="Screenshot of ${game.name}">
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>
    `;
  };

  const showError = () => {
    const pageContent = document.querySelector('#pageContent');
    pageContent.innerHTML = `
      <div class="error-message">
        <p>Failed to load game details. Please try again.</p>
        <button onclick="window.location.reload()">Retry</button>
      </div>
    `;
  };

  render();
}; 