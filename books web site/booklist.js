const bookShelf = document.getElementById('dynamicBookShelf');
// Function to display books dynamically
function displayBooks(books) {
    bookShelf.innerHTML = ''; // Clear the shelf before re-rendering

    // Loop through the books array and create book elements
    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.innerHTML = `
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
        bookShelf.appendChild(bookDiv);
    });
}

// Initial display of books
displayBooks(books);

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );

    
    // Display filtered books
    displayBooks(filteredBooks);
});
