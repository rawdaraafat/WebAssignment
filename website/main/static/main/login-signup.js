document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container2');
    const signupb = document.querySelector('.signup-b');
    const loginb = document.querySelector('.login-b');
    const signupForm = document.getElementById('signupForm');

    // Toggle views
    if (signupb) {
        signupb.addEventListener('click', () => {
            if (container) {
                container.classList.add('active');
            }
        });
    }

    if (loginb) {
        loginb.addEventListener('click', () => {
            if (container) {
                container.classList.remove('active');
            }
        });
    }

    // Signup - Store user data in localStorage
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            const email = document.querySelector('#e-mail')?.value.trim().toLowerCase();
            const username = document.querySelector('#username')?.value.trim();
            const userType = document.querySelector('#userType-signup')?.value;

            localStorage.setItem('userEmail', email);
            localStorage.setItem('username', username);
            localStorage.setItem('userType', userType);
            localStorage.setItem('userRole', 'user');
            localStorage.setItem('signedUp', 'true');
            localStorage.setItem('signupTime', Date.now());
            localStorage.setItem('showCart', 'true');
            localStorage.setItem('showAdmin', 'false');
            localStorage.setItem('loggedIn', 'true');
            console.log('User signed up');
        });
    }
});