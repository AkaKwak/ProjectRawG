import { fetchGames } from '../services/api';
import { GameCard } from './GameCard';
import { LoadingSpinner } from './LoadingSpinner';
import Masonry from 'masonry-layout';

export const GameGrid = (options = {}) => {
  const {
    pageSize = 9,
    showLoadMore = false,
    initialFilters = {}
  } = options;

  const state = {
    currentPage: 1,
    isLoading: false,
    hasMore: true,
    msnry: null,
    games: []
  };

  const render = () => `
    <div class="games-container">
      <div class="games-grid"></div>
      ${showLoadMore ? '<button class="load-more-button" style="display: none;">Show More</button>' : ''}
    </div>
  `;

  const loadGames = async () => {
    if (state.isLoading || !state.hasMore) return;
    
    const grid = document.querySelector('.games-grid');
    state.isLoading = true;

    try {
      grid.innerHTML = LoadingSpinner().render();

      const params = {
        page: state.currentPage,
        ...initialFilters
      };

      const data = await fetchGames(params);
      
      state.hasMore = !!data.next;
      state.games = [...state.games, ...data.results];

      displayGames();
      updateLoadMoreButton();
    } catch (error) {
      grid.innerHTML = `
        <div class="error-message">
          <p>Failed to load games. Please try again.</p>
          <button onclick="window.location.reload()">Retry</button>
        </div>
      `;
    } finally {
      state.isLoading = false;
    }
  };

  const displayGames = () => {
    const grid = document.querySelector('.games-grid');
    const fragment = document.createDocumentFragment();

    state.games.forEach(game => {
      const gameElement = document.createElement('div');
      gameElement.innerHTML = GameCard(game).render();
      const card = gameElement.firstElementChild;
      
      // Gérer le chargement des images
      const img = card.querySelector('img');
      if (img) {
        card.style.opacity = '0';
        img.onload = () => {
          card.style.opacity = '1';
          state.msnry?.layout();
        };
      }

      fragment.appendChild(card);
    });

    grid.innerHTML = '';
    grid.appendChild(fragment);

    initMasonry();
  };

  const initMasonry = () => {
    const grid = document.querySelector('.games-grid');
    
    if (!state.msnry) {
      state.msnry = new Masonry(grid, {
        itemSelector: '.game-card',
        columnWidth: 300,
        gutter: 20,
        fitWidth: true,
        transitionDuration: '0.3s'
      });
    } else {
      state.msnry.reloadItems();
      state.msnry.layout();
    }
  };

  const updateLoadMoreButton = () => {
    const button = document.querySelector('.load-more-button');
    if (button) {
      button.style.display = state.hasMore ? 'block' : 'none';
    }
  };

  const setupEventListeners = () => {
    if (showLoadMore) {
      const button = document.querySelector('.load-more-button');
      button?.addEventListener('click', () => {
        state.currentPage++;
        loadGames();
      });
    }
  };

  return {
    render,
    setup: () => {
      loadGames();
      setupEventListeners();
    }
  };
}; 