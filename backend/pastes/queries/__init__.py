# Standard Library
from datetime import datetime, timedelta, timezone

# Django
from django.db.models import F

# 3rd-Party
import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from pygments import lexers

# Project
from backend.filters import DefaultFilterClasses, PasteBinFilterFields
from pastes.models import Attachment, PasteBin, PasteTag
from pastes.queries.active_paste_bin import ActivePasteBin
from pastes.queries.expired_paste_bin import ExpiredPasteBin
from .nodes import PasteBinNode

class PasteBinNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)

    class Meta:
        model = PasteBin
        filter_fields = PasteBinFilterFields
        interfaces = (relay.Node,)
        exclude = ("attachment_token",)


class PasteTagNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)

    class Meta:
        model = PasteTag
        interfaces = (relay.Node,)
        filter_fields = {
            'tag_name': DefaultFilterClasses.DEFAULT_TEXT.value,
        }


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
    active_paste_bin = DjangoFilterConnectionField(
        ActivePasteBin, mode=graphene.String(), time=graphene.String()
    )
    expired_paste_bin = DjangoFilterConnectionField(ExpiredPasteBin)
    paste_bin = relay.Node.Field(PasteBinNode)
    all_paste_tags = DjangoFilterConnectionField(PasteTagNode)
    all_paste_tags = DjangoFilterConnectionField(PasteTagNode)

    def resolve_active_paste_bin(self, info, **kwargs):  # type: ignore
        mode = kwargs.get('mode')
        pastes = PasteBin.objects.all()
        if mode:
            match mode:
                case "top":
                    time = kwargs.get('time')
                    pastes = PasteBinQuery.get_top_paste_bin(pastes, time)
                    return pastes.annotate(
                        total_rating=F("likes") - F("dislikes")
                    ).order_by('-total_rating')
                case "hot":
                    return pastes.annotate(
                        total_rating=F('likes') - F('dislikes')
                    ).order_by('-total_rating', '-date_of_creation')
        else:
            return pastes.order_by('-date_of_creation')

    @staticmethod
    def get_top_paste_bin(pastes, filter: str):  # type: ignore
        match filter:
            case "today":
                today = datetime.today()
                pastes = pastes.filter(
                    date_of_creation__year=today.year,
                    date_of_creation__month=today.month,
                    date_of_creation__day=today.day,
                )
            case "week":
                pastes = pastes.filter(
                    date_of_creation__lt=datetime.now().replace(tzinfo=timezone.utc)
                    + timedelta(days=7)
                )
            case "month":
                pastes = pastes.filter(
                    date_of_creation__lt=datetime.now().replace(tzinfo=timezone.utc)
                    + timedelta(days=30)
                )
            case "year":
                pastes = pastes.filter(
                    date_of_creation__lt=datetime.now().replace(tzinfo=timezone.utc)
                    + timedelta(days=360)
                )
        return pastes


class LanguageQuery(graphene.ObjectType):
    all_languages = graphene.List(graphene.String)

    def resolve_all_languages(self, info):  # type: ignore
        return ['Plain Text'] + sorted(lex[0] for lex in list(lexers.get_all_lexers()))
