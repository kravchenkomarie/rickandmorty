import render from './render';

const favoritesContainer = document.querySelector('#favoritesContainer');
const itemsPerPage = 4;

const next = document.querySelector('#next');

function showFavorites(currentFavPage) {
  const favoritesObj = JSON.parse(localStorage.getItem('favorites')) || {};
  const favoritesArray = Object.values(favoritesObj);
  let totalPages = Math.ceil(favoritesArray.length / itemsPerPage);

  if (currentFavPage === totalPages) {
    next.disabled = true;
  } else {
    next.disabled = false;
  }

  if (currentFavPage === 1) {
    prev.disabled = true;
  } else {
    prev.disabled = false;
  }

  totalPages = Math.ceil(favoritesArray.length / itemsPerPage);
  const startIndex = (currentFavPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, favoritesArray.length);

  favoritesContainer.innerHTML = '';
  render({ results: favoritesArray.slice(startIndex, endIndex) });
}

export { showFavorites };
