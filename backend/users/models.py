"""Users models."""

# Django
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """User model."""

    description = models.TextField(_('description'))
    is_verified = models.BooleanField(_('is verified'), default=False)

    def __str__(self) -> str:
        return f'{self.username}'


class UserVerification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, unique=True)
    code = models.TextField()

    def verify(self, received_code: str) -> bool:
        if self.code == received_code:
            self.user.is_verified = True
            self.user.save()
            return True
        return False
