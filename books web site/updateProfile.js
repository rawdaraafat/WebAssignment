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
  document.querySelector('p:nth-of-type(4)').innerHTML = `<strong>profilePassword</strong> ${userData.profilePassword}`;
  document.querySelector('p:nth-of-type(5)').innerHTML = `<strong>cardPassword</strong> ${userData.cardPassword}`;
  document.querySelector('p:nth-of-type(6)').innerHTML = `<strong>cardNumber</strong> ${userData.cardNumber}`;
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
    form.elements.profilePassword.value = existingData.profilePassword || '';
    form.elements.cardPassword.value = existingData.cardPassword || '';
    form.elements.cardNumber.value = existingData.cardNumber || '';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const userData = {
      name: form.elements.name.value,
      age: form.elements.age.value,
      location: form.elements.location.value,
      hobbies: form.elements.hobbies.value,
      profilePassword : form.elements.profilePassword.value,
      cardPassword : form.elements.cardPassword.value,
      cardNumber : form.elements.cardNumber.value,
    };

    // Save the data
    saveUserData(userData);

    // Redirect to profile page
    window.location.href = 'user profile.html';
  });
});
