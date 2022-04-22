# Standard Library

# Django
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.utils.translation import gettext_lazy as _

# Project
from reports.models import Report


class User(AbstractUser):
    """User model."""

    description = models.TextField(_("user's description"))
    is_verified = models.BooleanField(_("is verified"), default=False)
    reports = GenericRelation(Report, related_query_name='users')

    def __str__(self) -> str:
        return f"{self.username}"


class UserVerification(models.Model):
    """User verification model."""

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, verbose_name=_("user to verify")
    )
    verification_code = models.TextField(_("verification code"))
    code_type = models.TextField(_("code type"))

    def verify(self, received_code: str, code_type: str) -> tuple[bool, str]:
        """Verify the received code with the verification code in the object.
        :returns: tuple [boolean, string]
        """
        if self.code_type == code_type:
            if self.verification_code == received_code:
                self.user.is_verified = True
                try:
                    self.user.save()
                except Exception as e:
                    return False, f'Failed to update the user: {e}'
                return True, "OK"
        return False, "Verification failed."
