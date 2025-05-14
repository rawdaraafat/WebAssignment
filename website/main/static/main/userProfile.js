// Update the profile page with user data
function updateProfilePage() {
    // The profile data will be loaded from the server via Django template
    const profileImage = document.querySelector('.profileOverview img');
    const profileName = document.querySelector('.profileOverview h3');
    const ageElement = document.querySelector('p:nth-of-type(1)');
    const locationElement = document.querySelector('p:nth-of-type(2)');
    const hobbiesElement = document.querySelector('p:nth-of-type(3)');
    const profilePasswordElement = document.querySelector('p:nth-of-type(4)');
    const cardPasswordElement = document.querySelector('p:nth-of-type(5)');
    const cardNumberElement = document.querySelector('p:nth-of-type(6)');

    // Add event listeners for password visibility toggles
    const toggleProfilePassword = document.getElementById('togglePassword');
    const toggleCardPassword = document.getElementById('eyePassword');
    
    if (toggleProfilePassword) {
        toggleProfilePassword.addEventListener('click', () => {
            const passwordField = document.getElementById('password');
            if (passwordField) {
                passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
                toggleProfilePassword.src = passwordField.type === 'password'
                    ? '/static/main/imgs/eye.png'
                    : '/static/main/imgs/invisibleEye.png';
            }
        });
    }

    if (toggleCardPassword) {
        toggleCardPassword.addEventListener('click', () => {
            const passwordField = document.getElementById('cardpassword');
            if (passwordField) {
                passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
                toggleCardPassword.src = passwordField.type === 'password'
                    ? '/static/main/imgs/eye.png'
                    : '/static/main/imgs/invisibleEye.png';
            }
        });
    }

    // When setting a default profile image, use the static path
    const defaultProfileImage = '/static/main/imgs/women.png';
    if (userProfile.profile_image) {
        profileImage.src = userProfile.profile_image;
    } else {
        profileImage.src = defaultProfileImage;
    }
}

// Update the profile when the page loads
document.addEventListener('DOMContentLoaded', updateProfilePage);
