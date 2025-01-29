import { fetchGames } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { GameCard } from '../components/GameCard';

export const PageList = () => {
  const state = {
    games: [],
    isLoading: true,
    error: null
  };

  const render = () => {
    const pageContent = document.querySelector('#pageContent');
    if (!pageContent) return;

    pageContent.innerHTML = `
      <section class="page-list">
        <div class="games-grid">
          ${state.isLoading ? LoadingSpinner().render() : renderGames()}
        </div>
      </section>
    `;
  };

  const renderGames = () => {
    if (state.error) {
      return `
        <div class="error-message">
          <p>Failed to load games. Please try again.</p>
          <button onclick="window.location.reload()">Retry</button>
        </div>
      `;
    }

    if (!state.games.length) {
      return '<div class="error-message"><p>No games found</p></div>';
    }

    return state.games.map(game => GameCard(game).render()).join('');
  };

  const loadGames = async () => {
    try {
      state.isLoading = true;
      render();

      const data = await fetchGames({
        ordering: '-rating',
        page_size: 9
      });
      
      state.games = data.results;
    } catch (error) {
      state.error = error;
      console.error('Error loading games:', error);
    } finally {
      state.isLoading = false;
      render();
    }
  };

  loadGames();
}; 