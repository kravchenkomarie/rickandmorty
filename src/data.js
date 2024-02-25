const response = await fetch(`https://rickandmortyapi.com/api/character`);
const data = await response.json();

export default data;
