import { fetchGames } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { GameCard } from '../components/GameCard';

export const Home = () => {
  const state = {
    games: [],
    isLoading: true,
    error: null
  };

  const render = () => {
    const pageContent = document.querySelector('#pageContent');
    if (!pageContent) return;

    pageContent.innerHTML = `
      <section class="page-home">
        <h1>Most Anticipated Games</h1>
        <p class="subtitle">Discover upcoming and trending games</p>
        <div class="games-grid">
          ${state.isLoading ? LoadingSpinner().render() : renderGames()}
        </div>
      </section>
    `;
  };

  const renderGames = () => {
    if (state.error) {
      return `<div class="error-message"><p>${state.error.message}</p></div>`;
    }

    return state.games.map(game => GameCard(game).render()).join('');
  };

  const loadGames = async () => {
    try {
      state.isLoading = true;
      render();

      const data = await fetchGames({
        ordering: '-added',
        dates: '2024-01-01,2024-12-31',
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