function createBookCard(book) {
    let options = { //options for formatting dates
        dateStyle: 'short',
        timeStyle: 'short'
    }

    return `
            <div class="book-inner">
                <div class="book-front">
                    <img src="${book.image}" alt="${book.title}">
                </div>
                <div class="book-back">
                    <p class="book-title">${book.title}</p>
                    <p class="book-author">${book.author}</p>
                    <p class="due-date">Due Date: ${book.dueDate.toLocaleString('en-US', options)}</p>
                </div>
            </div>
      `;
  }
  
  function renderBorrowed() {
    const container = document.querySelector('.book-shelf');
    container.innerHTML = "";
  
    // get borrowed books from local storage
    let borrowedBooks = JSON.parse(localStorage.getItem('Borrowed')) || [];
  
    // render books
    borrowedBooks.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
  
        bookDiv.innerHTML = createBookCard(book);

        let now = new Date();
        if (now > book.dueDate) {
            borrowedBooks = borrowedBooks.filter(elm => elm.title !== book.title);
        }
        container.appendChild(bookDiv); 
    });
  }
  
  // Initialize the page
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    renderBorrowed();
  }); 