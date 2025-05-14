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
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Create FormData object to handle file upload
      const formData = new FormData(form);
      
      // Send the form data to the server
      fetch('/profile/update/', {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': getCookie('csrftoken')
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert(data.message);
          window.location.href = '/profile/';
        } else {
          alert('Error: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error updating profile. Please try again.');
      });
    });
  }

  // Handle image upload
  if (imageUpload) {
    imageUpload.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          imagePreview.src = e.target.result;
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
      //toggleProfilePassword.src = isVisible ? '../imgs/invisibleEye.png' : '../imgs/eye.png';
      toggleProfilePassword.src = isVisible ? '/static/main/imgs/invisibleEye.png' : '/static/main/imgs/eye.png';

    });
  }

  // Toggle card password visibility
  if (toggleCardPassword && cardPasswordField) {
    let isVisible = false;
    toggleCardPassword.addEventListener('click', () => {
      isVisible = !isVisible;
      cardPasswordField.type = isVisible ? 'text' : 'password';
     // toggleCardPassword.src = isVisible ? '../imgs/invisibleEye.png' : '../imgs/eye.png';
     toggleCardPassword.src = isVisible ? '/static/main/imgs/invisibleEye.png' : '/static/main/imgs/eye.png';

    });
  }
});

// Helper function to get CSRF token
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
