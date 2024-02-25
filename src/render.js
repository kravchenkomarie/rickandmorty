import { showModal } from './modal';

const cards = document.querySelector('#cards');

const emptyFavorites = document.createElement('div');
emptyFavorites.classList.add('emptyFavorites');
emptyFavorites.innerHTML = `Избранных персонажей пока нет :)`;

let favorites = {};

function render(data) {
  cards.innerHTML = '';

  data.results.forEach((el) => {
    const card = document.createElement('div');
    const image = document.createElement('img');
    const addToFavorites = document.createElement('button');
    const favoriteIcon = document.createElement('img');
    const name = document.createElement('p');
    const status = document.createElement('p');

    addToFavorites.classList.add('favoriteBtn');
    image.classList.add('image');
    card.classList.add('card');
    name.classList.add('name');

    favoriteIcon.classList.add('favoriteIcon');
    name.innerHTML = `${el.name}`;
    status.innerHTML = `${el.status}`;
    image.src = el.image;

    status.innerHTML === 'Alive'
      ? status.classList.add('status')
      : status.classList.add('noStatus');

    cards.appendChild(card);
    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(status);
    card.appendChild(addToFavorites);

    addToFavorites.appendChild(favoriteIcon);

    if (favorites[el.id]) {
      favoriteIcon.classList.add('favoriteChooseIcon');
    }

    card.addEventListener('click', () => {
      showModal(el);
    });

    addToFavorites.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    addToFavorites.addEventListener('click', () => {
      if (favorites[el.id]) {
        delete favorites[el.id];
        favoriteIcon.classList.remove('favoriteChooseIcon');
      } else {
        favorites[el.id] = el;
        favoriteIcon.classList.add('favoriteChooseIcon');
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));
    });
  });
}

export default render;
