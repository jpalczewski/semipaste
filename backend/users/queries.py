import graphene
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.debug import DjangoDebug

from .mutations import UserNode

class UserQuery(graphene.ObjectType):
    user = graphene.Field(UserNode)
    all_users = DjangoFilterConnectionField(UserNode)

    node = graphene.relay.Node.Field()
    debug = graphene.Field(DjangoDebug, name="_debug")