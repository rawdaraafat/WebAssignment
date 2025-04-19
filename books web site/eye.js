document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('password');
    let isPasswordVisible = false;

    togglePassword.addEventListener('click', () => {
        isPasswordVisible = !isPasswordVisible;
        passwordField.type = isPasswordVisible ? 'text' : 'password';
        /*togglePassword.querySelector('img').src = isPasswordVisible
            ? 'https://img.icons8.com/ios-glyphs/30/000000/visible.png'
            : 'https://img.icons8.com/ios-glyphs/30/000000/invisible.png';*/
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('eyePassword');
    const passwordField = document.getElementById('cardpassword');
    let isPasswordVisible = false;

    togglePassword.addEventListener('click', () => {
        isPasswordVisible = !isPasswordVisible;
        passwordField.type = isPasswordVisible ? 'text' : 'password';
        /*togglePassword.querySelector('img').src = isPasswordVisible
            ? 'https://img.icons8.com/ios-glyphs/30/000000/visible.png'
            : 'https://img.icons8.com/ios-glyphs/30/000000/invisible.png';*/
    });
});
