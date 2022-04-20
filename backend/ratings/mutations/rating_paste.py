# Standard Library
import logging

# 3rd-Party
import graphene
from graphene import relay

# Project
from backend.mixins import ErrorCode, ResultMixin
from ratings.models import Rating

logger = logging.getLogger(__file__)


class RatingPaste(graphene.relay.ClientIDMutation, ResultMixin):
    class Input:
        paste = graphene.ID()
        liked = graphene.Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):  # type: ignore
        if not info.context.user.is_authenticated():
            return RatingPaste(ok=False, error=f"Not authenticated")
        paste = input.get('paste')
        liked = input.get('liked')
        user = info.context.user
        rate_exists = Rating.is_unique(paste, user)
        if rate_exists:
            rate = Rating.objects.get(paste=paste, user=user)
            if rate.liked != liked:
                rate.liked = liked
                try:
                    rate.save()
                except Exception as e:
                    return RatingPaste(ok=False, error=f"Couldn't save the rating {e}")
                else:
                    logger.debug(f'Rating saved {rate}')
                    return RatingPaste(ok=True, error="Rating changed")
            return RatingPaste(ok=False, error="Rating already exists")
        else:
            rate = Rating(liked=liked)
            rate.user_id = user
            rate.paste_id = paste
            try:
                rate.save()
            except Exception as e:
                return RatingPaste(ok=False, error=f"Couldn't save the rating {e}")
            else:
                return RatingPaste(ok=True, error="Rating created")


class RatingPasteID(graphene.relay.ClientIDMutation, ResultMixin):
    class Input:
        paste = graphene.ID()
        user = graphene.ID()
        liked = graphene.Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):  # type: ignore
        paste = input.get('paste')
        user = input.get('user')
        liked = input.get('liked')
        rate_exists = Rating.is_unique(paste, user)
        if rate_exists:
            rate = Rating.objects.get(paste=paste, user=user)
            if rate.liked != liked:
                rate.liked = liked
                try:
                    rate.save()
                except Exception as e:
                    return RatingPasteID(ok=False, error=f"Couldn't save the rating {e}")
                else:
                    logger.debug(f'Rating saved {rate}')
                    return RatingPasteID(ok=True, error="Rating changed")
            return RatingPasteID(ok=False, error="Rating already exists")
        else:
            rate = Rating(liked=liked)
            rate.user_id = user
            rate.paste_id = paste
            try:
                rate.save()
            except Exception as e:
                return RatingPasteID(ok=False, error=f"Couldn't save the rating {e}")
            else:
                return RatingPasteID(ok=True, error="Rating created")
