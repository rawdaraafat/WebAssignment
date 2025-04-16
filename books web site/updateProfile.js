// Store user data in localStorage
function saveUserData(userData) {
  localStorage.setItem('userProfile', JSON.stringify(userData));
}

// Load user data from localStorage
function loadUserData() {
  const savedData = localStorage.getItem('userProfile');
  return savedData ? JSON.parse(savedData) : null;
}

// Update the profile page with new data
function updateProfilePage(userData) {
  if (!userData) return;

  // Update basic info
  document.querySelector('.profileOverview h3').textContent = userData.name;
  document.querySelector('p:nth-of-type(1)').innerHTML = `<strong>Age:</strong> ${userData.age}`;
  document.querySelector('p:nth-of-type(2)').innerHTML = `<strong>Location:</strong> ${userData.location}`;
  document.querySelector('p:nth-of-type(3)').innerHTML = `<strong>Hobbies:</strong> ${userData.hobbies}`;
  document.querySelector('p:nth-of-type(4)').innerHTML = `<strong>Favourite book ever:</strong> ${userData.favoriteBook}`;

  // Update lists
  const borrowedList = document.querySelector('ul:nth-of-type(1)');
  const favoriteList = document.querySelector('ul:nth-of-type(2)');
  const dislikedList = document.querySelector('ul:nth-of-type(3)');

  borrowedList.innerHTML = userData.borrowedBooks.map(book => `<li>${book}</li>`).join('');
  favoriteList.innerHTML = userData.favoriteBooks.map(book => `<li>${book}</li>`).join('');
  dislikedList.innerHTML = userData.dislikedBooks.map(book => `<li>${book}</li>`).join('');
}

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('updateProfileForm');

  // Load existing data into form
  const existingData = loadUserData();
  if (existingData) {
    form.elements.name.value = existingData.name || '';
    form.elements.age.value = existingData.age || '';
    form.elements.location.value = existingData.location || '';
    form.elements.hobbies.value = existingData.hobbies || '';
    form.elements.favoriteBook.value = existingData.favoriteBook || '';
    form.elements.borrowedBooks.value = existingData.borrowedBooks ? existingData.borrowedBooks.join('\n') : '';
    form.elements.favoriteBooks.value = existingData.favoriteBooks ? existingData.favoriteBooks.join('\n') : '';
    form.elements.dislikedBooks.value = existingData.dislikedBooks ? existingData.dislikedBooks.join('\n') : '';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const userData = {
      name: form.elements.name.value,
      age: form.elements.age.value,
      location: form.elements.location.value,
      hobbies: form.elements.hobbies.value,
      favoriteBook: form.elements.favoriteBook.value,
      borrowedBooks: form.elements.borrowedBooks.value.split('\n').filter(book => book.trim()),
      favoriteBooks: form.elements.favoriteBooks.value.split('\n').filter(book => book.trim()),
      dislikedBooks: form.elements.dislikedBooks.value.split('\n').filter(book => book.trim())
    };

    // Save the data
    saveUserData(userData);

    // Redirect to profile page
    window.location.href = 'user profile.html';
  });
}); 