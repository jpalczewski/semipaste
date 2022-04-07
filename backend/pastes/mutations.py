"""Pastes schema."""


# Standard Library
import logging

# Django
import re

from django.db import transaction

# 3rd-Party
import graphene
from _datetime import datetime, timezone
from graphene import relay
from graphene_django import DjangoObjectType
import pygments
from pygments import lexers
from pygments.formatters import HtmlFormatter

# Project
from backend.mixins import ErrorCode, ResultMixin

# Local
from .models import PasteBin

logger = logging.getLogger(__file__)


class PasteBinNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)

    class Meta:
        model = PasteBin
        filter_fields = ['title', 'id', 'date_of_expiry']
        interfaces = (relay.Node,)

    # rowid = graphene.String()
    # fields = "__all__"


class AddPasteBin(ResultMixin, relay.ClientIDMutation):
    added_paste_id = graphene.Int(description="Returns added paste ID")

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
        return AddPasteBin(ok=True, added_paste_id=paste.pk)


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

def between_quotes(code: str) -> str:
    between_double_quotes = code.split('"')[1::2]
    between_single_quotes = code.split("'")[1::2]
    for bdq in between_double_quotes:
        code = code.replace(bdq, bdq.replace('\\n', '/n'))
    for bq in between_single_quotes:
        code = code.replace(bq, bq.replace('\\n', '/n'))
    return code.replace('\\n', '\n')

def convert_html(code: str) -> str:
    code = code.strip()
    code = re.sub(r"class=\"", "class=\'", code)
    code = re.sub(r"\">", "\'>", code)
    code = code.replace('/n', '&#92;n')
    return code

class HighlightPreview(relay.ClientIDMutation):
    highlight = graphene.String()

    class Input:
        code = graphene.String(required=True)
        lang = graphene.String()

    @staticmethod
    def mutate_and_get_payload(root, info, **input):
        code = input.get('code')
        lang = input.get('lang')
        code = between_quotes(code)
        if lang:
            lex = lexers.get_lexer_by_name(lang)
            code = pygments.highlight(code, lex, HtmlFormatter(lineseparator='<br>'))
            code = convert_html(code)
        return HighlightPreview(highlight=code)

class HighlightPasteBin(relay.ClientIDMutation):
    highlight = graphene.String()

    class Input:
        id = graphene.ID(required=True)

    @staticmethod
    def mutate_and_get_payload(root, info, **input):
        pk = int(input.get('id'))
        paste = PasteBin.objects.get(id=pk)
        code = paste.text
        code = between_quotes(code)
        if paste.language != 'Plain Text':
            lexer = lexers.get_lexer_by_name(paste.language)
            code = pygments.highlight(code, lexer, HtmlFormatter(lineseparator='<br>'))
            code = convert_html(code)
        return HighlightPasteBin(highlight=code)

class PasteBinMutation(graphene.ObjectType):
    add_paste_bin = AddPasteBin.Field()
    delete_paste_bin = DeletePasteBin.Field(
        description="Mutation that is responsible for deleting pastes"
    )
    highlight_paste_bin = HighlightPasteBin.Field()
    highlight_preview = HighlightPreview.Field()


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
