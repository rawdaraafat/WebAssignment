<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Books Library - Book List</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="bars.css">
    <link rel="stylesheet" href="books.css">
</head>

<body>
    <div class="bars"></div>
    <script src="bars.js"></script>
    <div class="container">
        <h1>The Readers' Planet - Book List</h1>
        <div class="search-section">
            <input type="text" id="searchInput" placeholder="Search by Title or Author">
        </div>

        <!-- Dynamic Book Shelf -->
        <h3 class="section-title">All Books</h3>
        <div class="book-shelf" id="dynamicBookShelf"></div>
    </div>
    <div class="book-image">
        <img src="imgs/${book.image}" alt="${book.title}">
    </div>
    <script>
        // Load books from localStorage
        const books = JSON.parse(localStorage.getItem('books')) || [];

        // Function to display books dynamically
        function displayBooks() {
            const bookShelf = document.getElementById('dynamicBookShelf');
            bookShelf.innerHTML = ''; // Clear the shelf before re-rendering

            // Loop through the books array and create book elements
            books.forEach(book => {
                const bookDiv = document.createElement('div');
                bookDiv.className = 'book';
                bookDiv.innerHTML = `
                    <div class="book-image">
                        <img src="${book.image || 'imgs/default-book.jpg'}" alt="${book.title}">
                    </div>
                    <div class="book-info">
                        <p class="book-title">${book.title}</p>
                        <p class="book-author">${book.author}</p>
                        <p class="book-price">$${book.price.toFixed(2)}</p>
                        <a href="Book Purchase.html" class="purchase">
                            <button class="Purchase">Buy Now</button>
                        </a>
                    </div>
                `;
                bookShelf.appendChild(bookDiv);
            });
        }

        // Initial display of books
        displayBooks();

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredBooks = books.filter(book =>
                book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm)
            );

            // Display filtered books
            const bookShelf = document.getElementById('dynamicBookShelf');
            bookShelf.innerHTML = ''; // Clear the shelf before re-rendering

            filteredBooks.forEach(book => {
                const bookDiv = document.createElement('div');
                bookDiv.className = 'book';
                bookDiv.innerHTML = `
                    <div class="book-image">
                        <img src="${book.image || 'imgs/default-book.jpg'}" alt="${book.title}">
                    </div>
                    <div class="book-info">
                        <p class="book-title">${book.title}</p>
                        <p class="book-author">${book.author}</p>
                        <p class="book-price">$${book.price.toFixed(2)}</p>
                        <a href="Book Purchase.html" class="purchase">
                            <button class="Purchase">Buy Now</button>
                        </a>
                    </div>
                `;
                bookShelf.appendChild(bookDiv);
            });
        });
    </script>
</body>
</html>
