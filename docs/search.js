// Simple search functionality for book lists
function setupSearch(searchInputId, bookList, displayFunction) {
  const searchInput = document.getElementById(searchInputId);

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredBooks = bookList.filter(book =>
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm)
    );


    displayFunction(filteredBooks);
  });
}

// Example usage:
// setupSearch('searchInput', books, displayBooks); 