document.addEventListener('DOMContentLoaded', () => {
    const adminCredentials = {
        email: "admin1@gmail.com",
        password: "admin123"
    };

    const container = document.querySelector('.container2');
    const signupb = document.querySelector('.signup-b');
    const loginb = document.querySelector('.login-b');
    const loginForm = document.querySelector('.form-box.login');
    const signupForm = document.querySelector('.form-box.signup');

    // Toggle views
    signupb?.addEventListener('click', () => container?.classList.add('active'));
    loginb?.addEventListener('click', () => container?.classList.remove('active'));

    // Login
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.querySelector('.form-box.login input[type="email"]').value.trim().toLowerCase();
        const password = document.querySelector('.form-box.login input[type="password"]').value;

        if (email === adminCredentials.email && password === adminCredentials.password) {
            localStorage.setItem('userRole', 'admin');
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('loginTime', Date.now());
            localStorage.setItem('showCart', 'false');
            localStorage.setItem('showAdmin', 'true');
            console.log('Logged in as admin');
            window.location.href = 'admin dashboard.html';
        } else {
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

    // Signup
    signupForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('userRole', 'user');
        localStorage.setItem('signedUp', 'true');
        localStorage.setItem('signupTime', Date.now());
        localStorage.setItem('showCart', 'true');
        localStorage.setItem('showAdmin', 'false');
        localStorage.setItem('loggedIn', 'true');
        console.log('User signed up');
        window.location.href = 'userprofile.html';

    });
});