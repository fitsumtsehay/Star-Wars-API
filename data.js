const PEOPLE_API_URL = 'https://swapi.dev/api/people/';
const FILMS_API_URL = 'https://swapi.dev/api/films/';

const dataTable = document.querySelector('#data-table tbody');
const peopleLink = document.querySelector('#people-link');
const filmsLink = document.querySelector('#films-link');
// Get a reference to the film table and the button to display it
const filmTable = document.getElementById('film-table');
const showFilmTableBtn = document.getElementById('show-film-table');

function clearTable() {
  dataTable.innerHTML = '';
}

function createTableRow(values) {
  const row = document.createElement('tr');
  for (let i = 0; i < values.length; i++) {
    const cell = document.createElement('td');
    cell.innerText = values[i];
    row.appendChild(cell);
  }
  return row;
}

function displayPeopleTable(people) {
  clearTable();
  const headers = ["Name", "Birth_Year", "Eye_Color", "Gender", "Hair_Color", "Height","Mass", "Skin_Color"];
    const headerRow = createTableRow(headers);
    dataTable.appendChild(headerRow);

  const rows = people.map(person => {
    return createTableRow([
      person.name,
      person.birth_year,
      person.eye_color,
      person.gender,
      person.hair_color,
      person.height,
      person.mass,
      person.skin_color
    ]);
  });
  rows.forEach(row => dataTable.appendChild(row));
}

function displayFilmsTable(films) {
    clearTable();
    const headers = ["Title", "Director", "Producer", "Release Date"];
    const headerRow = createTableRow(headers);
    dataTable.appendChild(headerRow);
  
    const rows = films.map(film => {
      return createTableRow([
        film.title,
        film.director,
        film.producer,
        new Date(film.release_date).toLocaleDateString(),
      ]);
    });
  
    rows.forEach(row => dataTable.appendChild(row));
  }
  
  

function fetchPeople() {
  fetch(PEOPLE_API_URL)
    .then(response => response.json())
    .then(data => displayPeopleTable(data.results))
    .catch(error => console.error(error));
}

function fetchFilms() {
  fetch(FILMS_API_URL)
    .then(response => response.json())
    .then(data => displayFilmsTable(data.results))
    .catch(error => console.error(error));
}

peopleLink.addEventListener('click', () => {
  fetchPeople();
});

filmsLink.addEventListener('click', () => {
  fetchFilms();
});
showFilmTableBtn.addEventListener('click', () => {
  // Add the "active" class to the film table
  filmTable.classList.add('active');
});
