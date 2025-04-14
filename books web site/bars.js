function includeHTMLWithScript(selector, htmlFile, scriptFile) {
    fetch(htmlFile)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${htmlFile}`);
            return response.text();
        })
        .then(data => {
            const container = document.querySelector(selector);
            if (container) {
                // Insert HTML content into the container
                container.innerHTML = data;

                // Dynamically load and execute the script after inserting HTML
                const script = document.createElement("script");
                script.src = scriptFile;
                script.defer = true;
                document.body.appendChild(script);

                // Listen for script load event to confirm it's executed
                script.onload = () => {
                    console.log(`${scriptFile} loaded successfully.`);
                    // After script loads, re-bind the sidebar toggle event listener
                    bindSidebarToggle();
                };

            } else {
                console.error(`Selector "${selector}" not found in the DOM.`);
            }
        })
        .catch(error => {
            console.error("Error including HTML + script:", error);
        });
}

// Rebind sidebar toggle event after the HTML is loaded
function bindSidebarToggle() {
    const sidebarIcon = document.querySelector('.sidebar-icon');
    const sidebar = document.querySelector('.sidebar');

    if (sidebarIcon && sidebar) {
        sidebarIcon.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
}

// Ensure that the script is executed once the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    includeHTMLWithScript(".bars", "bars.html", "login-signup.js");
});
