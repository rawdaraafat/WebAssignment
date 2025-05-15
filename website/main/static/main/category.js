function getGenreFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('genre');
}

function renderBooks(genre) {
  const shelf = document.getElementById("book-shelf");
  const title = document.getElementById("category-title");

  // Get all books
  const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

  // Filter books by genre (case-insensitive)
  const genreBooks = storedBooks.filter(book => {
    return book.genre && book.genre.toLowerCase() === genre.toLowerCase();
  });

  // Capitalize and set title
  title.textContent = `${genre.charAt(0).toUpperCase() + genre.slice(1)} Books`;

  // Display message if no books found
  if (genreBooks.length === 0) {
    shelf.innerHTML = "<p>No books found for this genre.</p>";
    return;
  }

  // Render books
  shelf.innerHTML = genreBooks.map(book => `
    <div class="book">
      <div class="book-inner">
        <div class="book-front">
          <img src="${book.image}" alt="${book.title}">
        </div>
        <div class="book-back">
          <p class="book-title">${book.title}</p>
          <p class="book-author">${book.author}</p>
          <p class="book-pages">${book.pages} pages</p>
          <p class="book-price">$${book.price.toFixed(2)}</p>
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
