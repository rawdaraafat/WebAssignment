let generatedCode = "";
function generateSixDigitNumber() {
    generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    alert("Your verification code is:   " + generatedCode);
}

// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const resetBtn = document.querySelector("a[href='login-signup.html'] > button");

    resetBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent jumping to home.html immediately

        // Get input values
        const enteredCode = document.getElementById("random").value.trim();
        const newPassword = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("ppassword").value.trim();

        // Clear previous error highlights
        clearErrors();

        let hasError = false;

        // Check verification code
        if (enteredCode !== generatedCode) {
            showError("random", "Verification code doesn't match.");
            hasError = true;
        }

        // Check if passwords are empty
        if (newPassword === "") {
            showError("password", "New password cannot be empty.");
            hasError = true;
        }

        if (confirmPassword === "") {
            showError("ppassword", "Please confirm your new password.");
            hasError = true;
        }

        // Check if passwords match
        if (newPassword !== "" && confirmPassword !== "" && newPassword !== confirmPassword) {
            showError("ppassword", "Passwords do not match.");
            hasError = true;
        }

        // If all checks pass
        if (!hasError) {
            alert("Password reset successful!");
            // Proceed to home or wherever you want
            window.location.href = "home.html";
        }
    });
});

// Helper: show error message next to input field
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    input.style.borderColor = "red";

    let error = document.createElement("div");
    error.className = "error-message";
    error.style.color = "red";
    error.style.fontSize = "14px";
    error.textContent = message;

    // Remove any existing error message first
    if (input.nextElementSibling && input.nextElementSibling.className === "error-message") {
        input.nextElementSibling.remove();
    }

    // Insert error message after input field
    input.parentNode.insertBefore(error, input.nextSibling);
}

// Helper: clear all error messages
function clearErrors() {
    document.querySelectorAll(".error-message").forEach(el => el.remove());
    document.querySelectorAll("input").forEach(el => el.style.borderColor = "");
}



// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const resetBtn = document.querySelector("a[href='login-signup.html'] > button");

    resetBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent jumping to home.html immediately

        // Get input values
        const enteredCode = document.getElementById("random").value.trim();
        const newPassword = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("ppassword").value.trim();

        // Clear previous error highlights
        clearErrors();

        let hasError = false;

        // Check verification code
        if (enteredCode !== generatedCode) {
            showError("random", "Verification code doesn't match.");
            hasError = true;
        }

        // Check if passwords are empty
        if (newPassword === "") {
            showError("password", "New password cannot be empty.");
            hasError = true;
        }

        if (confirmPassword === "") {
            showError("ppassword", "Please confirm your new password.");
            hasError = true;
        }

        // Check if passwords match
        if (newPassword !== "" && confirmPassword !== "" && newPassword !== confirmPassword) {
            showError("ppassword", "Passwords do not match.");
            hasError = true;
        }

        // If all checks pass
        if (!hasError) {
            alert("Password reset successful!");
            // Proceed to home or wherever you want
            window.location.href = "home.html";
        }
    });
});

// Helper: show error message next to input field
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    input.style.borderColor = "red";

    let error = document.createElement("div");
    error.className = "error-message";
    error.style.color = "red";
    error.style.fontSize = "14px";
    error.textContent = message;

    // Remove any existing error message first
    if (input.nextElementSibling && input.nextElementSibling.className === "error-message") {
        input.nextElementSibling.remove();
    }

    // Insert error message after input field
    input.parentNode.insertBefore(error, input.nextSibling);
}

// Helper: clear all error messages
function clearErrors() {
    document.querySelectorAll(".error-message").forEach(el => el.remove());
    document.querySelectorAll("input").forEach(el => el.style.borderColor = "");
}


// Toggle card password visibility
document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('eyePassword');
    const passwordField = document.getElementById('ppassword');
    let isPasswordVisible = false;

    togglePassword.addEventListener('click', () => {
        isPasswordVisible = !isPasswordVisible;
        passwordField.type = isPasswordVisible ? 'text' : 'password';
        togglePassword.src = isPasswordVisible
            ? 'imgs/invisibleEye.png'
            : 'imgs/eye.png';
    });
});