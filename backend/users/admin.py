# Django
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Local
from .models import User, UserVerification

admin.site.register(User, UserAdmin)


@admin.register(UserVerification)
class UserVerificationAdmin(admin.ModelAdmin):
    pass
