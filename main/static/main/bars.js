document.addEventListener('DOMContentLoaded', () => {
    // Check login status and show/hide elements
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    const userRole = localStorage.getItem('userRole');
    const showCart = localStorage.getItem('showCart') === 'true';
    const showAdmin = localStorage.getItem('showAdmin') === 'true';

    // Show/hide elements based on login status
    const cartIcon = document.querySelector('.cart-icon');
    const profileIcon = document.querySelector('.profile');
    const adminIcon = document.querySelector('.admin-icon');
    const loginLink = document.querySelector('.login-link');
    const logoutLink = document.querySelector('.logout-link');
    const favIcon = document.querySelector('#fav');
    const borrowIcon = document.querySelector('#borrow');
    const aboutIcon = document.querySelector('.about');

    if (loggedIn) {
        // Hide login link and show logout link
        if (loginLink) loginLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'block';

        // Show/hide cart based on user role
        if (cartIcon) cartIcon.style.display = showCart ? 'block' : 'none';

        // Show profile icon
        if (profileIcon) profileIcon.style.display = 'block';

        // Show/hide admin icon
        if (adminIcon) adminIcon.style.display = showAdmin ? 'block' : 'none';

        // Show other icons
        if (favIcon) favIcon.style.display = 'block';
        if (borrowIcon) borrowIcon.style.display = 'block';
        if (aboutIcon) aboutIcon.style.display = 'block';
    } else {
        // Show login link and hide logout link
        if (loginLink) loginLink.style.display = 'block';
        if (logoutLink) logoutLink.style.display = 'none';

        // Hide other icons
        if (cartIcon) cartIcon.style.display = 'none';
        if (profileIcon) profileIcon.style.display = 'none';
        if (adminIcon) adminIcon.style.display = 'none';
        if (favIcon) favIcon.style.display = 'none';
        if (borrowIcon) borrowIcon.style.display = 'none';
        if (aboutIcon) aboutIcon.style.display = 'none';
    }

    // Contact menu functionality
    const menuToggle = document.getElementById('menuToggle');
    const contactMenu = document.getElementById('ContactMenu');
    let isMenuOpen = false;

    if (menuToggle && contactMenu) {
        menuToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            contactMenu.style.display = isMenuOpen ? 'flex' : 'none';
            
            // Rotate the menu toggle button
            menuToggle.style.transform = isMenuOpen ? 'rotate(45deg)' : 'rotate(0)';
        });
    }

    // Dropdown menu functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            const content = dropdown.querySelector('.dropdown-content');
            if (content) {
                content.style.display = 'block';
            }
        });

        dropdown.addEventListener('mouseleave', () => {
            const content = dropdown.querySelector('.dropdown-content');
            if (content) {
                content.style.display = 'none';
            }
        });
    });

    // Add logout functionality to profile icon if logged in
    if (loggedIn && profileIcon) {
        profileIcon.addEventListener('click', handleLogout);
    }
});

// Handle logout function
function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('showCart');
    localStorage.removeItem('showAdmin');
    localStorage.removeItem('loginTime');
    window.location.href = '/login/';
} 