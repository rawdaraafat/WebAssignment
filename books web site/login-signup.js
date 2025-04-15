document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container2');
    const signupb = document.querySelector('.signup-b');
    const loginb = document.querySelector('.login-b');
    const loginForm = document.querySelector('.form-box.login');
    const signupForm = document.querySelector('.form-box.signup');

    signupb?.addEventListener('click', () => {
        container?.classList.add('active');
    });

    loginb?.addEventListener('click', () => {
        container?.classList.remove('active');
    });

    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('loginTime', Date.now());
        updateNavBar();
        console.log('Login successful, redirecting...');
        window.location.href = 'home.html';
    });

    signupForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('signedUp', 'true');
        localStorage.setItem('signupTime', Date.now());
        updateNavBar();
        console.log('Signup successful, redirecting...');
        window.location.href = 'user profile.html';
    });

    function updateNavBar() {
        const loginTime = parseInt(localStorage.getItem('loginTime')) || 0;
        const signupTime = parseInt(localStorage.getItem('signupTime')) || 0;
        const now = Date.now();
        const sessionDuration = 20000;  // Set to 24 hours for example

        const loginLink = document.querySelector('.login-link');
        const profileIcon = document.querySelector('.profile');
        const cartIcon = document.querySelector('.cart-icon');

        const isLoggedIn = localStorage.getItem('loggedIn') === 'true' && (now - loginTime < sessionDuration);
        const isSignedUp = localStorage.getItem('signedUp') === 'true' && (now - signupTime < sessionDuration);

        console.log('isLoggedIn:', isLoggedIn, 'isSignedUp:', isSignedUp);

        if (loginLink && profileIcon && cartIcon) {
            if (isLoggedIn || isSignedUp) {
                loginLink.style.display = 'none';
                profileIcon.style.display = 'inline-block';
                cartIcon.style.display = 'inline-block';
            } else {
                loginLink.style.display = 'inline-block';
                profileIcon.style.display = 'none';
                cartIcon.style.display = 'none';
            }
        }
    }
    updateNavBar();
});
