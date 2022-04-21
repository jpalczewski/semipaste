# Django
from django import forms

# Local
from .models import User


class AddUserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = '__all__'
