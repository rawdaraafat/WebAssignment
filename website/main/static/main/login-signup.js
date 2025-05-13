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
});