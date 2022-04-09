# Django
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models


class Report(models.Model):
    reason = models.CharField(max_length=100, null=False, blank=False)
    author = models.ForeignKey(to='users.User', on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()

    def __str__(self) -> str:
        return (
            f"{self.pk} - report by {self.author},"
            f" ct {self.content_type}, oi {self.object_id}"
        )
