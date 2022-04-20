from django.db import models
from django.utils.translation import gettext_lazy as _


class Rating(models.Model):
    """Rating model."""

    liked = models.BooleanField(_('liked [true] or disliked [false]'))
    paste = models.ForeignKey(to='pastes.PasteBin', verbose_name=_('rated paste'), on_delete=models.CASCADE)
    user = models.ForeignKey(to="users.User", verbose_name=_("rater"), on_delete=models.CASCADE)
    created = models.DateTimeField(_('date of creation'), auto_now_add=True, blank=True)

    @staticmethod
    def is_unique(paste, user):
        return True if Rating.objects.filter(user=user, paste=paste) else False

    def __str__(self):
        return f'<{self.user.username}> <{"liked" if self.liked else "disliked"}> <{self.paste.title}>'
