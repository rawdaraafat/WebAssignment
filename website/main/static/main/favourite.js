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
        const removeLink = isLoggedIn ? `/remove_favourite/${book.book_id}/` : "/login/";
        bookDiv.innerHTML = `
            <div class="book-inner">
                <div class="book-front">
                    <img src="${book.image}" alt="${book.title}">
                </div>
                <div class="book-back">
                    <a href="/book/${book.book_id}/">
                        <button class="details">Show Details</button>
                    </a>
                    <a href="${removeLink}">
                        <button class="remove">Remove</button>
                    </a>
                    
                </div>
            </div>
        `;

        bookShelf.appendChild(bookDiv);
    });

    // Update user buttons visibility after DOM elements are created
    if (typeof updateUserButtons === 'function') {
        updateUserButtons();
    }
}

// Initial display of books (books is defined in the template)
displayBooks(books);