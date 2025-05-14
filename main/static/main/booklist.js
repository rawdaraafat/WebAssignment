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
        const purchaseLink = isLoggedIn ? "/book-purchase/" : "/login/";
        const borrowLink = isLoggedIn ? "/borrow/" : "/login/";
        const favLink = isLoggedIn ? "/favourite/" : "/login/";

        bookDiv.innerHTML = `
            <div class="book-inner">
                <div class="book-front">
                    <img src="${book.image}" alt="${book.title}">
                </div>
                <div class="book-back">
                    <a href="/book/${book.book_id}/">
                        <button class="details">Show Details</button>
                    </a>
                    <a href="${purchaseLink}" class="user">
                        <button class="Purchase">Buy</button>
                    </a>
                    <a href="${borrowLink}" class="user">
                        <button class="Borrow">Borrow</button>
                    </a>
                    <a href="${favLink}" class="user">
                        <button class="fav">Add to Favorites</button>
                    </a>
                </div>
            </div>
        `;

        // Only add event listeners if user is logged in
        if (isLoggedIn) {
            bookDiv.getElementsByClassName("Purchase")[0].addEventListener("click", (e) => {
                let cartBooks = JSON.parse(localStorage.getItem("Cart")) || [];
                if (!(cartBooks.some(elm => elm.title == book.title))) {
                    cartBooks.push(book);
                    localStorage.setItem("Cart", JSON.stringify(cartBooks));
                }
            });

            bookDiv.getElementsByClassName("Borrow")[0].addEventListener("click", (e) => {
                let borrowed = JSON.parse(localStorage.getItem("Borrowed")) || [];
                if (!(borrowed.some(elm => elm.title == book.title))) {
                    let dueDate = new Date();
                    dueDate.setDate(dueDate.getDate() + 7);
                    // Don't mutate the original book object
                    let borrowedBook = { ...book, dueDate: dueDate.toISOString() };
                    borrowed.push(borrowedBook);
                    localStorage.setItem("Borrowed", JSON.stringify(borrowed));
                }
            });

            bookDiv.getElementsByClassName("fav")[0].addEventListener("click", (e) => {
                let favs = JSON.parse(localStorage.getItem("Favorites")) || [];
                if (!(favs.some(elm => elm.title == book.title))) {
                    favs.push(book);
                    localStorage.setItem("Favorites", JSON.stringify(favs));
                }
            });
        }

        bookShelf.appendChild(bookDiv);
    });

    // Update user buttons visibility after DOM elements are created
    if (typeof updateUserButtons === 'function') {
        updateUserButtons();
    }
}

// Initial display of books (books is defined in the template)
displayBooks(books);

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );
    displayBooks(filteredBooks);
});
