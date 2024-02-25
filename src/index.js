require('./styles.css');
import { pagination } from './pagination.js';
import { getDataForButtons } from './pagination.js';

setTimeout(() => {
  pagination('main');
  getDataForButtons(1);
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
}, 1000);
