function displayBooks(books) {
    const container = document.getElementById("cartBooks");
    container.innerHTML = "<h2>Shopping Cart</h2>";

    if (!Array.isArray(books)) {
        console.error("The 'books' parameter must be an array.");
        return;
    }

    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'thumbnail container';

        // Decide links based on login
        const removeLink = isLoggedIn ? `/remove_from_cart/${book.book_id}/` : "/login/";
        bookDiv.innerHTML = `

                <a href="/book/${book.book_id}/">
                    <img src="${book.image}" alt="${book.title}" style="width:100px;height:120px">
                </a>
                <div>
                    <p>${book.title}</p>
                    <span>Author: ${book.author}</span>
                </div>
                <p class="price">$${parseFloat(book.price).toFixed(2)}</p>
                <a href="${removeLink}">
                    <button class="remove">Remove</button>
                </a>`;
        container.appendChild(bookDiv);
    });
}

function calcTotal() {
    let items = document.getElementById("items");
    let tax = document.getElementById("tax");
    let total = document.getElementById("total");
    let subtotal = 0;
    //calculate subtotal
    cartBooks.forEach(book => {
        subtotal += parseFloat(book.price);
    });
    items.innerText = `$${subtotal.toFixed(2)}`;
    tax.innerText = `$${(subtotal/10.00).toFixed(2)}`;
    total.innerText = `$${(subtotal*1.1).toFixed(2)}`;
}

  // Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    calcTotal();
    displayBooks(cartBooks);
}); 