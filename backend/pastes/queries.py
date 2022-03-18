import graphene
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField

from .mutations import PasteBinNode

class PasteBinQuery(graphene.ObjectType):
   all_paste_bin = DjangoFilterConnectionField(PasteBinNode)
   paste_bin = relay.Node.Field(PasteBinNode)