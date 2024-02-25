import render from './render';
import data from './data.js';
import { showFavorites } from './favorites';

const prev = document.querySelector('#prev');
const next = document.querySelector('#next');

const mainBtn = document.querySelector('#mainBtn');
const showFavBtn = document.querySelector('#favBtn');
const buttons = document.querySelector('.buttons');

const favoritesContainer = document.querySelector('#favoritesContainer');

prev.disabled = true;
next.disabled = false;
let currentPage = 1;
let pages = 0;

async function getDataForButtons(page) {
  currentPage = page;
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  const data = await response.json();
  pages = data.info.pages;
  render(data);
  pagination();
}

function pagination(currentStatusPage) {
  let currentFavPage = 1;

  if (currentPage > 1) {
    prev.disabled = false;
  }
  const intervalStart = currentPage - 3;
  const intervalEnd = currentPage + 3;
  buttons.innerHTML = '';
  for (let i = 1; i <= pages; i++) {
    let span = document.createElement('button');
    span.classList.add('btn');
    if (i >= intervalEnd && i !== 1 && i !== pages) {
      span.classList.remove('btn');
      span.style.display = 'none';
    }
    if (i <= intervalStart && i !== 1 && i !== pages) {
      span.classList.remove('btn');
      span.style.display = 'none';
    }
    span.textContent = i;
    buttons.append(span);
    span.addEventListener('click', () => {
      getDataForButtons(i);
    });
  }

  mainBtn.addEventListener('click', () => {
    buttons.style.display = 'block';
    currentStatusPage = 'main';
    favoritesContainer.innerHTML = '';
    getDataForButtons(1);
    pagination(currentStatusPage);
  });

  showFavBtn.addEventListener('click', () => {
    buttons.style.display = 'none';
    currentStatusPage = 'favorites';
    showFavorites(1);
  });

  prev.addEventListener('click', async () => {
    if (currentFavPage === 1) {
      prev.disabled = true;
    }

    if (currentStatusPage === 'main') {
      if (currentPage > 1) {
        prev.disabled = false;
        currentPage--;
        getDataForButtons(currentPage);
      }
      next.disabled = false;
    } else if (currentStatusPage === 'favorites') {
      if (currentFavPage > 1) {
        prev.disabled = false;
        currentFavPage--;
        showFavorites(currentFavPage);
      }
      next.disabled = false;
    }
  });

  next.addEventListener('click', async () => {
    if (currentStatusPage === 'main') {
      currentPage++;
      if (currentPage === data.info.pages) {
        next.disabled = true;
      }
      getDataForButtons(currentPage);
    } else if (currentStatusPage === 'favorites') {
      currentFavPage++;
      showFavorites(currentFavPage);
    }
  });
}
export { getDataForButtons, pagination };
