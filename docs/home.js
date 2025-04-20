const shelf = document.getElementById("bookShelf");

function createBookCard(book) {
  return `
    <div class="book">
      <div class="book-inner">
        <div class="book-front">
          <img src="${book.image}" alt="${book.title}">
        </div>
        <div class="book-back">
          <p class="book-title">${book.title}</p>
          <p class="book-author">${book.author}</p>
        </div>
      </div>
    </div>
  `;
}

function loadAllBooks() {
  shelf.innerHTML = books.map(createBookCard).join("");
}

document.addEventListener("DOMContentLoaded", loadAllBooks);
