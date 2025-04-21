function displayBooks(books) {
    const bookShelf = document.getElementById('dynamicBookShelf');
    bookShelf.innerHTML = '';

    if (!Array.isArray(books)) {
        console.error("The 'books' parameter must be an array.");
        return;
    }

    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';

        // Decide links based on login
        const purchaseLink = isLoggedIn ? "book%20purchase.html" : "login-signup.html";
        const borrowLink = isLoggedIn ? "borrowed.html" : "login-signup.html";
        const favLink = isLoggedIn ? "favouritePageDemo.html" : "login-signup.html";

        bookDiv.innerHTML = `
            <div class="book-inner">
                <div class="book-front">
                    <img src="${book.image}" alt="${book.title}">
                </div>
                <div class="book-back">
                    <a href="book%20detailed%20demo.html">
                        <button class="details">Show Details</button>
                    </a>
                    <a href="${purchaseLink}">
                        <button class="Purchase">Buy</button>
                    </a>
                    <a href="${borrowLink}">
                        <button class="Borrow">Borrow</button>
                    </a>
                    <a href="${favLink}">
                        <button class="fav">Add to Favorites</button>
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
