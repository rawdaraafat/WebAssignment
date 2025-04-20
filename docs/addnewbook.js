document.addEventListener('DOMContentLoaded', () => {
    // Get the user role from localStorage
    const userRole = localStorage.getItem('userRole');

    // Check if the user is an admin
    if (userRole !== 'admin') {
        alert("Access denied. You need to be an admin to access this page.");
        window.location.href = 'login.html'; // Redirect to login page
        return;
    }

    // Load books from localStorage or initialize an empty array
    let books = JSON.parse(localStorage.getItem('books')) || [];

    // Function to display books in the list
    function displayBooks() {
        const bookList = document.getElementById('bookList');
        bookList.innerHTML = ''; // Clear the list before re-rendering

        // Loop through the books array and create list items
        books.forEach((book, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${book.title}</strong> by ${book.author} - $${book.price.toFixed(2)}
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            bookList.appendChild(listItem);
        });

        // Add event listeners to delete buttons
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                books.splice(index, 1); // Remove the book from the array
                localStorage.setItem('books', JSON.stringify(books)); // Update localStorage
                displayBooks(); // Re-render the list
            });
        });
    }

    // Add event listener for the form submission
    const addBookForm = document.getElementById('addBookForm');
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const title = document.getElementById('title').value.trim();
        const author = document.getElementById('author').value.trim();
        const price = parseFloat(document.getElementById('price').value);
        const image = document.getElementById('image').value.trim();

        // Validate form data
        if (!title || !author || isNaN(price) || price <= 0 || !image) {
            alert("Please fill in all fields correctly.");
            return;
        }

        // Create a new book object
        const newBook = { title, author, price, image };

        // Add the new book to the array
        books.push(newBook);

        // Save the updated books array to localStorage
        localStorage.setItem('books', JSON.stringify(books));

        // Display the updated list of books
        displayBooks();

        // Clear the form
        addBookForm.reset();
    });

    // Initial display of books
    displayBooks();
});
