document.addEventListener('DOMContentLoaded', () => {
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

    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    // Add logout functionality to profile icon if logged in
    if (loggedIn && profileIcon) {
        profileIcon.addEventListener('click', handleLogout);
    }
});