"""Pastes models."""

# Standard Library
from datetime import datetime, timedelta, timezone

# Django
from django.db import models
from django.utils.translation import gettext_lazy as _

from users.models import User


class PasteBin(models.Model):
    """Pastebin model."""

    class ExpireChoices(models.TextChoices):
        # The first value is the actual value to be set
        # The second value is used for humans
        NEVER = 'NEVER', _('never')
        HOUR = 'HOUR', _('1 hour')
        DAY = 'DAY', _('1 day')
        WEEK = 'WEEK', _('1 week')
        MONTH = 'MONTH', _('1 month')
        YEAR = 'YEAR', _('1 year')

    # User, Language, Access_Key
    title = models.CharField(_('title'), max_length=50)
    text = models.TextField(_('paste text'))
    date_of_creation = models.DateTimeField(_('date of creation'), blank=True)
    exposure = models.BooleanField(_('exposure'))
    expire_after = models.CharField(
        _('expire after'),
        max_length=5,
        choices=ExpireChoices.choices,
        default=ExpireChoices.NEVER,
    )
    date_of_expiry = models.DateTimeField(_('date of expiry'), null=True, blank=True)
    author = models.ForeignKey(
        User, verbose_name=_('author'),
        on_delete=models.CASCADE, null=True, blank=True
    )

    @staticmethod
    def get_time_choice(choice: str) -> timedelta:
        if choice == PasteBin.ExpireChoices.HOUR:
            return timedelta(seconds=3600)
        elif choice == PasteBin.ExpireChoices.DAY:
            return timedelta(days=1)
        elif choice == PasteBin.ExpireChoices.WEEK:
            return timedelta(days=7)
        elif choice == PasteBin.ExpireChoices.MONTH:
            return timedelta(days=30)
        elif choice == PasteBin.ExpireChoices.YEAR:
            return timedelta(days=360)

    # Methods
    def save(self, *args, **kwargs):  # type: ignore
        if self.author is None:
            self.expire_after = 'WEEK'
        choice = self.expire_after
        self.date_of_creation = datetime.now().replace(tzinfo=timezone.utc)
        if choice == PasteBin.ExpireChoices.NEVER:
            self.date_of_expiry = None
        else:
            self.date_of_expiry = self.date_of_creation + PasteBin.get_time_choice(choice)
        super().save(*args, **kwargs)

    # Special Methods
    def __str__(self) -> str:
        return f'{self.title}'

    # Meta
    class Meta:
        ordering = ['id']
        verbose_name = _('pastebin')
        verbose_name_plural = _('pastebins')
