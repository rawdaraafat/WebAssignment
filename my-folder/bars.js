function includeHTMLWithScript(selector, htmlFile) {
    return fetch(htmlFile)
        .then(response => response.text())
        .then(data => {
            const container = document.querySelector(selector);
            if (container) {
                container.innerHTML = data;
                // Call updateNavBar and other logic after content is injected
                setTimeout(() => {
                    if (typeof updateNavBar === 'function') {
                        updateNavBar();
                    }
                    bindSidebarToggle();
                }, 100);
            }
        })
        .catch(error => console.error('Error loading navigation:', error));
}

function bindSidebarToggle() {
    const sidebarIcon = document.querySelector('.sidebar-icon');
    const sidebar = document.querySelector('.sidebar');

    if (sidebarIcon && sidebar) {
        sidebarIcon.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('active') &&
                !sidebar.contains(e.target) &&
                !sidebarIcon.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
    }
}

function updateNavBar() {
    const loginTime = parseInt(localStorage.getItem('loginTime')) || 0;
    const signupTime = parseInt(localStorage.getItem('signupTime')) || 0;
    const now = Date.now();
    const sessionDuration = 20000;

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

document.addEventListener('DOMContentLoaded', () => {
    includeHTMLWithScript('.bars', 'bars.html');
});
