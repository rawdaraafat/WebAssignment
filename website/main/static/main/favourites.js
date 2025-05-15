function createBookCard(book) {
  return `
          <div class="book-inner">
              <div class="book-front">
                  <img src="${book.image}" alt="${book.title}">
              </div>
              <div class="book-back">
                  <p class="book-title">${book.title}</p>
                  <p class="book-author">${book.author}</p>
                  <button class="remove">Remove</button>
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
  let favoriteBooks = JSON.parse(localStorage.getItem('Favorites')) || [];

  favoriteBooks.forEach(book => {
      const bookDiv = document.createElement('div');
      bookDiv.className = 'book';

      bookDiv.innerHTML = createBookCard(book);
      bookDiv.getElementsByClassName("remove")[0].addEventListener("click", () => {
        let favs =  JSON.parse(localStorage.getItem("Favorites")) || [];
        favs = favs.filter(elm => elm.title !== book.title);
        localStorage.setItem("Favorites", JSON.stringify(favs));
        container.innerHTML = "";
        renderFavorites();
      });
      container.appendChild(bookDiv); 
  });
  console.log('Finished rendering favorites');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded');
  renderFavorites();
}); 