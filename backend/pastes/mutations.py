"""Pastes schema."""


# Standard Library
import logging

# Django
from django.db import transaction

# 3rd-Party
import graphene
import pygments
from _datetime import datetime, timezone
from graphene import relay
from graphene_django import DjangoObjectType
from pygments import lexers
from pygments.formatters import HtmlFormatter

# Project
from backend.mixins import ErrorCode, ResultMixin

# Local
from .models import Attachment, PasteBin

logger = logging.getLogger(__file__)


class PasteBinNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)

    class Meta:
        model = PasteBin
        filter_fields = ['title', 'id', 'date_of_expiry']
        interfaces = (relay.Node,)
        exclude = ("attachment_token",)

    # rowid = graphene.String()
    # fields = "__all__"


class AttachmentNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)
    url = graphene.String()

    def resolve_url(root, info, **kwargs) -> str:  # type: ignore
        return f"http://{info.context.META['HTTP_HOST']}{root.image.url}"

    class Meta:
        model = Attachment
        interfaces = (relay.Node,)
        exclude = ("paste",)


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


class DeletePasteBin(ResultMixin, graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    @transaction.atomic
    def mutate(cls, info, id, **kwargs):  # type: ignore
        logger.debug("Delete entered")
        try:
            paste: PasteBin = PasteBin.objects.get(pk=id)
        except PasteBin.DoesNotExist:
            logger.debug("not existing paste deletion requested")
            return DeletePasteBin(
                ok=False,
                error="Requested paste doesn\'t exist",
                error_code=ErrorCode.NONEXISTENTPASTE,
            )

        if not info.context.user.is_authenticated:
            return DeletePasteBin(
                ok=False,
                error="You need to be logged in",
                error_code=ErrorCode.NONEXISTENTPASTE,
            )

        if info.context.user.is_superuser:
            paste.delete()
            return DeletePasteBin(ok=True)

        if paste.author != info.context.user:
            return DeletePasteBin(
                ok=False,
                error="You can\'t delete paste that you don't own",
                error_code=ErrorCode.PERMISSIONDENIED,
            )

        logger.debug("trying to delete")
        paste.delete()

        return DeletePasteBin(ok=True)


def convert_to_html(code: str, lang: str) -> str:
    if lang != "Plain Text":
        escape_chars = '___ESCAPE_CHARS___'
        between_double_quotes = code.split('"')[1::2]
        between_single_quotes = code.split("'")[1::2]
        for bdq in between_double_quotes:
            if '\\n' in bdq:
                code = code.replace(bdq, bdq.replace('\\', escape_chars))
        for bsq in between_single_quotes:
            if '\\n' in bsq:
                code = code.replace(bsq, bsq.replace('\\', escape_chars))
        code = code.replace('\\n', '\n')
        lex = lexers.get_lexer_by_name(lang)
        code = (
            pygments.highlight(code, lex, HtmlFormatter(lineseparator='<br>'))
            .strip()
            .replace(escape_chars, '&#92;')
            .replace("class=\"", "class=\'")
            .replace("\">", "\'>")
        )
    return code


class HighlightPreview(relay.ClientIDMutation):
    highlight = graphene.String()

    class Input:
        code = graphene.String(required=True)
        lang = graphene.String()

    @staticmethod
    def mutate_and_get_payload(root, info, **input):  # type: ignore
        code = input.get('code')
        if input.get('lang'):
            lang = input.get('lang')
        else:
            lang = "Plain Text"
        code = convert_to_html(code, lang)
        return HighlightPreview(highlight=code)


class HighlightPasteBin(relay.ClientIDMutation):
    highlight = graphene.String()

    class Input:
        id = graphene.ID(required=True)

    @staticmethod
    def mutate_and_get_payload(root, info, **input):  # type: ignore
        pk = int(input.get('id'))
        paste = PasteBin.objects.get(id=pk)
        code = convert_to_html(paste.text, paste.language)
        return HighlightPasteBin(highlight=code)


class AddAttachment(ResultMixin, graphene.ClientIDMutation):
    class Input:
        token = graphene.String(required=True, description="Upload token")
        description = graphene.String(description="Image description")

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):  # type: ignore
        token = input['token']
        logger.debug(f"Received add attachment request with token {token}")
        file = info.context.FILES['image']
        if len(info.context.FILES) != 0:
            logger.debug(f"Received files {file}")
        else:
            return AddAttachment(ok=False, error="No files provided")

        try:
            paste = PasteBin.objects.get(attachment_token=token)

            if not paste.is_uploading_attachments_allowed():
                return AddAttachment(
                    ok=False, error="Too late to upload attachment to that paste"
                )

            attachment = Attachment.objects.create(paste=paste, image=file)
            attachment.save()
            print(vars(attachment))
            logger.debug(f"Attachment saved: {attachment}")
            return AddAttachment(ok=True, error=attachment)
        except PasteBin.DoesNotExist:
            return AddAttachment(ok=False, error="Invalid token")
        except Exception as e:
            return AddAttachment(ok=False, error=f"{e}")
        return AddAttachment(ok=False, error="Something went wrong")


class DeleteAttachment(ResultMixin, graphene.ClientIDMutation):
    class Input:
        id = graphene.ID()

    @classmethod
    def mutate_and_get_payload(cls, root, info, id, **input):  # type: ignore
        try:
            attachment = Attachment.objects.get(pk=id)
            paste_author = attachment.paste.author
            if not info.context.user.is_superuser or info.context.user == paste_author:
                return DeleteAttachment(ok=False, error="Permission denied")
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


class PasteBinMutation(graphene.ObjectType):
    add_paste_bin = AddPasteBin.Field()
    delete_paste_bin = DeletePasteBin.Field(
        description="Mutation that is responsible for deleting pastes"
    )
    highlight_paste_bin = HighlightPasteBin.Field()
    highlight_preview = HighlightPreview.Field()
    add_attachment = AddAttachment.Field(description="Add an attachment to a paste")
    delete_attachment = DeleteAttachment.Field(description="Delete an attachment")


class ActivePasteBin(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)

    class Meta:
        model = PasteBin
        filter_fields = ['title', 'id', 'date_of_expiry']
        interfaces = (relay.Node,)

    @classmethod
    def get_queryset(cls, queryset, info):  # type: ignore
        active = queryset.filter(
            date_of_expiry__gte=datetime.now().replace(tzinfo=timezone.utc)
        )
        return active


class ExpiredPasteBin(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)

    class Meta:
        model = PasteBin
        filter_fields = ['title', 'id', 'date_of_expiry']
        interfaces = (relay.Node,)

    @classmethod
    def get_queryset(cls, queryset, info):  # type: ignore
        expired = queryset.filter(
            date_of_expiry__lt=datetime.now().replace(tzinfo=timezone.utc)
        )
        return expired
