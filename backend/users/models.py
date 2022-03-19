"""Users models."""

# Django
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """User model."""

    # Variables
    description = models.TextField(_('description'))

    def __str__(self) -> str:
        return f'{self.username}'
