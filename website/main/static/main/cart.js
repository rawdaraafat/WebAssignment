function createThumbnail(book) {
    return `
            <img src="${book.image}" alt="${book.title}" style="width:100px;height:120px">
            <div>
                <p>${book.title}</p>
                <span>Author: ${book.author}</span>
            </div>
            <p class="price">$${book.price.toFixed(2)}</p>
            <button class="remove">Remove</button>
      `;
  }

// render cart books
function renderCart() {
const container = document.getElementById("cartBooks");
container.innerHTML = "<h2>Shopping Cart</h2>";

// get cart books from local storage
let cartBooks = JSON.parse(localStorage.getItem('Cart')) || [];

cartBooks.forEach(book => {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'thumbnail container';

    bookDiv.innerHTML = createThumbnail(book);
    bookDiv.getElementsByClassName("remove")[0].addEventListener("click", () => {
        let cart =  JSON.parse(localStorage.getItem("Cart")) || [];
        cart = cart.filter(elm => elm.title !== book.title);
        localStorage.setItem("Cart", JSON.stringify(cart));
        container.innerHTML = "";
        calcTotal();
        renderCart();
    });
    container.appendChild(bookDiv); 
});
}

function calcTotal() {
    let items = document.getElementById("items");
    let tax = document.getElementById("tax");
    let total = document.getElementById("total");
    let cartBooks = JSON.parse(localStorage.getItem('Cart')) || [];
    let subtotal = 0;
    //calculate subtotal
    cartBooks.forEach(book => {
        subtotal += book.price;
    });
    items.innerText = `$${subtotal.toFixed(2)}`;
    tax.innerText = `$${(subtotal/10.00).toFixed(2)}`;
    total.innerText = `$${(subtotal*1.1).toFixed(2)}`;
}

  // Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    calcTotal();
    renderCart();
}); 