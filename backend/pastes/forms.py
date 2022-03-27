"""Pastes forms."""

# Django
from django import forms

# Local
from .models import PasteBin


class AddPasteBinForm(forms.ModelForm):
    class Meta:
        model = PasteBin
        fields = ('title', 'text', 'exposure', 'expire_after')
