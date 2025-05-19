from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'main'

urlpatterns = [
    path('', views.home, name='home'),
    path('booklist/', views.booklist, name='booklist'),
    path('favourite/<int:book_id>/', views.add_favourite, name='add_favourite'),
    path('favourite/', views.favourite, name='favourite'),
    path('remove_favourite/<int:book_id>/', views.remove_favourite, name='remove_favourite'),
    path('cart/<int:book_id>/', views.add_to_cart, name='add_to_cart'),
    path('cart/', views.cart, name='cart'),
    path('remove_from_cart/<int:book_id>/', views.remove_from_cart, name='remove_from_cart'),
    path('borrow/<int:book_id>/', views.borrow_book, name='borrow_book'),
    path('return_borrow/<int:book_id>/', views.return_book, name='return_book'),
    path('borrow/', views.borrow, name='borrow'),
    path('about/', views.about, name='about'),
    path('login/', views.login, name='login'),
    path('resetPassword/', views.resetPassword, name='resetPassword'),
    path('signup/', views.signup, name='signup'),  # أضفت رابط signup لأنك عرفته في views
    path('profile/', views.profile, name='profile'),
    path('profile/update/', views.updateUserProfile, name='updateUserProfile'),
    path('admin/', views.admin, name='admin'),
    path('dashboard/', views.admin, name='admin_dashboard'),
    path('bars/', views.bars, name='bars'),
    path('book/<int:book_id>/', views.book_detail_view, name='book_details'),
    path('booklist/category/<str:genre>/', views.category_view, name='category'),
    path('book/<int:book_id>/edit/', views.edit_book, name='edit_book'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
