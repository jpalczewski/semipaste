# 3rd-Party
import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from pygments import lexers

# Project
from backend.filters import PasteBinFilterFields
from pastes.models import Attachment, PasteBin
from pastes.queries.active_paste_bin import ActivePasteBin, PasteTagNode
from pastes.queries.expired_paste_bin import ExpiredPasteBin


class PasteBinNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)

    class Meta:
        model = PasteBin
        filter_fields = PasteBinFilterFields
        interfaces = (relay.Node,)
        exclude = ("attachment_token",)


class AttachmentNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)
    url = graphene.String()

    def resolve_url(root, info, **kwargs) -> str:  # type: ignore
        return f"http://{info.context.META['HTTP_HOST']}{root.image.url}"

    class Meta:
        model = Attachment
        interfaces = (relay.Node,)
        exclude = ("paste",)


class PasteBinQuery(graphene.ObjectType):
    all_paste_bin = DjangoFilterConnectionField(
        PasteBinNode,
        deprecation_reason="It will be soon available only for " "superusers",
    )
    active_paste_bin = DjangoFilterConnectionField(ActivePasteBin)
    expired_paste_bin = DjangoFilterConnectionField(ExpiredPasteBin)
    paste_bin = relay.Node.Field(PasteBinNode)
    all_paste_tags = DjangoFilterConnectionField(PasteTagNode)


class LanguageQuery(graphene.ObjectType):
    all_languages = graphene.List(graphene.String)

    def resolve_all_languages(self, info):  # type: ignore
        return ['Plain Text'] + sorted(lex[0] for lex in list(lexers.get_all_lexers()))
