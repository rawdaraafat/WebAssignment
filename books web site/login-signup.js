document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container2');
    const signupb = document.querySelector('.signup-b');
    const loginb = document.querySelector('.login-b');
    const loginForm = document.querySelector('.form-box.login form');
    const signupForm = document.querySelector('.form-box.signup form');
    const logoutLink = document.querySelector('.logout-link');
    const loginLink = document.querySelector('.login-link');
    const profileIcon = document.querySelector('.profile');
    const cartIcon = document.querySelector('.cart-icon');

    // Session duration (30 seconds)
    const sessionDuration = 30000;

    // ✅ Panel switching
    signupb?.addEventListener('click', () => {
        container?.classList.add('active');
    });

    loginb?.addEventListener('click', () => {
        container?.classList.remove('active');
    });

    // ✅ Handle login submit
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const loginTime = new Date().getTime();
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('loginTime', loginTime);
        updateNavBar();
        window.location.href = 'bars.html';
    });

    // ✅ Handle signup submit
    signupForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const signupTime = new Date().getTime();
        localStorage.setItem('signedUp', 'true');
        localStorage.setItem('signupTime', signupTime);
        updateNavBar();
        window.location.href = 'user profile.html';
    });

    // ✅ Handle logout
    logoutLink?.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('loginTime');
        updateNavBar();
        window.location.href = 'login-signup.html';
    });

    function updateNavBar() {
        const loginTime = parseInt(localStorage.getItem('loginTime')) || 0;
        const signupTime = parseInt(localStorage.getItem('signupTime')) || 0;
        const currentTime = new Date().getTime();

        const isLoggedIn = localStorage.getItem('loggedIn') === 'true' && (currentTime - loginTime) < sessionDuration;
        const isSignedUp = localStorage.getItem('signedUp') === 'true' && (currentTime - signupTime) < sessionDuration;

        // Log for debugging
        console.log('isLoggedIn:', isLoggedIn, 'isSignedUp:', isSignedUp);

        // Check if elements are present and toggle visibility based on login status
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
        } else {
            console.error('Elements not found or undefined:', { loginLink, profileIcon, cartIcon });
        }
    }
});
