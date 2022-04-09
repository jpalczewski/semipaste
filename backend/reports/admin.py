# Django
# from django.contrib import admin

# Django
from django.contrib import admin

# Project
# Register your models here.
from reports.models import Report


@admin.register(Report)
class PasteBinAdmin(admin.ModelAdmin):
    pass
