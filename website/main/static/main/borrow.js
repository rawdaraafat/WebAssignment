 
function displayBooks(books) {
    const container = document.querySelector('.book-shelf');
    container.innerHTML = "";

    if (!Array.isArray(books)) {
        console.error("The 'books' parameter must be an array.");
        return;
    }

    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';

        // Decide links based on login
        const removeLink = isLoggedIn ? `/return_borrow/${book.book_id}/` : "/login/";
        bookDiv.innerHTML = `
            <div class="book-inner">
                <div class="book-front">
                    <img src="${book.image}" alt="${book.title}">
                </div>
                <div class="book-back">
                    <p class="book-title">${book.title}</p>
                    <p class="book-author">${book.author}</p>
                    <p class="due-date">Due Date: ${book.due_date}</p>
                    <a href="/book/${book.book_id}/">
                        <button class="details">Show Details</button>
                    </a>
                    <a href="${removeLink}">
                        <button class="remove">Return</button>
                    </a>
                    
                </div>
            </div>
        `;

        container.appendChild(bookDiv);
    });
}
  // Initialize the page
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    displayBooks(books);
  }); 