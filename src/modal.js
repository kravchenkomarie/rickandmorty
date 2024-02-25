const modalContainer = document.createElement('div');
const modalClose = document.createElement('button');
const modal = document.createElement('div');
const image = document.createElement('img');
const name = document.createElement('p');
const status = document.createElement('p');
const species = document.createElement('p');
const gender = document.createElement('p');
const origin = document.createElement('p');
const location = document.createElement('p');
const episode = document.createElement('p');
const type = document.createElement('p');

modalClose.innerHTML = 'x';
document.body.appendChild(modalContainer);
modalContainer.classList.add('modalContainer');

function showModal(el) {
  modalContainer.style.display = 'block';

  if ((modalContainer.style.display = 'block')) {
    document.body.style.overflow = 'hidden';
  }

  modalContainer.appendChild(modal);
  modal.appendChild(modalClose);
  modal.appendChild(name);
  modal.appendChild(image);
  modal.appendChild(status);
  modal.appendChild(species);
  modal.appendChild(type);
  modal.appendChild(gender);
  modal.appendChild(origin);
  modal.appendChild(location);
  modal.appendChild(episode);

  modal.classList.add('modal');
  image.classList.add('image');
  name.classList.add('name');
  episode.classList.add('episode');

  let episodesArray = el.episode.map((el) => {
    let episodeNumber = el.split('/').pop();
    return episodeNumber;
  });

  let episodesString = episodesArray.join(' ' + '•' + ' ');

  name.innerHTML = `${el.name}`;
  status.innerHTML = `Status: ${el.status}`;
  image.src = el.image;
  species.innerHTML = `Species: ${el.species}`;
  type.innerHTML = `Type: ${el.type ? el.type : 'No type'}`;
  gender.innerHTML = `Gender: ${el.gender}`;
  origin.innerHTML = `Origin: ${el.origin.name}`;
  location.innerHTML = `Location: ${el.location.name}`;
  episode.innerHTML = `Episodes: ${episodesString}`;

  modalClose.addEventListener('click', () => {
    modalContainer.style.display = 'none';
  });
  modalContainer.addEventListener('click', () => {
    modalContainer.style.display = 'none';
  });
  modal.addEventListener('click', (event) => {
    event.stopPropagation();
  });
}

export { showModal };
