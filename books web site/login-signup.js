<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title>Books Library - Reset password</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="login-signup.css">
</head>
<body>

    <div class="container2">
        <div class="form-box login">
            <form action="">
                <h3>Reset Password</h3>

                <label for="password1">Old Password</label>
                <input type="password" id="password1" name="old_password" required placeholder="Enter old password">

                <label for="password2">New Password</label>
                <input type="password" id="password2" name="new_password" required placeholder="Enter new password">

                <label for="password3">Confirm New Password</label>
                <input type="password" id="password3" name="confirm_password" required placeholder="confirm new password">

                <button type="submit">Reset Password</button>
            </form>
        </div>
        <div class="switch-box">
        <div class="switch-panel switch-left">
            <h1 style="color: white">Hello, Welcome back!</h1>
            <p style="color: white; font-weight: bold;">Don't have an account?</p>
            <button class="button signup-b" type="submit">Sign up</button>
        </div>
        <div class="switch-panel switch-right">
            <h1 style="color: white">Hello, Welcome!</h1>
            <p style="color: white; font-weight: bold;">Already have an account?</p>
            <button class="button login-b" type="submit">Login</button>
        </div>
    </div>
    </div>
    <script src="login-signup.js"></script>
</body>
</html>
