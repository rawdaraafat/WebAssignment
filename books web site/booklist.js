let books = JSON.parse(localStorage.getItem("books"))

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

        bookDiv.getElementsByClassName("Purchase")[0].addEventListener("click", () => {
            let cartBooks =  JSON.parse(localStorage.getItem("Cart")) || [];
            if (!(cartBooks.some(elm => elm.title == book.title))) {
                cartBooks.push(book);
                localStorage.setItem("Cart", JSON.stringify(cartBooks));
            }
        });

        bookDiv.getElementsByClassName("Borrow")[0].addEventListener("click", () => {
            let borrowed =  JSON.parse(localStorage.getItem("Borrowed")) || [];
            if (!(borrowed.some(elm => elm.title == book.title))) {
                let dueDate = new Date();
                dueDate.setDate(dueDate.getDate() + 7); //set due date to 1 week from the date borrowed
                book.dueDate = dueDate;
                borrowed.push(book);
                localStorage.setItem("Borrowed", JSON.stringify(borrowed));
            }
        });

        bookDiv.getElementsByClassName("fav")[0].addEventListener("click", () => {
            console.log(book.title, " added to favorites");
            let favs =  JSON.parse(localStorage.getItem("Favorites")) || [];
            if (!(favs.some(elm => elm.title == book.title))) {
                favs.push(book);
                localStorage.setItem("Favorites", JSON.stringify(favs));
            }
        });

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
