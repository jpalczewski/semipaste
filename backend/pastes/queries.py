# 3rd-Party
import graphene
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField

# Local
from .mutations import ActivePasteBin, ExpiredPasteBin, PasteBinNode

from pygments import lexers

class PasteBinQuery(graphene.ObjectType):
    all_paste_bin = DjangoFilterConnectionField(
        PasteBinNode,
        deprecation_reason="It will be soon available only for " "superusers",
    )
    active_paste_bin = DjangoFilterConnectionField(ActivePasteBin)
    expired_paste_bin = DjangoFilterConnectionField(ExpiredPasteBin)
    paste_bin = relay.Node.Field(PasteBinNode)

class LanguageQuery(graphene.ObjectType):
    all_languages = graphene.List(graphene.String)

    def resolve_all_languages(self, info):
        languages = [lex[0] for lex in list(lexers.get_all_lexers())]
        languages.sort()
        return ['Plain Text'] + languages
