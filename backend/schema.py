import graphene
from pastes.models import PasteBin
from graphene_django.types import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphene import Node
from graphene import relay
from graphene_django.debug import DjangoDebug


class PasteBinNode(DjangoObjectType):
    id = graphene.ID(source='pk', required=True)
    class Meta:
        model = PasteBin
        filter_fields = ['title','id']
        interfaces = (relay.Node,)
    #rowid = graphene.String()
        #fields = "__all__"

class Query(graphene.ObjectType):
    AllPasteBin = DjangoFilterConnectionField(PasteBinNode)
    node = graphene.relay.Node.Field(PasteBinNode)
    debug = graphene.Field(DjangoDebug, name="_debug")


schema = graphene.Schema(query=Query)