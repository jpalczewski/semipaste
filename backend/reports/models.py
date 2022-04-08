# Django
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.utils.translation import gettext_lazy as _

# Project
from users.models import User

# Create your models here.


class Report(models.Model):
    reason = models.CharField(
        _('report reason'), max_length=100, null=False, blank=False
    )
    author = models.ForeignKey(User, on_delete=models.CASCADE, name=_('report autor'))
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()
