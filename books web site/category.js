// books is now loaded from books-data.js

function getGenreFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("genre");
}

function renderBooks(genre) {
  const shelf = document.getElementById("book-shelf");
  const title = document.getElementById("category-title");

  const genreBooks = books.filter(book => book.genre === genre);

  title.textContent = `${genre.charAt(0).toUpperCase() + genre.slice(1)} Books`;

  if (genreBooks.length === 0) {
    shelf.innerHTML = "<p>No books found for this genre.</p>";
    return;
  }

  shelf.innerHTML = genreBooks.map(book => `
    <div class="book">
      <div class="book-inner">
        <div class="book-front">
          <img src="${book.image}" alt="${book.title}">
        </div>
        <div class="book-back">
          <p class="book-title">${book.title}</p>
          <p class="book-author">${book.author}</p>
        </div>
      </div>
    </div>
  `).join('');
}

document.addEventListener("DOMContentLoaded", () => {
  const genre = getGenreFromURL();
  if (genre) {
    renderBooks(genre);
  } else {
    document.getElementById("book-shelf").innerHTML = "<p>Please select a genre.</p>";
  }
});
