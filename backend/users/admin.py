# Django
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Local
from .models import User, UserVerification


class CustomUserAdmin(UserAdmin):
    # fieldsets = tuple([field for field in UserAdmin.fieldsets] + ['description'])
    pass

admin.site.register(User, CustomUserAdmin)

@admin.register(UserVerification)
class UserVerificationAdmin(admin.ModelAdmin):
    pass
