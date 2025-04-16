const shelf = document.getElementById("bookShelf");

function createBookCard(book) {
  return `
    <div class="book">
      <img src="${book.image}" alt="${book.title}">
      <p><strong>${book.title}</strong></p>
      <p>${book.author}</p>
    </div>
  `;
}

function loadAllBooks() {
  shelf.innerHTML = books.map(createBookCard).join("");
}

document.addEventListener("DOMContentLoaded", loadAllBooks);
