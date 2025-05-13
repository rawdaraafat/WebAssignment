from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from .models import UserProfile
from django.contrib.auth import login as auth_login, authenticate
from django.contrib.auth.hashers import check_password

def home(request):
    return render(request, 'main/home.html')

def booklist(request):
    return render(request, 'main/booklist.html')

def favourite(request):
    return render(request, 'main/favourite.html')

def borrow(request):
    return render(request, 'main/borrow.html')

def about(request):
    return render(request, 'main/about.html')

def login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            user = User.objects.get(email=email)
            
            if check_password(password, user.password):
                auth_login(request, user)
                # Set user role in session
                request.session['user_role'] = user.userprofile.user_type
                messages.success(request, 'Login successful!')
                return redirect('main:home')
            else:
                messages.error(request, 'Incorrect password. If you forgot your password, use the Reset Password link below.')
                return render(request, 'main/login-signup.html')
        except User.DoesNotExist:
            messages.error(request, 'No account found with this email. Please sign up first.')
            return render(request, 'main/login-signup.html')

    return render(request, 'main/login-signup.html')

def resetPassword(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        new_password = request.POST.get('new_password')
        confirm_password = request.POST.get('confirm_password')

        try:
            # Find user by email
            user = User.objects.get(email=email)
            
            if new_password != confirm_password:
                messages.error(request, 'Passwords do not match!')
                return redirect('main:resetPassword')
            
            # Update the password for this specific user
            user.set_password(new_password)
            user.save()
            
            messages.success(request, 'Password has been reset successfully! Please login with your new password.')
            return redirect('main:login')
        except User.DoesNotExist:
            messages.error(request, 'No account found with this email.')
            return redirect('main:resetPassword')

    return render(request, 'main/resetPassword.html')

def profile(request):
    if request.method == 'POST':
        # Get form data
        email = request.POST.get('email')
        username = request.POST.get('username')
        password = request.POST.get('password')
        user_type = request.POST.get('userType')
        newsletter = request.POST.get('newsletter') == 'on'

        # Check if username or email already exists
        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists!')
            return redirect('main:login')
        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email already registered!')
            return redirect('main:login')

        try:
            # Create new user
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password
            )
            
            # Create user profile
            user_profile = UserProfile.objects.get(user=user)
            user_profile.user_type = user_type
            user_profile.newsletter_subscribed = newsletter
            user_profile.save()

            # Log the user in using the renamed auth_login function
            auth_login(request, user)
            
            messages.success(request, 'Account created successfully!')
            return redirect('main:home')
        except Exception as e:
            messages.error(request, f'Error creating account: {str(e)}')
            return redirect('main:login')

    return render(request, 'main/user profile.html')

def cart(request):
    return render(request, 'main/cart.html')

def admin(request):
    return render(request, 'main/admin.html')

def bars(request):
    return render(request, 'main/bars.html')

def updateUserProfile(request):
    return render(request, 'main/updateUserProfile.html')
