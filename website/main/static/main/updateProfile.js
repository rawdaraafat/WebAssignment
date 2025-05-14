// Store user data in localStorage
function saveUserData(userData) {
  localStorage.setItem('userProfile', JSON.stringify(userData));
}

// Load user data from localStorage
function loadUserData() {
  const savedData = localStorage.getItem('userProfile');
  return savedData ? JSON.parse(savedData) : null;
}

// Handle everything after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('updateProfileForm');
  const imagePreview = document.getElementById('preview');
  const imageUpload = document.getElementById('imageUpload'); // Ensure this ID exists in your HTML
  const toggleProfilePassword = document.getElementById('togglePassword');
  const profilePasswordField = document.getElementById('password');
  const toggleCardPassword = document.getElementById('eyePassword');
  const cardPasswordField = document.getElementById('cardpassword');

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

    if (existingData.profileImage) {
      imagePreview.src = existingData.profileImage;
    }
  }

  // Handle form submission
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
      profileImage: imagePreview.src
    };

    saveUserData(userData);
    window.location.href = '/profile/';
  });

  // Handle image upload
  if (imageUpload) {
    imageUpload.addEventListener('change', function (event) {
      // Get the selected file from the event
      const file = event.target.files[0];
      if (file) {
        // Create a FileReader to read the image as a Data URL (base64 format)
        const reader = new FileReader();

        reader.onload = function (e) {
          const imageData = e.target.result;

          // Set the source of the image preview to the new image data
          imagePreview.src = imageData;

          // Load current user data (from localStorage, if available)
          const currentData = loadUserData() || {};

          // Update the profileImage property of the user data with the new image data
          currentData.profileImage = imageData;

          saveUserData(currentData);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Toggle profile password visibility
  if (toggleProfilePassword && profilePasswordField) {
    let isVisible = false;
    toggleProfilePassword.addEventListener('click', () => {
      isVisible = !isVisible;
      profilePasswordField.type = isVisible ? 'text' : 'password';
      toggleProfilePassword.src = isVisible ? 'imgs/invisibleEye.png' : 'imgs/eye.png';
    });
  }

  // Toggle card password visibility
  if (toggleCardPassword && cardPasswordField) {
    let isVisible = false;
    toggleCardPassword.addEventListener('click', () => {
      isVisible = !isVisible;
      cardPasswordField.type = isVisible ? 'text' : 'password';
      toggleCardPassword.src = isVisible ? 'imgs/invisibleEye.png' : 'imgs/eye.png';
    });
  }
});
