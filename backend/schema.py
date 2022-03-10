import graphene
from pastes.models import PasteBin
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene import Node
from graphene_django.debug import DjangoDebug

class PasteBinNode(DjangoObjectType):
    class Meta:
        model = PasteBin
        interfaces = (Node,)
        fields = "__all__"
        filter_fields = ["title"]

class Query(object):
    PasteBinQuery = Node.Field(PasteBinNode)
    AllPasteBin = DjangoFilterConnectionField(PasteBinNode)



class Query2(
    Query,
    graphene.ObjectType,
):
    debug = graphene.Field(DjangoDebug, name="_debug")

schema = graphene.Schema(query=Query2)