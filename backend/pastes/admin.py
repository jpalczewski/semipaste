"""Paste admin."""


# Django
from django.contrib import admin

# Local
from .models import Attachment, PasteBin


@admin.register(PasteBin)
class PasteBinAdmin(admin.ModelAdmin):
    pass


@admin.register(Attachment)
class AttachmentAdmin(admin.ModelAdmin):
    pass
