"""Users forms."""

# Django
from django import forms

# Local
from .models import User


class AddUserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')
