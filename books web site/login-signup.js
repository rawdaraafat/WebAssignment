document.addEventListener('DOMContentLoaded', () => {
    // Admin credentials
    const adminCredentials = {
        email: "admin1@gmail.com",
        password: "admin123"
    };

    // Selectors
    const container = document.querySelector('.container2');
    const signupb = document.querySelector('.signup-b');
    const loginb = document.querySelector('.login-b');
    const loginForm = document.querySelector('.form-box.login');
    const signupForm = document.querySelector('.form-box.signup');

    // Toggle between login and signup forms
    signupb?.addEventListener('click', () => {
        container?.classList.add('active');
    });

    loginb?.addEventListener('click', () => {
        container?.classList.remove('active');
    });

    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
    
        // Get user input
        const email = document.querySelector('.form-box.login input[type="email"]').value.trim().toLowerCase();
        const password = document.querySelector('.form-box.login input[type="password"]').value;
    
        // Check if the credentials match the admin credentials
        if (email === adminCredentials.email && password === adminCredentials.password) {
            // Successful login as admin
            localStorage.setItem('userRole', 'admin'); // Store user role as admin
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('loginTime', Date.now());
            console.log('Admin login successful, redirecting to dashboard...');
            window.location.href = 'admin dashboard.html'; // Redirect to admin dashboard
        } else {
            // Login as a regular user
            localStorage.setItem('userRole', 'user'); // Store user role as user
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('loginTime', Date.now());
            console.log('User login successful, redirecting to home...');
            window.location.href = 'home.html'; // Redirect to user home page
        }
    
        // Update the navigation bar
        updateNavBar();
    });

    // Handle signup form submission
    signupForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        // Store user role as 'user' for new accounts
        localStorage.setItem('userRole', 'user');
        localStorage.setItem('signedUp', 'true');
        localStorage.setItem('signupTime', Date.now());
        console.log('Signup successful, redirecting...');
        window.location.href = 'user profile.html'; // Redirect to user profile page

        // Update the navigation bar
        updateNavBar();
    });

    // Function to update the navigation bar based on user role and login status
    function updateNavBar() {
        const loginTime = parseInt(localStorage.getItem('loginTime')) || 0;
        const signupTime = parseInt(localStorage.getItem('signupTime')) || 0;
        const now = Date.now();
        const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours

        const loginLink = document.querySelector('.login-link');
        const profileIcon = document.querySelector('.profile');
        const cartIcon = document.querySelector('.cart-icon');
        const adminPanelLink = document.querySelector('.admin-panel-link'); // Add this element in your HTML

        const isLoggedIn = localStorage.getItem('loggedIn') === 'true' && (now - loginTime < sessionDuration);
        const isSignedUp = localStorage.getItem('signedUp') === 'true' && (now - signupTime < sessionDuration);
        const userRole = localStorage.getItem('userRole');

        console.log('isLoggedIn:', isLoggedIn, 'isSignedUp:', isSignedUp, 'userRole:', userRole);

        if (loginLink && profileIcon && cartIcon && adminPanelLink) {
            if (isLoggedIn || isSignedUp) {
                // Hide login link and show profile/cart icons
                loginLink.style.display = 'none';
                profileIcon.style.display = 'inline-block';
                cartIcon.style.display = 'inline-block';

                // Show admin panel link only for admins
                if (userRole === 'admin') {
                    adminPanelLink.style.display = 'inline-block';
                } else {
                    adminPanelLink.style.display = 'none';
                }
            } else {
                // Show login link and hide profile/cart/icons
                loginLink.style.display = 'inline-block';
                profileIcon.style.display = 'none';
                cartIcon.style.display = 'none';
                adminPanelLink.style.display = 'none';
            }
        }
    }

    // Initial call to update the navigation bar
    updateNavBar();

    // Logout functionality
    const logoutButton = document.getElementById('logoutButton');
    logoutButton?.addEventListener('click', () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('loginTime');
        localStorage.removeItem('signedUp');
        localStorage.removeItem('signupTime');
        window.location.href = 'login.html'; // Redirect to login page
    });
});
