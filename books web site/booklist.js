const bookShelf = document.getElementById('dynamicBookShelf');
// Function to display books dynamically
function displayBooks(books) {
    bookShelf.innerHTML = ''; // Clear the shelf before re-rendering

    // Loop through the books array and create book elements
    books.forEach(book => {
        console.log(book.title);
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.innerHTML = `
            <div class="book-image">
                <img src="${book.image || 'imgs/default-book.jpg'}" alt="${book.title}">
            </div>
            <div class="book-info">
                <p class="book-title">${book.title}</p>
                <p class="book-author">${book.author}</p>
                <p class="book-price">$25.99</p>
                <a href="Book Purchase.html" class="purchase">
                    <button class="Purchase">Buy Now</button>
                </a>
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
