from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib import messages
from .models import UserProfile, Book, BorrowedBook
from django.contrib.auth import login as auth_login, authenticate
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from .forms import BookForm
from datetime import timedelta
from django.utils import timezone

def home(request):
    return render(request, 'main/home.html')

def booklist(request):
    books = Book.objects.all().order_by('-created_at')
    return render(request, 'main/booklist.html', {'books': books})

def category_view(request, genre):
    books = Book.objects.filter(genre__iexact=genre)
    return render(request, 'main/category.html', {'books': books, 'genre': genre})

def book_detail_view(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    return render(request, 'main/book_detail.html', {'book': book})

def add_favourite(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    profile = UserProfile.objects.get(user=request.user)
    profile.favorite_books.add(book)
    return redirect('/favourite/')

def favourite(request):
    profile = UserProfile.objects.get(user=request.user)
    books = profile.favorite_books.all()
    return render(request, 'main/favourite.html', {'books': books})

def remove_favourite(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    profile = UserProfile.objects.get(user=request.user)
    profile.favorite_books.remove(book)
    return redirect('/favourite/')

def borrow_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    profile = UserProfile.objects.get(user=request.user)
    isborrowed = BorrowedBook.objects.filter(user=profile, book=book).exists()
    if not isborrowed and book.status == 'available':
        borrow_record = BorrowedBook.objects.create(user=profile, book=book)
        borrow_record.due_date = borrow_record.borrow_date + timedelta(days=7)
        borrow_record.save()
        book.quantity -= 1
        if book.quantity == 0:
            book.status = 'borrowed'
        book.save()
    return redirect('/borrow/')

def borrow(request):
    profile = UserProfile.objects.get(user=request.user)
    borrow_records = BorrowedBook.objects.filter(user=profile)
    for record in borrow_records:
        if record.due_date < timezone.now():
            book = record.book
            book.status = 'available'
            book.quantity += 1
            book.save()
            record.delete()
    borrow_records = BorrowedBook.objects.filter(user=profile)
    return render(request, 'main/borrow.html', {'borrow_records': borrow_records})

def return_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    profile = UserProfile.objects.get(user=request.user)
    isborrowed = BorrowedBook.objects.filter(user=profile, book=book).exists()
    if isborrowed:
        borrow_record = BorrowedBook.objects.get(user=profile, book=book)
        book.quantity += 1
        book.status = 'available'
        book.save()
        borrow_record.delete()
    return redirect('/borrow/')

def add_to_cart(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    profile = UserProfile.objects.get(user=request.user)
    profile.cart_books.add(book)
    return redirect('/cart/')

def cart(request):
    profile = UserProfile.objects.get(user=request.user)
    books = profile.cart_books.all()    
    return render(request, 'main/cart.html', {'books': books})

def remove_from_cart(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    profile = UserProfile.objects.get(user=request.user)
    profile.cart_books.remove(book)
    return redirect('/cart/')

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
                messages.success(request, 'Login successful!')
                return redirect('main:home')
            else:
                messages.error(request, 'Incorrect password. Use reset password if forgotten.')
                return render(request, 'main/login-signup.html')
        except User.DoesNotExist:
            messages.error(request, 'No account found with this email.')
            return render(request, 'main/login-signup.html')

    return render(request, 'main/login-signup.html')

def resetPassword(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        new_password = request.POST.get('new_password')
        confirm_password = request.POST.get('confirm_password')

        if new_password != confirm_password:
            messages.error(request, 'Passwords do not match!')
            return redirect('main:resetPassword')

        try:
            user = User.objects.get(email=email)
            user.set_password(new_password)
            user.save()
            messages.success(request, 'Password reset successful! Please log in.')
            return redirect('main:login')
        except User.DoesNotExist:
            messages.error(request, 'No account found with this email.')
            return redirect('main:resetPassword')

    return render(request, 'main/resetPassword.html')

def signup(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        username = request.POST.get('username')
        password = request.POST.get('password')
        user_type = request.POST.get('userType')
        newsletter = request.POST.get('newsletter') == 'on'

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists!')
            return redirect('main:login')
        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email already registered!')
            return redirect('main:login')

        try:
            # Create the user
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password
            )
            
            # Check if UserProfile already exists
            if not hasattr(user, 'userprofile'):
                UserProfile.objects.create(
                    user=user,
                    user_type=user_type,
                    newsletter_subscribed=newsletter
                )
            else:
                # Update existing profile
                user.userprofile.user_type = user_type
                user.userprofile.newsletter_subscribed = newsletter
                user.userprofile.save()
                
            auth_login(request, user)
            messages.success(request, 'Account created successfully!')
            return redirect('main:home')
        except Exception as e:
            messages.error(request, f'Error creating account: {str(e)}')
            return redirect('main:login')

    return render(request, 'main/login-signup.html')

def profile(request):
    if not request.user.is_authenticated:
        return redirect('main:login')

    user_profile = request.user.userprofile

    if request.method == 'POST':
        email = request.POST.get('email')
        username = request.POST.get('username')
        user_type = request.POST.get('userType')
        newsletter = request.POST.get('newsletter') == 'on'

       
        if User.objects.exclude(pk=request.user.pk).filter(username=username).exists():
            messages.error(request, 'Username already exists!')
            return redirect('main:profile')
        if User.objects.exclude(pk=request.user.pk).filter(email=email).exists():
            messages.error(request, 'Email already registered!')
            return redirect('main:profile')

        try:
            user = request.user
            user.username = username
            user.email = email
            user.save()

            user_profile.user_type = user_type
            user_profile.newsletter_subscribed = newsletter
            user_profile.save()

            messages.success(request, 'Profile updated successfully!')
            return redirect('main:profile')
        except Exception as e:
            messages.error(request, f'Error updating profile: {str(e)}')
            return redirect('main:profile')

    return render(request, 'main/userprofile.html', {'user_profile': user_profile})

def admin(request):
    if not request.user.is_authenticated or request.user.userprofile.user_type != 'admin':
        messages.error(request, 'You do not have permission to access this page.')
        return redirect('main:login')
    return render(request, 'main/admin_dashboard.html')

def bars(request):
    return render(request, 'main/bars.html')

def updateUserProfile(request):
    if request.method == 'POST':
        try:
            user_profile = request.user.userprofile

            user_profile.age = request.POST.get('age')
            user_profile.location = request.POST.get('location')
            user_profile.hobbies = request.POST.get('hobbies')
            user_profile.profile_password = request.POST.get('profile_password')
            user_profile.card_password = request.POST.get('card_password')
            user_profile.card_number = request.POST.get('card_number')

            if 'profile_image' in request.FILES:
                user_profile.profile_image = request.FILES['profile_image']

            user_profile.save()
            return JsonResponse({'success': True, 'message': 'Profile updated successfully!'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})
    else:
        return render(request, 'main/updateUserProfile.html')

def edit_book(request, book_id):
    if not request.user.is_authenticated or request.user.userprofile.user_type != 'admin':
        messages.error(request, 'You do not have permission to edit books.')
        return redirect('main:login')

    book = get_object_or_404(Book, id=book_id)

    if request.method == 'POST':
        form = BookForm(request.POST, request.FILES, instance=book)
        if form.is_valid():
            form.save()
            messages.success(request, 'Book updated successfully!')
            return redirect('main:book_details', book_id=book.id)
    else:
        form = BookForm(instance=book)

    return render(request, 'main/edit_book.html', {'form': form, 'book': book})
