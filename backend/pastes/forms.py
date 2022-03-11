from django import forms
from .models import PasteBin


class AddPasteBinForm(forms.ModelForm):
    class Meta:
        model = PasteBin
        fields = ('title', 'paste_text', 'exposure', 'expire_after')
