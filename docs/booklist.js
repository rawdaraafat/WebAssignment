function displayBooks(books) {
    const bookShelf = document.getElementById('dynamicBookShelf');
    bookShelf.innerHTML = ''; // Clear the shelf

    // Check if books is defined and is an array
    if (!Array.isArray(books)) {
        console.error("The 'books' parameter must be an array.");
        return;
    }

    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.innerHTML = `
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
