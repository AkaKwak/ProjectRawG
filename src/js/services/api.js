const API_KEY = "26edafe90ed843deadef86b943d6525d";  // Temporairement ici pour le debug
const BASE_URL = "https://api.rawg.io/api";

const defaultParams = {
  key: API_KEY,
  page_size: 9
};

export const fetchGames = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams({
      key: API_KEY,
      ...params
    });

    const response = await fetch(`${BASE_URL}/games?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('API Response:', data); // Pour le debug
    return data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

export const fetchGameDetails = async (gameId) => {
  try {
    const response = await fetch(`${BASE_URL}/games/${gameId}?key=${API_KEY}`);
    if (!response.ok) throw new Error('Network response was not ok');
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error;
  }
};

export const fetchGameScreenshots = async (gameId) => {
  try {
    const response = await fetch(`${BASE_URL}/games/${gameId}/screenshots?key=${API_KEY}`);
    if (!response.ok) throw new Error('Network response was not ok');
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching screenshots:', error);
    throw error;
  }
};