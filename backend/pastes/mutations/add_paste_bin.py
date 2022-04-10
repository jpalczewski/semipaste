# Standard Library
import logging

# 3rd-Party
import graphene
from graphene import relay

# Project
from backend.mixins import ErrorCode, ResultMixin
from pastes.models import PasteBin

logger = logging.getLogger(__file__)


class AddPasteBin(ResultMixin, relay.ClientIDMutation):
    added_paste_id = graphene.Int(description="Returns added paste ID")
    attachment_token = graphene.String(
        description="Token required to upload attachments"
    )

    class Input:
        title = graphene.String(required=True, description="Title of new paste")
        text = graphene.String(required=True, description="Content of a new paste")
        expire_after = graphene.Field(
            graphene.types.Enum.from_enum(PasteBin.ExpireChoices),
            required=True,
            description="Expiration time",
        )
        exposure = graphene.Boolean(
            required="True", description="Is it private or not?"
        )
        language = graphene.String(description="Syntax Highlight")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):  # type: ignore
        if info.context.user.is_authenticated:
            kwargs['author'] = info.context.user
        else:
            kwargs['author'] = None
        try:
            paste = PasteBin(**kwargs)
            paste.save()
        except Exception as e:
            return AddPasteBin(
                Ok=False, error_code=ErrorCode.EXCEPTIONOCCURED, error=str(e)
            )
        return AddPasteBin(
            ok=True, added_paste_id=paste.pk, attachment_token=paste.attachment_token
        )
