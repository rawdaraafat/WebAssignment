// Store user data in localStorage
function saveUserData(userData) {
  localStorage.setItem('userProfile', JSON.stringify(userData));
}

// Load user data from localStorage
function loadUserData() {
  const savedData = localStorage.getItem('userProfile');
  return savedData ? JSON.parse(savedData) : null;
}

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('updateProfileForm');
  const imagePreview = document.getElementById('preview');
  const imageUpload = document.getElementById('imageUpload');

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

    // Show saved image if it exists
    if (existingData.profileImage) {
      imagePreview.src = existingData.profileImage;
    }
  }

  // Handle form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const userData = {
      name: form.elements.name.value,
      age: form.elements.age.value,
      location: form.elements.location.value,
      hobbies: form.elements.hobbies.value,
      profilePassword: form.elements.profilePassword.value,
      cardPassword: form.elements.cardPassword.value,
      cardNumber: form.elements.cardNumber.value,
      profileImage: imagePreview.src // Save image from preview
    };

    saveUserData(userData);
    window.location.href = 'user profile.html';
  });

  // Handle image upload and preview
  imageUpload.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageData = e.target.result;
        imagePreview.src = imageData;

        const currentData = loadUserData() || {};
        currentData.profileImage = imageData;
        saveUserData(currentData);
      };
      reader.readAsDataURL(file);
    }
  });
});

// Toggle profile password visibility
document.addEventListener('DOMContentLoaded', () => {
  const togglePassword = document.getElementById('togglePassword');
  const passwordField = document.getElementById('password');
  let isPasswordVisible = false;

  togglePassword.addEventListener('click', () => {
    isPasswordVisible = !isPasswordVisible;
    passwordField.type = isPasswordVisible ? 'text' : 'password';
    togglePassword.src = isPasswordVisible
        ? 'imgs/invisibleEye.png'
        : 'imgs/eye.png';
  });
});

// Toggle card password visibility
document.addEventListener('DOMContentLoaded', () => {
  const togglePassword = document.getElementById('eyePassword');
  const passwordField = document.getElementById('cardpassword');
  let isPasswordVisible = false;

  togglePassword.addEventListener('click', () => {
    isPasswordVisible = !isPasswordVisible;
    passwordField.type = isPasswordVisible ? 'text' : 'password';
    togglePassword.src = isPasswordVisible
        ? 'imgs/invisibleEye.png'
        : 'imgs/eye.png';
  });
});
