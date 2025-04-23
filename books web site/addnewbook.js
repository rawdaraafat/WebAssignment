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
        const book_id = parseInt(document.getElementById('book_id').value);
        const title = document.getElementById('title').value.trim();
        const author = document.getElementById('author').value.trim();
        const price = parseFloat(document.getElementById('price').value);
        const image = document.getElementById('image').value.trim();
        const genre = document.getElementById('genre').value.trim();
        const description = document.getElementById('description').value.trim();
        const pages = parseInt(document.getElementById('pages').value);
        const state = document.getElementById('state').value.trim();

        console.log("Form submitted");
        // Validate form data
        if (
            !title ||
            !author ||
            isNaN(price) || price <= 0 ||
            !image ||
            !genre || genre === 'Select genre' ||
            !description ||
            isNaN(pages) || pages <= 0 ||
            isNaN(book_id) || book_id <= 0 ||
            !state || state === 'Select state'
        )   {
            alert("Please fill in all fields correctly.");
            return;
        }


        // Create a new book object
        const newBook = {book_id, title, author, price, image,  genre, description, pages, state };

        // Add the new book to the array
        books.push(newBook);

        // Save the updated books array to localStorage
        localStorage.setItem('books', JSON.stringify(books));

        // Display the updated list of books
        displayBooks();

        alert("Book added successfully!");

        // Clear the form
        addBookForm.reset();
    });

    // Initial display of books
    displayBooks();
});
