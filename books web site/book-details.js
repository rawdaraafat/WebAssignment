document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const bookId = parseInt(params.get("id"));
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const book = books.find(b => b.book_id === bookId);
    const bookDetailsDiv = document.getElementById("bookDetails");
    const userRole = localStorage.getItem("userRole");

    if (!book) {
        bookDetailsDiv.innerHTML = "<p>Book not found. 😕</p>";
        return;
    }

    let editButtonHTML = "";
    if (userRole === "admin") {
        editButtonHTML = `
            <a href="update%20book%20detailed.html?id=${book.book_id}" 
               class="edit-button" 
               id="editButton">
               Edit Book Details
            </a>
        `;
    }

    bookDetailsDiv.innerHTML = `
    <div class="book-info"> 
                      <img src="${book.image}" alt="${book.title}">

        <div class="info">
            <h2>${book.title}</h2>
            <h3>Author: ${book.author}</h3>
            <h3>Genre: ${book.genre}</h3>
            <h3>Pages: ${book.pages}</h3>
            <p><strong>Description:</strong> ${book.description}</p>
            <h3>Price: $${book.price.toFixed(2)}</h3>
            <h3>State: ${book.state}</h3>
            ${editButtonHTML}
        </div>
    </div>
    `;
});
