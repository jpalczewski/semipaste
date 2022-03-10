"""Pastes models."""

# Django
from django.db import models
from django.utils.translation import gettext_lazy as _


class PasteBin(models.Model):
    """Pastebin model."""

    class ExpireChoices(models.TextChoices):
        NEVER = 'NEVER', _('never')
        HOUR  = 'HOUR', _('1 hour')
        DAY   = 'DAY', _('1 day')
        WEEK  = 'WEEK', _('1 week')
        YEAR  = 'YEAR', _('1 year')

    # User, Language, Access_Key
    title = models.CharField(_('title'), max_length=50)
    paste_text = models.TextField(_('paste text'))
    date_of_creation = models.DateTimeField(_('date of creation'), auto_now_add=True)
    exposure = models.BooleanField(_('exposure'))
    expire_after = models.CharField(
        _('expire after'),
        max_length=5,
        choices=ExpireChoices.choices,
        default=ExpireChoices.NEVER
    )

    class Meta:
        verbose_name = "Paste Bin"
        verbose_name_plural = "Paste Bins"

    def __str__(self):
        return f'{self.title}'
