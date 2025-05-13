from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'main'

urlpatterns = [
    path('', views.home, name='home'),
    path('booklist/', views.booklist, name='booklist'),
    path('favourite/', views.favourite, name='favourite'),
    path('borrow/', views.borrow, name='borrow'),
    path('about/', views.about, name='about'),
    path('login/', views.login, name='login'),
    path('resetPassword/', views.resetPassword, name='resetPassword'),
    path('profile/', views.profile, name='profile'),
    path('cart/', views.cart, name='cart'),
    path('admin/', views.admin, name='admin'),
    path('bars/', views.bars, name='bars'),
    path('updateUserProfile/', views.updateUserProfile, name='updateUserProfile'),
    path('book/<int:book_id>/', views.book_details, name='book_details'),
    path('booklist/category/<str:genre>/', views.category_view, name='category'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

