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
            localStorage.setItem('showCart', 'false');
            localStorage.setItem('showAdmin', 'true');
            window.location.href = 'admin dashboard.html'; // Redirect to admin dashboard
        } else {
            // Login as a regular user
            localStorage.setItem('userRole', 'user'); // Store user role as user
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('loginTime', Date.now());
            localStorage.setItem('showCart','true' );
            localStorage.setItem('showAdmin', 'false');
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
        localStorage.setItem('showCart','true' );
        localStorage.setItem('showAdmin', 'false');
        window.location.href = 'user profile.html'; // Redirect to user profile page

        // Update the navigation bar
        updateNavBar();
    });

    // Function to update the navigation bar based on user role and login status
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
                localStorage.setItem('userRole', 'admin');
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('loginTime', Date.now());
                localStorage.setItem('showCart', 'false');
                localStorage.setItem('showAdmin', 'true');

                console.log('Logged in as admin');
                window.location.href = 'admin dashboard.html';
            } else {
                // Login as a regular user
                localStorage.setItem('userRole', 'user');
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('loginTime', Date.now());
                localStorage.setItem('showCart', 'true');
                localStorage.setItem('showAdmin', 'false');

                console.log('Logged in as user');
                window.location.href = 'home.html';
            }

            updateNavBar();
        });

        // Handle signup form submission
        signupForm?.addEventListener('submit', (e) => {
            e.preventDefault();

            localStorage.setItem('userRole', 'user');
            localStorage.setItem('signedUp', 'true');
            localStorage.setItem('signupTime', Date.now());
            localStorage.setItem('showCart', 'true');
            localStorage.setItem('showAdmin', 'false');

            console.log('User signed up');
            window.location.href = 'user profile.html';

            updateNavBar();
        });

// navbar.js
        function updateNavBar() {
            const loginTime = parseInt(localStorage.getItem('loginTime')) || 0;
            const now = Date.now();
            const sessionDuration = 20000;

            const loginLink = document.querySelector('.login-link');
            const profileIcon = document.querySelector('.profile');
            const cartIcon = document.querySelector('.cart-icon');
            const adminPanelLink = document.querySelector('.admin-icon');
            const favIcon = document.querySelector('#fav');
            const aboutIcon = document.querySelector('.about');
            const borrowIcon = document.querySelector('#borrow');

            const isLoggedIn = localStorage.getItem('loggedIn') === 'true' && (now - loginTime < sessionDuration);
            const userRole = localStorage.getItem('userRole'); // 'admin' or 'user'

            if (!isLoggedIn) {
                // Not logged in: show only login
                loginLink?.style.setProperty('display', 'inline-block');
                profileIcon?.style.setProperty('display', 'none');
                cartIcon?.style.setProperty('display', 'none');
                favIcon?.style.setProperty('display', 'none');
                aboutIcon?.style.setProperty('display', 'none');
                borrowIcon?.style.setProperty('display', 'none');
                adminPanelLink?.style.setProperty('display', 'none');
            } else {
                // Logged in
                loginLink?.style.setProperty('display', 'none');
                profileIcon?.style.setProperty('display', 'inline-block');

                if (userRole === 'admin') {
                    // Show admin icon only
                    adminPanelLink?.style.setProperty('display', 'inline-block');
                    cartIcon?.style.setProperty('display', 'none');
                    favIcon?.style.setProperty('display', 'none');
                    aboutIcon?.style.setProperty('display', 'none');
                    borrowIcon?.style.setProperty('display', 'none');
                } else {
                    // Regular user: show all user features
                    adminPanelLink?.style.setProperty('display', 'none');
                    cartIcon?.style.setProperty('display', 'inline-block');
                    favIcon?.style.setProperty('display', 'inline-block');
                    aboutIcon?.style.setProperty('display', 'inline-block');
                    borrowIcon?.style.setProperty('display', 'inline-block');
                }
            }
        }
    });
});