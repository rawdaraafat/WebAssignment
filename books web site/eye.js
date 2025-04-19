document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('password');
    let isPasswordVisible = false;

    togglePassword.addEventListener('click', () => {
        isPasswordVisible = !isPasswordVisible;
        passwordField.type = isPasswordVisible ? 'text' : 'password';
        togglePassword.src = isPasswordVisible
            ? 'imgs/invisibleEye.png' 
            : 'imgs/Eye.png'; 
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('eyePassword');
    const passwordField = document.getElementById('cardpassword');
    let isPasswordVisible = false;

    togglePassword.addEventListener('click', () => {
        isPasswordVisible = !isPasswordVisible;
        passwordField.type = isPasswordVisible ? 'text' : 'password';
        togglePassword.src = isPasswordVisible
            ? 'imgs/invisibleEye.png' 
            : 'imgs/Eye.png'; 
    });
});
