let generatedCode = "";
function generateSixDigitNumber() {
    generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    alert("Your verification code is:   " + generatedCode);
}

document.addEventListener("DOMContentLoaded", () => {
    const resetBtn = document.querySelector("a[href='/login/'] > button");

    resetBtn.addEventListener("click", (e) => {
        e.preventDefault(); 

        
        const enteredCode = document.getElementById("random").value.trim();
        const newPassword = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("ppassword").value.trim();
        clearErrors();
        let hasError = false;
        
        if (enteredCode !== generatedCode) {
            showError("random", "Verification code doesn't match.");
            hasError = true;
        }
        
        if (newPassword === "") {
            showError("password", "New password cannot be empty.");
            hasError = true;
        }

        if (confirmPassword === "") {
            showError("ppassword", "Please confirm your new password.");
            hasError = true;
        }

        
        if (newPassword !== "" && confirmPassword !== "" && newPassword !== confirmPassword) {
            showError("ppassword", "Passwords do not match.");
            hasError = true;
        }

        
        if (!hasError) {
            alert("Password reset successful!");
            window.location.href = "/login/";
        }
    });
});

// show error message next to input field
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    input.style.borderColor = "red";

    let error = document.createElement("div");
    error.className = "error-message";
    error.style.color = "red";
    error.style.fontSize = "14px";
    error.textContent = message;
    
    if (input.nextElementSibling && input.nextElementSibling.className === "error-message") {
        input.nextElementSibling.remove();
    }
    
    input.parentNode.insertBefore(error, input.nextSibling);
}

// clear all error messages
function clearErrors() {
    document.querySelectorAll(".error-message").forEach(el => el.remove());
    document.querySelectorAll("input").forEach(el => el.style.borderColor = "");
}

document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('password');
    let isPasswordVisible = false;

    togglePassword.addEventListener('click', () => {
        isPasswordVisible = !isPasswordVisible;
        passwordField.type = isPasswordVisible ? 'text' : 'password';
        togglePassword.src = isPasswordVisible
            ? 'imgs/invisibleEye.png'
            : 'imgs/eye.png';
    });
});

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
