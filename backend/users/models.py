"""Users models."""

# Django
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """User model."""

    description = models.TextField(_('user\'s description'))
    is_verified = models.BooleanField(_('is verified'), default=False)

    def __str__(self) -> str:
        return f'{self.username}'


class UserVerification(models.Model):
    """User verification model."""

    user = models.OneToOneField(
        User, on_delete=models.CASCADE,
        verbose_name=_('user to verify')
    )
    verification_code = models.TextField(_('verification code'))

    def verify(self, received_code: str) -> bool:
        if self.verification_code == received_code:
            self.user.is_verified = True
            self.user.save()
            return True
        return False
