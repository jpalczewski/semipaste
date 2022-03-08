"""Paste admin."""

# Django
from django.contrib import admin

# Local
from .models import *


@admin.register(PasteBin)
class PasteBinAdmin(admin.ModelAdmin):
    pass