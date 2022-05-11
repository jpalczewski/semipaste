"""Model of a paste and attachment

    Examples:
        See developer guide for detailed usage.

"""

# Standard Library
import logging
import os.path
import secrets
from datetime import datetime, timedelta, timezone

# Django
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _

# 3rd-Party
from configurations import values

# Project
from reports.models import Report
from users.models import User

SECRET_KEY = values.SecretValue(environ_name="SECRET_KEY", environ_prefix=None)
ATTACHMENT_TIMESPAN = values.IntegerValue(
    environ_name="ATTACHMENT_TIMESPAN", environ_prefix=None, default=300
)

logger = logging.getLogger(__name__)


class PasteBin(models.Model):
    """Pastebin model."""

    # Choices
    class ExpireChoices(models.TextChoices):
        # The first value is the actual value to be set
        # The second value is used for humans
        NEVER = 'NEVER', _('never')
        MIN = 'MIN', _('1 minute')
        HOUR = 'HOUR', _('1 hour')
        DAY = 'DAY', _('1 day')
        WEEK = 'WEEK', _('1 week')
        MONTH = 'MONTH', _('1 month')
        YEAR = 'YEAR', _('1 year')

    # Attributes
    title = models.CharField(_('title'), max_length=50)
    text = models.TextField(_('paste text'))
    date_of_creation = models.DateTimeField(_('date of creation'), blank=True)
    visible = models.BooleanField(_('visible'), default=True)
    expire_after = models.CharField(
        _('expire after'),
        max_length=5,
        choices=ExpireChoices.choices,
        default=ExpireChoices.NEVER,
    )
    date_of_expiry = models.DateTimeField(_('date of expiry'), null=True, blank=True)
    author = models.ForeignKey(
        User, verbose_name=_('author'), on_delete=models.CASCADE, null=True, blank=True
    )
    language = models.CharField(_('langauge'), max_length=50, default='Plain Text')
    attachment_token = models.CharField(
        _('token issued to upload attachments'),
        null=False,
        blank=True,
        max_length=32,
        db_index=True,
    )
    objects = models.Manager()
    reports = GenericRelation(Report, related_query_name='pastes')
    likes = models.IntegerField(_('likes'), default=0)
    dislikes = models.IntegerField(_('dislikes'), default=0)

    # Static methods
    @staticmethod
    def get_time_choice(choice: str) -> timedelta:
        match choice:
            case PasteBin.ExpireChoices.MIN:
                return timedelta(seconds=60)  # type: ignore
            case PasteBin.ExpireChoices.HOUR:
                return timedelta(seconds=3600)  # type: ignore
            case PasteBin.ExpireChoices.DAY:
                return timedelta(days=1)  # type: ignore
            case PasteBin.ExpireChoices.WEEK:
                return timedelta(days=7)  # type: ignore
            case PasteBin.ExpireChoices.MONTH:
                return timedelta(days=30)  # type: ignore
            case PasteBin.ExpireChoices.YEAR:
                return timedelta(days=360)  # type: ignore

    # Methods
    def save(self, *args, **kwargs):  # type: ignore
        if self.author is None:
            self.expire_after = 'WEEK'
        if not self.date_of_creation:
            self.date_of_creation = datetime.now().replace(tzinfo=timezone.utc)
        if not self.date_of_expiry:
            choice = self.expire_after
            if choice == PasteBin.ExpireChoices.NEVER:
                self.date_of_expiry = None
            else:
                self.date_of_expiry = self.date_of_creation + PasteBin.get_time_choice(
                    choice
                )
        else:
            self_pre = PasteBin.objects.get(id=self.id)
            if self_pre.expire_after != self.expire_after:
                choice = self.expire_after
                if choice == PasteBin.ExpireChoices.NEVER:
                    self.date_of_expiry = None
                else:
                    self.date_of_expiry = (
                        self.date_of_creation + PasteBin.get_time_choice(choice)
                    )
        self.attachment_token = secrets.token_hex(16)
        self.likes = self.rating_set.filter(liked=True).count()
        self.dislikes = self.rating_set.filter(liked=False).count()
        super().save(*args, **kwargs)

    def get_attachments(self):  # type: ignore
        return Attachment.objects.filter(paste=self.pk)

    def is_uploading_attachments_allowed(self) -> bool:
        """Checks if uploading of a new file is allowed.
        I.e: if time between paste creation and  now is less than `Timespan`.

        """
        upload_time_limit = self.date_of_creation + timedelta(
            seconds=ATTACHMENT_TIMESPAN
        )
        return datetime.now().replace(tzinfo=timezone.utc) < upload_time_limit

    # Special Methods
    def __str__(self) -> str:
        return f'{self.pk}. {self.title}'

    # Meta
    class Meta:
        ordering = ['id']
        verbose_name = _('pastebin')
        verbose_name_plural = _('pastebins')


class Attachment(models.Model):
    """Attachment model."""

    def get_attachment_filename(self, filename: str) -> str:  #
        return 'attachments/{}/{}'.format(
            secrets.token_hex(16),
            filename,
        )

    image = models.ImageField(upload_to=get_attachment_filename)
    paste = models.ForeignKey(
        PasteBin, on_delete=models.CASCADE, related_name='attachments'
    )

    def __str__(self) -> str:
        return f'{self.paste} - attachment id: {self.pk}, path: {self.image.name}'

    class Meta:
        verbose_name = _('attachment')
        verbose_name_plural = _('attachments')


@receiver(models.signals.pre_delete, sender=Attachment)
def auto_delete_attachments_on_delete(  # type: ignore
    sender, instance: Attachment, **kwargs  # type: ignore
):  # type: ignore
    logger.debug("Received post_delete signal for an attachment")
    path = instance.image.path
    if os.path.isfile(path):
        os.remove(path)
        logger.debug(f"Removed {path} from deleting {instance.pk}")
    else:
        logger.warning("Received a post_delete signal for possibly deleted image")


class Rating(models.Model):
    """Rating model."""

    liked = models.BooleanField(_('rating'), null=True)
    paste = models.ForeignKey(
        to='pastes.PasteBin', verbose_name=_('rated paste'), on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        to="users.User", verbose_name=_("rater"), on_delete=models.CASCADE
    )

    def save(self, *args, **kwargs):  # type: ignore
        if self.liked is None:
            self.delete()
            self.paste.save()
            return
        super().save()
        self.paste.save()

    @staticmethod
    def is_unique(paste: PasteBin, user: User) -> bool:
        return True if Rating.objects.filter(user=user, paste=paste) else False

    def __str__(self) -> str:
        return f'{self.user.username} ={self.liked}= {self.paste.title}'
