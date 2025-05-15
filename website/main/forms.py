from django import forms
from .models import UserProfile

class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['age', 'location', 'hobbies', 'profile_password', 
                 'card_password', 'card_number', 'profile_image']
        widgets = {
            'profile_password': forms.PasswordInput(),
            'card_password': forms.PasswordInput(),
        } 