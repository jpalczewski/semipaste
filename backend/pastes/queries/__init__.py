# 3rd-Party
import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from pygments import lexers

# Project
from pastes.models import Attachment, PasteBin
from pastes.queries.active_paste_bin import ActivePasteBin
from pastes.queries.expired_paste_bin import ExpiredPasteBin
from pastes.queries.top_paste_bin import TopPasteBinDay, TopPasteBinWeek, TopPasteBinMonth, TopPasteBinYear


class PasteBinNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)

    class Meta:
        model = PasteBin
        filter_fields = ['title', 'id', 'date_of_expiry', 'language']
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
    top_paste_bin_day = DjangoFilterConnectionField(TopPasteBinDay)
    top_paste_bin_week = DjangoFilterConnectionField(TopPasteBinWeek)
    top_paste_bin_moth = DjangoFilterConnectionField(TopPasteBinMonth)
    top_paste_bin_year = DjangoFilterConnectionField(TopPasteBinYear)


class LanguageQuery(graphene.ObjectType):
    all_languages = graphene.List(graphene.String)

    def resolve_all_languages(self, info):  # type: ignore
        """Gettting all sorted languages from pygments library"""
        languages = [lex[0] for lex in list(lexers.get_all_lexers())]
        languages.sort()
        return ['Plain Text'] + languages
