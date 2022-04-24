# 3rd-Party
import graphene
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
from pygments import lexers

# Local
from .active_paste_bin import ActivePasteBin
from .expired_paste_bin import ExpiredPasteBin
from .nodes import PasteBinNode
from .rate_paste_bin import RatePasteBinQuery


class PasteBinQuery(graphene.ObjectType, RatePasteBinQuery):
    all_paste_bin = DjangoFilterConnectionField(
        PasteBinNode,
        deprecation_reason="It will be soon available only for " "superusers",
    )
    active_paste_bin = DjangoFilterConnectionField(ActivePasteBin)
    expired_paste_bin = DjangoFilterConnectionField(ExpiredPasteBin)
    paste_bin = relay.Node.Field(PasteBinNode)


class LanguageQuery(graphene.ObjectType):
    all_languages = graphene.List(graphene.String)

    def resolve_all_languages(self, info):  # type: ignore
        return ['Plain Text'] + sorted(lex[0] for lex in list(lexers.get_all_lexers()))
