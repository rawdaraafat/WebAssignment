// Function to include an external HTML file into a container and run additional logic
function includeHTMLWithScript(selector, htmlFile) {
    return fetch(htmlFile)
        // Convert the response to text
        .then(response => response.text())
        .then(data => {
            const container = document.querySelector(selector);
            if (container) {
                container.innerHTML = data;

                // Wait a bit for the DOM to update, then call additional functions
                setTimeout(() => {
                    if (typeof updateNavBar === 'function') {
                        updateNavBar();
                    }
                    footerMenu();
                }, 100);
            }
        })
        .catch(error => console.error('Error loading navigation:', error));
}

// Function to update visibility of nav bar elements based on login/session status
function updateNavBar() {
    const loginTime = parseInt(localStorage.getItem('loginTime')) || 0;
    const now = Date.now();
    // Session duration (1 minute, should be 24h = 86400000 for real use)
    const sessionDuration = 60000;

    // Select various nav elements
    const loginLink = document.querySelector('.login-link');
    const profileIcon = document.querySelector('.profile');
    const cartIcon = document.querySelector('.cart-icon');
    const adminPanelLink = document.querySelector('.admin-icon');
    const favIcon = document.querySelector('#fav');
    const aboutIcon = document.querySelector('.about');
    const borrowIcon = document.querySelector('#borrow');

    // Check if user is logged in and session is still valid
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true' && (now - loginTime < sessionDuration);
    const userRole = localStorage.getItem('userRole'); // Get role: 'admin' or 'user'

    if (!isLoggedIn) {
        // If not logged in: show only the login link, hide everything else
        loginLink?.style.setProperty('display', 'inline-block');
        profileIcon?.style.setProperty('display', 'none');
        cartIcon?.style.setProperty('display', 'none');
        favIcon?.style.setProperty('display', 'none');
        aboutIcon?.style.setProperty('display', 'none');
        borrowIcon?.style.setProperty('display', 'none');
        adminPanelLink?.style.setProperty('display', 'none');
    } else {
        // If logged in: show profile icon, hide login
        loginLink?.style.setProperty('display', 'none');
        profileIcon?.style.setProperty('display', 'inline-block');

        if (userRole === 'admin') {
            // If admin: show admin panel, hide user features
            adminPanelLink?.style.setProperty('display', 'inline-block');
            cartIcon?.style.setProperty('display', 'none');
            favIcon?.style.setProperty('display', 'none');
            aboutIcon?.style.setProperty('display', 'none');
            borrowIcon?.style.setProperty('display', 'none');
        } else {
            // If regular user: show user features, hide admin panel
            adminPanelLink?.style.setProperty('display', 'none');
            cartIcon?.style.setProperty('display', 'inline-block');
            favIcon?.style.setProperty('display', 'inline-block');
            aboutIcon?.style.setProperty('display', 'inline-block');
            borrowIcon?.style.setProperty('display', 'inline-block');
        }
    }
}

// Function to toggle the footer contact menu
function footerMenu() {
    const menu = document.getElementById("ContactMenu"); // Footer menu
    const button = document.getElementById("menuToggle"); // Toggle button

    // Toggle menu visibility on click
    button.onclick = () => {
        menu.classList.toggle("show");
    };
}

// When the page loads, include the external bars.html file into the .bars container
document.addEventListener('DOMContentLoaded', () => {
    includeHTMLWithScript('.bars', 'bars.html');
});
