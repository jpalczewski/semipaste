# Standard Library
import logging

# 3rd-Party
import graphene

# Project
from backend.mixins import ErrorCode, ResultMixin
from pastes.models import Attachment

logger = logging.getLogger(__file__)


class DeleteAttachment(ResultMixin, graphene.ClientIDMutation):
    class Input:
        id = graphene.ID()

    @classmethod
    def mutate_and_get_payload(cls, root, info, id, **input):  # type: ignore
        try:
            attachment = Attachment.objects.get(pk=id)
            paste_author = attachment.paste.author
            if not info.context.user.is_superuser or info.context.user == paste_author:
                return DeleteAttachment(
                    ok=False,
                    error_code=ErrorCode.PERMISSION_DENIED,
                    error="Permission denied",
                )
            attachment.delete()
            return DeleteAttachment(
                ok=True,
            )
        except Attachment.DoesNotExist:
            return DeleteAttachment(ok=False, error="Attachment does not exist")
        except Exception as e:
            logger.error(
                f"During deleting attachment {attachment.pk} exception \"{e}\" occured"
            )
            return DeleteAttachment(ok=False, error=e)
