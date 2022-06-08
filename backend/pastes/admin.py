# Django
from django.contrib import admin

# Local
from .models import Attachment, MTMTags, PasteBin, PasteTag, Rating


@admin.register(PasteBin)
class PasteBinAdmin(admin.ModelAdmin):
    pass


@admin.register(Attachment)
class AttachmentAdmin(admin.ModelAdmin):
    pass


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    pass


@admin.register(PasteTag)
class PasteTagAdmin(admin.ModelAdmin):
    pass


@admin.register(MTMTags)
class MTMTagsAdmin(admin.ModelAdmin):
    pass
