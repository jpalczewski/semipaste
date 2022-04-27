# Standard Library
import logging

# 3rd-Party
import graphene
from graphene import relay

# Project
from backend.mixins import ErrorCode, ResultMixin
from pastes.models import MTMTags, PasteBin, PasteTag

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
        visible = graphene.Boolean(required="True", description="Is it private or not?")
        language = graphene.String(description="Syntax Highlight")
        tags = graphene.List(graphene.String)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):  # type: ignore
        paste = PasteBin()
        for attr in kwargs:
            valued = kwargs.get(attr)
            if info.context.user.is_authenticated and attr == 'author':
                valued = info.context.user
            elif not info.context.user.is_authenticated and attr == 'author':
                valued = None
            if attr == 'tags':
                continue
            try:
                setattr(paste, attr, valued)
            except Exception as e:
                return AddPasteBin(
                    Ok=False, error_code=ErrorCode.EXCEPTION_OCCURRED, error=str(e)
                )
        paste.save()
        tag_values = kwargs.get('tags')
        if tag_values:
            for tag in tag_values:
                try:
                    PasteTag.objects.get(tag_name=tag)
                except PasteTag.DoesNotExist:
                    PasteTag(tag_name=tag).save()
                finally:
                    existing_tag = PasteTag.objects.get(tag_name=tag)
                    MTMTags(paste_id=paste.id, tag_id=existing_tag.id).save()
        return AddPasteBin(
            ok=True, added_paste_id=paste.pk, attachment_token=paste.attachment_token
        )
