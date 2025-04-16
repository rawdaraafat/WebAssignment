function createBookCard(book) {
  return `
        <div class="book">
            <div class="book-inner">
                <div class="book-front">
                    <img src="${book.image}" alt="${book.title}">
                </div>
                <div class="book-back">
                    <p class="book-title">${book.title}</p>
                    <p class="book-author">${book.author}</p>
                    <a href="Book Purchase.html" class="purchase">
                        <button class="Purchase">Buy</button>
                    </a>
                </div>
            </div>
        </div>
    `;
}

function groupBooksByGenre() {
  console.log('Books array:', books); // Debug log
  const genres = {};
  books.forEach(book => {
    if (!genres[book.genre]) {
      genres[book.genre] = [];
    }
    genres[book.genre].push(book);
  });
  console.log('Grouped genres:', genres); // Debug log
  return genres;
}

function renderBooks() {
  console.log('Starting renderBooks'); // Debug log
  const container = document.getElementById('books-container');
  if (!container) {
    console.error('Books container not found!'); // Debug log
    return;
  }

  const genres = groupBooksByGenre();

  let html = '';
  for (const [genre, genreBooks] of Object.entries(genres)) {
    html += `
            <div>
                <h3 class="section-title">${genre.charAt(0).toUpperCase() + genre.slice(1)}</h3>
                <div class="book-shelf">
                    ${genreBooks.map(createBookCard).join('')}
                </div>
            </div>
        `;
  }

  container.innerHTML = html;
  console.log('Finished rendering books'); // Debug log
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded'); // Debug log
  renderBooks();
}); 