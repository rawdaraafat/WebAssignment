<<<<<<< HEAD
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
                    footerMenu();
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
    const now = Date.now();
    const sessionDuration = 20000; // 24 hours

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

function footerMenu() {
    const menu = document.getElementById("ContactMenu");
    const button = document.getElementById("menuToggle");
    console.log("button");
    button.onclick = () => {
        console.log("clicked");
        menu.classList.toggle("show");    
};

}

document.addEventListener('DOMContentLoaded', () => {
    includeHTMLWithScript('.bars', 'bars.html');
});


=======
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
    const now = Date.now();
    const sessionDuration = 20000; // 24 hours

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

document.addEventListener('DOMContentLoaded', () => {
    includeHTMLWithScript('.bars', 'bars.html');
});
>>>>>>> 11a2f5d050e27a235a44cf14e82b207d83632f41
