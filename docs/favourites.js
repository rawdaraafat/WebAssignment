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
                </div>
            </div>
        </div>
    `;
}

function renderFavorites() {
  console.log('Starting renderFavorites');
  const container = document.querySelector('.book-shelf');
  if (!container) {
    console.error('Book shelf container not found!');
    return;
  }

  // For demo purposes, let's show the first 2 books as favorites
  // In a real application, you would have a separate array of favorite book IDs
  const favoriteBooks = books.slice(0, 2);

  container.innerHTML = favoriteBooks.map(createBookCard).join('');
  console.log('Finished rendering favorites');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded');
  renderFavorites();
}); 