from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from datetime import timedelta

# Create your models here.

class Book(models.Model):
    GENRE_CHOICES = [
        ('non-fiction', 'Non-Fiction'),
        ('mystery', 'Mystery'),
        ('sci-fi', 'Science Fiction'),
        ('fantasy', 'Fantasy'),
        ('romance', 'Romance'),
        ('history', 'History'),
    ]

    STATUS_CHOICES = [
        ('available', 'Available'),
        ('borrowed', 'Borrowed'),
        ('reserved', 'Reserved'),
    ]

    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    isbn = models.CharField(max_length=13, unique=True)
    genre = models.CharField(max_length=20, choices=GENRE_CHOICES)
    description = models.TextField()
    publication_date = models.DateField()
    publisher = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    cover_image = models.ImageField(upload_to='book_covers/', null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=9.99)

    def __str__(self):
        return f"{self.title} by {self.author}"

class UserProfile(models.Model):
    USER_TYPE_CHOICES = [
        ('customer', 'Customer'),
        ('admin', 'Admin'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)
    newsletter_subscribed = models.BooleanField(default=False)
    profile_image = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    hobbies = models.CharField(max_length=255, null=True, blank=True)
    profile_password = models.CharField(max_length=100, null=True, blank=True)
    card_password = models.CharField(max_length=100, null=True, blank=True)
    card_number = models.CharField(max_length=20, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    favorite_books = models.ManyToManyField(Book, related_name="favored_by")
    cart_books = models.ManyToManyField(Book, related_name="added_to_cart")
    borrowed_books = models.ManyToManyField(Book, through='BorrowedBook', related_name="borrowed_by")

    def __str__(self):
        return f"{self.user.username}'s profile"
    
# Keep track of borrowed books
class BorrowedBook(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="borrowed")
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    borrow_date = models.DateTimeField(default=timezone.now)
    due_date = models.DateTimeField(null=True)


# Signal to create/update UserProfile when User is created/updated
@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    else:
        instance.userprofile.save()
